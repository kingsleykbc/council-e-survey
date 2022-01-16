import React, { FC, useState } from 'react';
import LoginForm from './LoginComponents/LoginForm';
import SignUpForm from './LoginComponents/SignUpForm';
import classnames from 'classnames';
import Link from 'next/link';
import Router from 'next/router';
import Animatable from './UIComponents/Animatable';
import Logo from './UIComponents/Logo';
import AdminLoginForm from './LoginComponents/AdminLoginForm';
import Footer from './SharedComponents/Footer';

interface LoginProps {
	view?: 'login' | 'signup' | 'admin-login';
}

const onLogin = () => {
	Router.push('/');
};

const Login: FC<LoginProps> = ({ view = 'login' }) => {
	const [v, setV] = useState(view);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Login'>
			<Animatable
				style={{ width: '100%' }}
				variants={{ initial: { y: 30, opacity: 0 }, final: { y: 0, opacity: 1, height: 'auto' } }}
				initial='initial'
				animate='final'
			>
				<div className='loginBox'>
					<div className='logo'>
						<Logo showText={false} />
					</div>
					<div className='nav'>
						<Link href='/login'>
							<a className={classnames({ active: v === 'login' })}>Login</a>
						</Link>
						<Link href='/signup'>
							<a className={classnames({ active: v === 'signup' })}>Sign Up</a>
						</Link>
						<Link href='/admin-login'>
							<a className={classnames({ active: v === 'admin-login' })}>Admin</a>
						</Link>
					</div>

					<div className='content'>
						<Animatable
							variants={{
								hidden: { opacity: 0, y: 50 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.3, type: 'tween', ease: 'easeOut' } }
							}}
							initial='hidden'
							animate='visible'
						>
							{v === 'login' ? (
								<LoginForm onLogin={onLogin} />
							) : v === 'signup' ? (
								<SignUpForm onLogin={onLogin} />
							) : (
								<AdminLoginForm onLogin={onLogin} />
							)}
						</Animatable>
					</div>
				</div>
				<Footer />
			</Animatable>

			{/* STYLE */}
			<style jsx>{`
				.Login {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					min-height: 100%;
					padding: 20px;
					padding-bottom: 50px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: var(--backgroundColor);
				}
				.logo {
					text-align: center;
					margin-bottom: 15px;
				}
				.loginBox {
					width: min(100%, 500px);
					margin: auto;
					padding: 15px;
					border-radius: 5px;
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

				.Login :global(button) {
					display: block;
					margin: 20px auto;
				}

				@media screen and (min-width: 800px) {
					.loginBox {
						box-shadow: var(--boxShadow);
					}
				}
			`}</style>
		</div>
	);
};

export default Login;
