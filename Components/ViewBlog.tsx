import React, { useEffect, useState } from 'react';
import { useGetCollection } from '../hooks/useGetCollection';
import { getDoc } from 'firebase/firestore';
import Loader from './UIComponents/Loader';
import { motion } from 'framer-motion';

const ViewBlog = ({ blogID }) => {
	const [author, setAuthor] = useState('');
	const [blog] = useGetCollection('blogs', blogID);

	useEffect(() => {
		// Get author name
		const getAuthor = async () => {
			const a = await getDoc(blog.author);
			const data = a.data();
			setAuthor(data.name);
		};
		if (blog && blog.author) getAuthor();
	}, [blog]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!blog) return <Loader height='70vh' />;
	const { color, title, subTitle = 'No subtitle', image, content, date } = blog;
	return (
		<div className='ViewBlog'>
			<div className='ribbon'></div>

			<motion.div variants={contentVariant} initial='init' animate='final'>
				<div className='content'>
					<h1>{blog.title}</h1>
					<div className='sub lightText'>
						<span>{subTitle}</span>
						<span>Posted {new Date(date ? date.toDate() : new Date()).toLocaleString()}</span>
					</div>
					<div className='image'>
						<img src={image || '/images/default.png'} alt='Article Image' />
					</div>
					<p>{content}</p>
					author: {author ? author : 'Unknown'}
				</div>
			</motion.div>

			{/* STYLE */}
			<style jsx>{`
				.ribbon {
					position: absolute;
					top: 50px;
					z-index: -1;
					left: 0;
					right: 0;
					height: 200px;
					background: ${color || 'var(--primary)'};
				}

				.sub {
					padding: 20px 0;
					display: flex;
					flex-direction: column;
					gap: 10px;
					justify-content: space-between;
				}

				.content {
					background: #fff;
					padding: 15px;
					max-width: 800px;
					margin: auto;
					margin-top: 10px;
					min-height: 70vh;
				}

				img {
					width: 100%;
					border-radius: 5px;
				}

				p {
					padding: 20px 0;
					border-bottom: 1px solid var(--borderColor);
					margin-bottom: 20px;
				}
				@media screen and (min-width: 800px) {
					.content {
						padding: 25px;
						margin-top: 60px;
						border-radius: 5px;
						box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
					}

					.sub {
						flex-direction: row;
					}
				}
			`}</style>
		</div>
	);
};

// VARIANTS
const contentVariant = {
	init: { y: 100 },
	final: { y: 0, transition: { duration: 0.25, type: 'tween', ease: 'easeOut' } }
};

export default ViewBlog;
