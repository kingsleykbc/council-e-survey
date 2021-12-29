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
		const userDoc = await db.collection('users').doc(user.uid).set({ fullName, email, DOB, date: new Date(), address, sni });

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
//  HELPERS
// ===================================================================================================================

// Validate the sign up data
const validateSignUp = async data => {
	const { email, sni = 'unknown', fullName, address, DOB } = data;

	// Validate general info
	if (!fullName || !address || !DOB) throw Error('Please complete all fields');

	// Validate SNI
	const validSNI = await db.doc(`snis/${sni}`).get();
	if (!validSNI.exists) throw Error('This is not a valid SNI, please try again');

	const existingSNIs = await db.collection('users').where('sni', '==', sni).get();
	if (!existingSNIs.empty) throw Error('This SNI is already in use.');

	// Validate Email
	const existingEmail = await db.collection('users').where('email', '==', email).get();
	if (!existingEmail.empty) throw Error('This Email is already in use.');
};
