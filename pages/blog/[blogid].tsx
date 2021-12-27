import React from 'react';
import Loader from '../../Components/UIComponents/Loader';
import Section from '../../Components/UIComponents/Section';
import ViewBlog from '../../Components/ViewBlog';
import { useRouter } from 'next/router';


const blog = () => {
	const { query } = useRouter();

	// Because the hook only runs once, you have to wait for the blogid before proceeding
	if (!query.blogid) return <Loader height='70vh'/> 

	return <ViewBlog blogID={query.blogid} />;
};

export default blog;
