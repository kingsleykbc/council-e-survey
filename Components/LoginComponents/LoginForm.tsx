import React, { useRef } from 'react';
import { auth } from '../../firebase/clientApp';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = ({onLogin}) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	/**
	 * HANDLE SIGN UP
	 */
	const handleLogin = async e => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
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
			<form onSubmit={handleLogin}>
				<p>Email</p>
				<input ref={emailRef} type='email' required />

				<p>Password</p>
				<input ref={passwordRef} type='password' required />

				<div className='pad aCenter'>
					<button className='marg aCenter'>Login</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
