import React, { useEffect, useState } from 'react';
import QuestionDetails from './ViewQuestionComponents/QuestionDetails';
import Result from './ViewQuestionComponents/Result';
import { useRouter } from 'next/router';
import { getDocument, getDocuments } from '../firebase/clientUtils';
import Loader from './UIComponents/Loader';

const ViewQuestion = ({ authState }) => {
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
		getQuestion();
	}, []);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!data) return <Loader />;
	return (
		<div className='ViewQuestion'>
			<QuestionDetails authState={authState} data={data} />
			<Result />

			{/* STYLE */}
			<style jsx>{`
				:global(.whiteboard) {
					padding: 20px;
					border-radius: 5px;
					background: var(--backgroundColor);
					box-shadow: var(--boxShadow);
					margin: 10px 0;
					overflow: hidden;
				}
			`}</style>
		</div>
	);
};

export default ViewQuestion;
