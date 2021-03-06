import React, { useEffect, useState } from 'react';
import Header from './LayoutComponents/Header';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from './UIComponents/Loader';
import Router from 'next/router';
import { db, auth } from '../firebase/clientApp';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Footer from './SharedComponents/Footer';

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
					setUserData({ fullName: 'Admin', email: user.email, id: user.uid });
					setDataFetched(true);
				} else {
					const unsub = onSnapshot(doc(db, 'users', user.uid), doc => {
						setUserData({ ...doc.data(), id: user.uid });
						setDataFetched(true);
					});

					return unsub;
					// If not admin (user), return user data
					// const docRef = doc(db, 'users', user.uid);
					// const u = await getDoc(docRef);
					// setUserData({ ...u.data(), id: u.id });
				}
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
		<div className='Layout'>
			<Header route={route} authState={authState} theme={theme} setTheme={setTheme} />
			<main>{typeof children === 'function' ? children({ authState }) : children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
