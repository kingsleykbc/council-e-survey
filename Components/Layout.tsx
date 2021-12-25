import React from 'react';
import Header from './LayoutComponents/Header';
import { auth } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = ({ children }) => {
	const [user, loading, error] = useAuthState(auth);
	const authState = { user, loading, error, isAuthenticated: user != null };

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			<Header authState={authState} />
			<main>{typeof children === 'function' ? children({ authState }) : children}</main>
		</div>
	);
};

export default Layout;
