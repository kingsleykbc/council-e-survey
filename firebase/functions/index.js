const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('cors')({ origin: true });
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const func = functions.region('us-central1');

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
 * ON USER DELETE
 */
exports.userDeleted = functions.auth.user().onDelete(user => {
	const doc = db.collection('users').doc(user.uid);
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
		const { questionID } = data;

		// Verify that its admin doing the deleting
		const user = await auth.getUser(ctx.auth.uid);
		if (!user.customClaims.isAdmin) throw Error('Only admins can delete questions');

		// Remove question
		const question = db.collection('questions').doc(questionID);
		await question.delete();

		// Remove its options
		const options = await db.collection('options').where('questionID', '==', questionID).get();

		for (let ind = 0; ind < options.docs.length; ind++) {
			let option = await options.docs[ind].ref;
			await option.delete();
		}

		// Return data
		return { success: true, message: 'Question deleted!', data: { questionID, noOptions: options.docs.length } };
	} catch (e) {
		functions.logger.error('Unable to delete question', e);
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
