import React, { useRef, useState } from 'react';
import { auth } from '../../firebase/clientApp';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../UIComponents/Button';
import ErrorMessage from '../UIComponents/ErrorMessage';
import TestCredentials from './TestCredentials';

const LoginForm = ({ onLogin }) => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	/**
	 * HANDLE SIGN UP
	 */
	const handleLogin = async e => {
		e.preventDefault();
		setError('');
		setLoading(true);

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			onLogin();
		} catch (e) {
			if (e.message === 'Firebase: Error (auth/wrong-password).' || e.message === 'Firebase: Error (auth/user-not-found).')
				e.message = 'Invalid email/password';
			setError(e.message);
		}
		setLoading(false);
	};

	/**
	 * PREFILL WITH TEST CREDENTIALS (TEST ONLY)
	 */
	const prefill = ({ email, password }) => {
		emailRef.current.value = email;
		passwordRef.current.value = password;
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			<form onSubmit={handleLogin}>
				<p>Email</p>
				<input ref={emailRef} type='email' required placeholder='kingsley@example.com' />

				<p>Password</p>
				<input ref={passwordRef} type='password' required />

				{/* HANDLE QR SCAN HERE */}
				<Button isLoading={loading} className='marg aCenter'>
					Login
				</Button>
				<ErrorMessage center error={error} />
				<TestCredentials onSelect={prefill} />
			</form>
		</div>
	);
};

export default LoginForm;
