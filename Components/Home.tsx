import React, { useEffect, useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { getQueryConstraints } from '../firebase/clientUtils';
import { QueryParam } from '../utils/types';
import Loader from './UIComponents/Loader';
import { db } from '../firebase/clientApp';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Question from './SharedComponents/Question';
import QuestionsSkeleton from './UIComponents/Skeletons/QuestionsSkeleton';
import AdminCreateBanner from './HomeComponents/AdminCreateBanner';
import HideAnsweredQuestionsBanner from './HomeComponents/HideAnsweredQuestionsBanner';

const Home = ({ authState: { isAdmin } }) => {
	const { keyword } = useSearch();
	const [questions, setQuestions] = useState(null);

	// Get Questions from Firestore
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

	const questionWidgets = questions?.map((item, index) => <Question key={item.id} index={index} {...item} />);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Home'>
			{isAdmin ? <AdminCreateBanner /> : <HideAnsweredQuestionsBanner onToggle={(togs) => alert(togs)} />}
			{questions ? questionWidgets : <QuestionsSkeleton />}
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
