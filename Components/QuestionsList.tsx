import React, { useEffect, useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { getQueryConstraints } from '../firebase/clientUtils';
import { QueryParam } from '../utils/types';
import { db } from '../firebase/clientApp';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Question from './SharedComponents/Question';
import QuestionsSkeleton from './UIComponents/Skeletons/QuestionsSkeleton';
import AdminCreateBanner from './HomeComponents/AdminCreateBanner';
import HideAnsweredQuestionsBanner from './HomeComponents/HideAnsweredQuestionsBanner';
import { AnimatePresence } from 'framer-motion';
import Lightbox from './UIComponents/Lightbox';
import Button from './UIComponents/Button';

const Home = ({ authState: { isAdmin, userData } }) => {
	const { keyword } = useSearch();
	const [questions, setQuestions] = useState(null);
	const [hideAnswered, setHideAnswered] = useState(false);

	/**
	 * GET DATA FROM FIRESTORE
	 */
	useEffect(() => {
		// Setup Query
		const collectionRef = collection(db, 'questions');
		const q = query(collectionRef, ...getQueryConstraints(getQueryParams(keyword)));

		// Subscribe query (for real-time update)
		const unsub = onSnapshot(q, snapshot => {
			setQuestions(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		});
		return unsub;
	}, [keyword]);

	// Map data to components
	const questionWidgets = questions?.map((item, index) => {
		const hasAnswered = userData.answeredQuestions?.includes(item.id);

		// If the hideAnswered option is turned on, don't map to widget
		if (hideAnswered && hasAnswered) return <></>;
		return <Question isAdmin={isAdmin} hasAnswered={hasAnswered} key={item.id} index={index} {...item} />;
	});


	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Home'>
			{isAdmin ? <AdminCreateBanner /> : <HideAnsweredQuestionsBanner onToggle={hide => setHideAnswered(hide)} />}
			{questions ? <AnimatePresence>{questionWidgets}</AnimatePresence> : <QuestionsSkeleton />}
		</div>
	);
};

export default Home;

// GET THE QUERY PARAMS
const getQueryParams = (keyword): Array<QueryParam> => {
	const queryParams: Array<QueryParam> = [];
	if (keyword.trim()) {
		queryParams.push({ field: 'orderBy', value: 'question' });
		queryParams.push({ field: 'where', value: ['question', '>=', keyword] });
		queryParams.push({ field: 'where', value: ['question', '<=', `${keyword}\uf8ff`] });
	}
	queryParams.push({ field: 'orderBy', value: 'datePosted' });
	return queryParams;
};
