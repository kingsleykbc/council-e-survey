const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const func = functions.region('us-central1');
const express = require('express');
const api = express();
const cors = require('cors');
const { app } = require('firebase-admin');

api.use(cors({ origin: true }));

// ===================================================================================================================
//  USERS
// ===================================================================================================================
/**
 * HANDLE SIGN UP
 */
exports.handleSignUp = func.https.onCall(async data => {
	try {
		const { fullName, email, password, DOB, address, sni } = data;

		// Validate the data
		await validateSignUp(data);

		// Create user
		const user = await auth.createUser({ email, password, displayName: fullName, sni });

		// Store user
		const userDoc = await db
			.collection('users')
			.doc(user.uid)
			.set({ fullName, email, DOB, date: new Date(), answeredQuestions: [], address, sni });

		return { success: true, message: 'User created!', data: userDoc };
	} catch (e) {
		functions.logger.error('Unable to sign up new user', e);
		return { success: false, message: e.message };
	}
});

/**
 * HANDLE ACCOUNT DELETE
 */
exports.deleteAccount = func.https.onCall(async (data, ctx) => {
	try {
		auth.deleteUser(ctx.auth.uid);
	} catch (e) {
		functions.logger.error('Unable to delete user', e);
		return { success: false, message: e.message };
	}
});

/**
 * ON USER DELETE
 */
exports.userDeleted = functions.auth.user().onDelete(async user => {
	// Delete user
	const doc = db.collection('users').doc(user.uid);

	// Delete user responses
	const userResponses = await db.collection('responses').where('userID', '==', user.uid).get();
	for (let ind = 0; ind < userResponses.docs.length; ind++) {
		let response = await userResponses.docs[ind].ref;

		// decrement the question
		const questionID = userResponses.docs[ind].data().questionID;
		await db
			.collection('questions')
			.doc(questionID)
			.update({ noAnswers: admin.firestore.FieldValue.increment(-1) });

		// Remove the response
		await response.delete();
	}

	// Delete the user
	return doc.delete();
});

/**
 * ASSIGN THE ADMIN ROLE
 */
exports.addAdminRole = func.https.onCall(async data => {
	try {
		const user = await auth.getUserByEmail(data.email);
		await auth.setCustomUserClaims(user.uid, { isAdmin: true });
		return { success: true, data, message: 'Successful' };
	} catch (e) {
		functions.logger.error('Unable to add Admin', e);
		return { success: false, message: e.message };
	}
});

// ===================================================================================================================
//  QUESTIONS
// ===================================================================================================================
/**
 * ADD/EDIT A QUESTION
 */
exports.addQuestion = func.https.onCall(async (data, ctx) => {
	try {
		// Authenticate request
		if (!ctx.auth) throw Error('Not authorized');

		// Verify that its admin doing the posting
		const user = await auth.getUser(ctx.auth.uid);
		console.log(user.customClaims);
		if (!user.customClaims?.isAdmin) throw Error('Only admins can post new questions');

		// Get data
		const { id, question, allowUsersViewResponses, options } = data;
		let questionID = `question${new Date().getTime()}`;

		// If it is an edit operation
		if (id) {
			questionID = id; // Use the existing question's ID (so firebase will run update rather than insert)

			// Verify that question hasn't been answered
			const question = await db.collection('questions').doc(questionID).get();
			if (question.data().noAnswers > 0) throw Error('This question has been answered');

			// Delete existing options
			const options = await db.collection('options').where('questionID', '==', questionID).get();
			for (let ind = 0; ind < options.docs.length; ind++) {
				let option = await options.docs[ind].ref;
				await option.delete();
			}
		}

		// Create Question
		const questionRef = db.collection('questions').doc(questionID);
		await questionRef.set({ question, allowUsersViewResponses, datePosted: new Date(), noAnswers: 0 });

		// Create Options
		const optionDocs = [];
		for (let ind = 0; ind < options.length; ind++) {
			const { option } = options[ind];
			await db
				.collection('options')
				.doc(`option${new Date().getTime() + ind}`)
				.set({ option, datePosted: new Date(), questionID: questionRef.id });
			optionDocs.push(data);
		}

		// Return data
		return { success: true, message: 'Question Added!' };
	} catch (e) {
		functions.logger.error('Unable to add question', e);
		return { success: false, message: e.message };
	}
});

/**
 * HANDLE QUESTION DELETE
 */
exports.deleteQuestion = func.https.onCall(async (data, ctx) => {
	try {
		// Authenticate request
		if (!ctx.auth) throw Error('Not authorized');

		const { questionID } = data;

		// Verify that its admin doing the deleting
		const user = await auth.getUser(ctx.auth.uid);
		if (!user.customClaims?.isAdmin) throw Error('Only admins can delete questions');

		// Remove question
		const question = db.collection('questions').doc(questionID);
		await question.delete();

		// Remove its options
		const options = await db.collection('options').where('questionID', '==', questionID).get();

		for (let ind = 0; ind < options.docs.length; ind++) {
			let option = await options.docs[ind].ref;
			await option.delete();
		}

		// Remove its responses
		const responses = await db.collection('responses').where('questionID', '==', questionID).get();

		for (let ind = 0; ind < responses.docs.length; ind++) {
			let option = await responses.docs[ind].ref;
			await option.delete();
		}

		// Return data
		return { success: true, message: 'Question deleted!', data: { questionID, noOptions: options.docs.length } };
	} catch (e) {
		functions.logger.error('Unable to delete question', e);
		return { success: false, message: e.message };
	}
});

/**
 * ANSWER A QUESTION
 */
exports.answerQuestion = func.https.onCall(async (data, ctx) => {
	try {
		// Authenticate request
		if (!ctx.auth) throw Error('Not authorized');

		const userID = ctx.auth.uid;
		const { questionID, optionID } = data;

		// Verify that admin is not answering
		const user = await auth.getUser(userID);
		if (user.customClaims?.isAdmin) throw Error('Admins cannot answer questions');

		// Verify that user hasn't previously responded to the same question
		const userRef = db.collection('users').doc(userID);
		const userData = (await userRef.get()).data();
		userData.answeredQuestions = userData.answeredQuestions || [];
		if (userData.answeredQuestions.includes(questionID)) throw Error('Question already voted on');

		// Add response
		await db.collection('responses').doc(`response${new Date().getTime()}`).set({ questionID, userID, optionID, datePosted: new Date() });

		// Add the question to the  user's response history
		await userRef.update({ answeredQuestions: [...userData.answeredQuestions, questionID] });

		// Increment the total responses in the question
		await db
			.collection('questions')
			.doc(questionID)
			.update({ noAnswers: admin.firestore.FieldValue.increment(1) });

		return { success: true, message: `${questionID} answered` };
	} catch (e) {
		functions.logger.error('Unable to answer question', e);
		return { success: false, message: e.message };
	}
});

// ===================================================================================================================
//  HELPERS
// ===================================================================================================================

// Validate the sign up data
const validateSignUp = async data => {
	const { email, sni = 'unknown', fullName, address, password, DOB } = data;

	// Validate general info
	if (!fullName || !address || !DOB) throw Error('Please complete all fields');

	// Validate password
	if (!password || password.length < 6) throw Error('Password must be at least 6 characters long');

	// Validate DOB
	if (new Date().getFullYear() - new Date(DOB).getFullYear() < 16) throw Error('Users must be at least 16 years old.');

	// Validate SNI
	const validSNI = await db.doc(`snis/${sni}`).get();
	if (!validSNI.exists) throw Error('This is not a valid SNI, please try again');

	const existingSNIs = await db.collection('users').where('sni', '==', sni).get();
	if (!existingSNIs.empty) throw Error('This SNI is already in use.');

	// Validate Email
	const existingEmail = await db.collection('users').where('email', '==', email).get();
	if (!existingEmail.empty) throw Error('This Email is already in use.');
};

// ===================================================================================================================
//  RESTful API
// ===================================================================================================================

/**
 * AUTHENTICATE REQUEST
 */
api.use(async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error('Please enter a valid API key in your authorization header.');
		const apiKey = authorization.split(' ')[1];
		const client = await db.doc(`apiKeys/${apiKey}`).get();
		if (!client.exists) throw Error('Invalid API key.');
		next();
	} catch (e) {
		console.log('Unauthorized', e.message);
		res.status(401).json({ message: `Unauthorized :( ${e.message || 'Enter valid API key.'} (see http://localhost:3000/apidocs).` });
	}
});

/**
 * GET ALL QUESTIONS
 */
api.get('/GetAllQuestions', async (req, res) => {
	try {
		const data = { consultations: { Questions: [] } };
		const questions = await db.collection('questions').get();
		for (const it of questions.docs) {
			data.consultations.Questions.push({ id: it.id, Text: it.data().question });
		}
		res.json(data);
	} catch (e) {
		console.log('Error getting questions', e.message);
		res.status(500).json({ message: 'Internal server error' });
	}
});

/**
 * GET QUESTION OPTIONS
 */
api.get('/GetQuestionOptions/:questionID', async (req, res) => {
	try {
		const questionID = req.params.questionID;
		const data = { Question: questionID, Options: [] };
		const options = await db.collection('options').where('questionID', '==', req.params.questionID).get();
		for (const it of options.docs) {
			data.Options.push({ id: it.id, Text: it.data().option });
		}
		res.json(data);
	} catch (e) {
		console.log('Error getting options', e.message);
		res.status(500).json({ message: 'Internal server error' });
	}
});

/**
 * GET RESPONSES
 */
api.get('/GetQuestionResponse/:questionID', async (req, res) => {
	try {
		const questionID = req.params.questionID;
		const data = { Question: questionID, Answers: [] };
		const options = await db.collection('options').where('questionID', '==', req.params.questionID).get();
		const responses = await db.collection('responses').where('questionID', '==', req.params.questionID).get();

		// Initialize the options
		for (const it of options.docs) {
			data.Answers.push({ id: it.id, count: 0 });
		}

		// Loop through responses and tally the count
		for (const it of responses.docs) {
			for (let i = 0; i < data.Answers.length; i++) {
				if (data.Answers[i].id === it.data().optionID) {
					data.Answers[i].count++;
					break;
				}
			}
		}
		res.json(data);
	} catch (e) {
		console.log('Error getting responses', e.message);
		res.status(500).json({ message: 'Internal server error' });
	}
});

exports.widgets = func.https.onRequest(api);
