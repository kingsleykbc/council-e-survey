import React, { useRef } from 'react';
import { auth, db } from '../../firebase/clientApp';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = ({ onLogin }) => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	/**
	 * HANDLE SIGN UP
	 */
	const handleSignUp = async e => {
		e.preventDefault();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			// Create user auth
			const user = await createUserWithEmailAndPassword(auth, email, password);
			console.log({user});

			// Create user
			const docRef = doc(db, 'users', user.user.uid);
			const userData = await setDoc(docRef, { name });
			console.log("\n.\n.\n.\n");
			console.log(userData);
			console.log("\n.\n.\n.");
			onLogin();
		} catch (e) {
			console.log(e);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			<form onSubmit={handleSignUp}>
				<p>Name</p>
				<input ref={nameRef} type='text' required />

				<p>Email</p>
				<input ref={emailRef} type='email' required />

				<p>Password</p>
				<input ref={passwordRef} type='password' required />

				<div className='pad aCenter'>
					<button className='marg aCenter'>Sign Up</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
