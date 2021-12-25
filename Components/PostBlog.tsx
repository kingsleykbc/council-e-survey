import React, { useRef, useState } from 'react';
import { addDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase/clientApp';
import Router from 'next/router';

const PostBlog = ({ authState: { user } }) => {
	const [error, setError] = useState('');
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const contentRef = useRef(null);
	const imageRef = useRef(null);
	const colorRef = useRef(null);

	/**
	 * HANDLE POST
	 */
	const handlePost = async e => {
		e.preventDefault();
		try {
			const data = {
				title: titleRef.current?.value,
				subtitle: subtitleRef.current?.value,
				content: contentRef.current?.value,
				image: imageRef.current?.value,
				color: colorRef.current?.value,
				date: new Date(),
				author: user ? doc(db, 'users', user.uid) : null
			};
			const collectionRef = collection(db, 'blogs');
			await addDoc(collectionRef, data);
			Router.push('/');
		} catch (e) {
			setError(e.message);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='PostBlog'>
			<form onSubmit={handlePost}>
				<p>Title</p>
				<input ref={titleRef} type='text' required />

				<p>Subtitle</p>
				<input ref={subtitleRef} type='text' required />

				<p>Content</p>
				<textarea ref={contentRef} required />

				<p>Image</p>
				<input ref={imageRef} type='text' />

				<p>Color</p>
				<input ref={colorRef} defaultValue='#ff912a' type='color' />

				<div className='aCenter'>
					<button>POST</button>

					{error && <h5>{error}</h5>}
				</div>
			</form>
		</div>
	);
};

export default PostBlog;
