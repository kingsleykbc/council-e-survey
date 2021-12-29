import React, { useRef, useState } from 'react';
import { funcs, auth } from '../../firebase/clientApp';
import { httpsCallable } from 'firebase/functions';
import ErrorMessage from '../UIComponents/ErrorMessage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../UIComponents/Button';

const SignUpForm = ({ onLogin }) => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const fullNameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const dobRef = useRef(null);
	const addressRef = useRef(null);
	const sniRef = useRef(null);

	/**
	 * HANDLE SIGN UP
	 */
	const handleSignUp = async e => {
		e.preventDefault();
		setError('');
		setLoading(true);
		const data = {
			fullName: fullNameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			DOB: dobRef.current.value,
			address: addressRef.current.value,
			sni: sniRef.current.value.trim()
		};

		try {
			// Create user
			const signUp = httpsCallable(funcs, 'handleSignUp');
			const user: any = await signUp(data);
			if (!user.data.success) throw Error(user.data.message);
			await signInWithEmailAndPassword(auth, data.email, data.password);
			onLogin();
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			<form onSubmit={handleSignUp}>
				<p>Full Name</p>
				<input ref={fullNameRef} type='text' required />

				<p>Email</p>
				<input ref={emailRef} type='email' required />

				<p>Password</p>
				<input ref={passwordRef} type='password' required />

				<p>Date of Birth</p>
				<input ref={dobRef} type='date' required />

				<p>Home Address</p>
				<textarea style={{ minHeight: '80px' }} ref={addressRef} required />

				<p>SNI</p>
				<input ref={sniRef} required />

				{/* HANDLE QR SCAN HERE */}
				<Button isLoading={loading} className='marg aCenter'>
					Sign Up
				</Button>
				<ErrorMessage center error={error} />
			</form>
		</div>
	);
};

export default SignUpForm;
