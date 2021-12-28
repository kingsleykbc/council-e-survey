import React from 'react';
import { useGetCollection } from '../hooks/useGetCollection';
import Loader from './UIComponents/Loader';

const Home = ({ authState: { user } }) => {
	const [blogs, loading, error] = useGetCollection('blogs');

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Home'>
			{/* {user && <Banner username={user.email} />} THIS SHOULD BE THE ADD QUESTION/TOGGLE BUTTON */}
			{/* {loading ? <Loader height='70vh' /> : <div className='blogs'>{blogsWidgets}</div>} QUESTION LIST */}
		</div>
	);
};

export default Home;
