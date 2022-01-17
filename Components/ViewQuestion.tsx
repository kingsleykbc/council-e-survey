import React, { useEffect, useState } from 'react';
import QuestionDetails from './ViewQuestionComponents/QuestionDetails';
import Result from './ViewQuestionComponents/Result';
import Router, { useRouter } from 'next/router';
import { getDocument, getDocuments } from '../firebase/clientUtils';
import { db } from '../firebase/clientApp';
import { collection, onSnapshot, query as qry, doc, where } from 'firebase/firestore';
import Loader from './UIComponents/Loader';
import { ResponseData } from '../utils/types';

const ViewQuestion = ({ authState }) => {
	const { query } = useRouter();
	const [data, setData] = useState(null);
	const [liveData, setLiveData] = useState<ResponseData>(null);

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
			if (newData.empty) Router.push('/');
			newData.options = await getOptions();
			setData(newData);
		};
		if (query.questionID) getQuestion();
	}, [query.questionID]);

	/**
	 * LISTEN FOR RESPONSES LIVE
	 */
	useEffect(() => {
		if (data && data.id) {
			const q = qry(collection(db, 'responses'), where('questionID', '==', data.id));
			const unsub = onSnapshot(q, snapshot => {
				setLiveData(formatLiveData(snapshot.docs, authState.userData.id, data.options));
			});
			return unsub;
		}
	}, [data]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!data || !liveData) return <Loader />;
	return (
		<div className='ViewQuestion'>
			<QuestionDetails authState={authState} data={data} liveData={liveData} />
			<Result authState={authState} data={data} liveData={liveData} />

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

/**
 * FORMAT LIVE DATA
 */
const formatLiveData = (data: Array<any>, uid: string, opts: [{ id; option }]): ResponseData => {
	let totalResponses = 0,
		userVoted = false,
		options = {},
		totalResponseTimes = 0;

	for (const { id, option: opt } of opts) {
		options[id] = { noResponses: 0, value: opt, selected: false };
	}

	for (const doc of data) {
		const { datePosted, optionID, userID } = doc.data();
		totalResponses++;
		totalResponseTimes += datePosted.toDate().getTime();

		// Check if this user voted, and get the selected option
		if (userID === uid) {
			userVoted = true;
			options[optionID].selected = true;
		}
		options[optionID].noResponses++;
	}

	return { totalResponses, averageResponseTime: new Date(totalResponseTimes / data.length), userVoted, options };
};
