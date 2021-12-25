import React from 'react';
import PostBlog from '../Components/PostBlog';
import Section from '../Components/UIComponents/Section';

const post = ({ authState }) => {
	return (
		<Section>
			<PostBlog authState={authState} />
		</Section>
	);
};

export default post;
