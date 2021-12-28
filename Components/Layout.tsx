import React, { useEffect } from 'react';
import Header from './LayoutComponents/Header';
import { auth } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdMoon } from 'react-icons/io';
import { RiSunFill as IconSun } from 'react-icons/ri';
import Loader from './UIComponents/Loader';
import Router from 'next/router';

const Layout = ({ children, setTheme, theme }) => {
	const [user, loading, error] = useAuthState(auth);
	const authState = { user, loading, error, isAuthenticated: user != null, isAdmin: false };

	useEffect(() => {
		if (!user && !loading) Router.push('/login');
	}, [user, loading]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!user) return <Loader height='60vh' />;
	return (
		<div>
			<Header authState={authState} />
			<main>{typeof children === 'function' ? children({ authState }) : children}</main>

			<div className='fab' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
				{theme === 'light' ? <IoMdMoon style={{ opacity: 0.6 }} /> : <IconSun />}
			</div>

			{/* STYLE */}
			<style jsx>{`
				.fab {
					position: fixed;
					width: 60px;
					height: 60px;
					bottom: 30px;
					right: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 2rem;
					cursor: pointer;
					border-radius: 5px;
					background: var(--backgroundColor);
					box-shadow: var(--boxShadow);
					transition: opacity 0.2s linear;
				}

				.fab:hover {
					opacity: 0.5;
				}
			`}</style>
		</div>
	);
};

export default Layout;
