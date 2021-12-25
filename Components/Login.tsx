import React, { FC, useState } from 'react';
import LoginForm from './LoginComponents/LoginForm';
import SignUpForm from './LoginComponents/SignUpForm';
import classnames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';

interface LoginProps {
	view?: 'login' | 'signup';
}

const Login: FC<LoginProps> = ({ view = 'login' }) => {
	const [v, setV] = useState(view);


	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Login'>
			<div className='nav'>
				<Link href='/login'>
					<a className={classnames({ active: v === 'login' })}>Login</a>
				</Link>
				<Link href='/signup'>
					<a className={classnames({ active: v === 'signup' })}>Sign Up</a>
				</Link>
			</div>

			<div className='content'>{v === 'login' ? <LoginForm onLogin={()=>{Router.push("/")}}/> : <SignUpForm onLogin={()=>{Router.push("/")}}/>}</div>

			{/* STYLE */}
			<style jsx>{`
				.Login {
					max-width: 400px;
					margin: auto;
					padding: 20px;
				}
				.nav {
					display: flex;
					gap: 10px;
				}
				.nav a {
					flex-grow: 1;
					text-align: center;
					padding: 10px 15px;
					border-radius: 5px;
					cursor: pointer;
					font-weight: bold;
					background: var(--faint);
				}
				.nav .active {
					background: var(--primary);
					color: #fff;
				}

				.content {
					padding: 20px 0;
				}
			`}</style>
		</div>
	);
};

export default Login;
