import React, { useEffect, useState } from 'react';
import Header from './LayoutComponents/Header';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from './UIComponents/Loader';
import Router from 'next/router';
import { db, auth } from '../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';

const Layout = ({ children, setTheme, theme, route }) => {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [userData, setUserData] = useState({});
	const [dataFetched, setDataFetched] = useState(false);

	/**
	 * ON COMPONENT, MOUNT CHECK THE AUTHENTICATION
	 */
	useEffect(() => {
		setDataFetched(false);
		// If user not authenticated, redirect to Login
		if (!user && !loading) Router.push('/login');
		else if (user) {
			// If user authenticated, get User or Admin details
			const getAdmin = async () => {
				// Get Admin data
				const idToken = await user.getIdTokenResult();
				if (idToken.claims.isAdmin) {
					setIsAdmin(true);
					setUserData({ fullName: 'Admin', email: user.email });
				} else {
					// If not admin (user), return user data
					const docRef = doc(db, 'users', user.uid);
					const u = await getDoc(docRef);
					setUserData(u.data());
				}
				setDataFetched(true);
			};
			getAdmin();
		}
	}, [user, loading]);

	const authState = { user, loading, error, isAuthenticated: user != null, isAdmin, userData };

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!user || !dataFetched) return <Loader height='70vh' />;
	return (
		<div>
			<Header route={route} authState={authState} theme={theme} setTheme={setTheme} />
			<main>{typeof children === 'function' ? children({ authState }) : children}</main>
		</div>
	);
};

export default Layout;
