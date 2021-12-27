import React from 'react';
import Section from './UIComponents/Section';
import Blog from './HomeComponents/Blog';
import { useGetCollection } from '../hooks/useGetCollection';
import Banner from './HomeComponents/Banner';
import Loader from './UIComponents/Loader';

const Home = ({ authState: { user } }) => {
	const [blogs, loading, error] = useGetCollection('blogs');

	const blogsWidgets = blogs?.map((item, index) => (
		<Blog key={item.id} animationDelay={index / (blogs.length * 5)} isFeatured={index === 0} {...item} date={item.date?.toDate()} />
	));

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Home'>
			{user && <Banner username={user.email} />}
			{loading ? <Loader height='70vh' /> : <div className='blogs'>{blogsWidgets}</div>}

			{/* STYLE */}
			<style jsx>{`
				.blogs {
					display: grid;
					grid-template-columns: repeat(12, 1fr);
					grid-auto-rows: minmax(100px, auto);
					grid-gap: 10px;
				}
			`}</style>
		</div>
	);
};

export default Home;
