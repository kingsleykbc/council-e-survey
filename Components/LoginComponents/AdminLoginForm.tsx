import React, { useRef, useState } from 'react';
import { auth } from '../../firebase/clientApp';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../UIComponents/Button';
import ErrorMessage from '../UIComponents/ErrorMessage';
import { doc, getDoc } from 'firebase/firestore';
import TestCredentials from './TestCredentials';

const AdminLoginForm = ({ onLogin }) => {
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
			const data: any = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await data.user.getIdTokenResult();
			if (idToken.claims.isAdmin) {
				onLogin();
			} else setError('This is not an admin account');
		} catch (e) {
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
				<p>Admin Email</p>
				<input ref={emailRef} type='email' required />

				<p>Password</p>
				<input ref={passwordRef} type='password' required />

				{/* HANDLE QR SCAN HERE */}
				<Button isLoading={loading} className='marg aCenter'>
					Login
				</Button>
				<ErrorMessage center error={error} />
				<TestCredentials isAdmin onSelect={prefill} />
			</form>
		</div>
	);
};

export default AdminLoginForm;
