import React from 'react';
import Loader from '../../Components/UIComponents/Loader';
import Section from '../../Components/UIComponents/Section';
import ViewBlog from '../../Components/ViewBlog';

const blog = ({ authState }) => {
	if (!authState.user) return <Loader height='70vh' />;

	return <ViewBlog authState={authState} />;
};

export default blog;
