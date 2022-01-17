import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getDocument, getDocuments } from '../firebase/clientUtils';
import PostQuestion from './PostQuestion';
import Loader from './UIComponents/Loader';

const EditQuestion = () => {
	const { query } = useRouter();
	const [data, setData] = useState(null);

	/**
	 * GET DATA
	 */
	useEffect(() => {
		const getOptions = async () => {
			const options = await getDocuments('options', [{ field: 'where', value: ['questionID', '==', query.questionID] }]);
			return options;
		};

		const getQuestion = async () => {
			const newData: any = await getDocument('questions', query.questionID);
			newData.options = await getOptions();
			setData(newData);
		};
		if (query.questionID) getQuestion();
	}, [query.questionID]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!data) return <Loader />;
	return <PostQuestion initialValues={data} />;
};

export default EditQuestion;
