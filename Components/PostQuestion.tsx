import React, { useEffect, useState } from 'react';
import OptionsForm from './PostQuestionComponents/OptionsForm';
import QuestionForm from './PostQuestionComponents/QuestionForm';
import Button from './UIComponents/Button';
import ErrorMessage from './UIComponents/ErrorMessage';
import SectionTitle from './UIComponents/SectionTitle';
import { httpsCallable } from 'firebase/functions';
import { funcs } from '../firebase/clientApp';
import Loader from './UIComponents/Loader';

import Router from 'next/router';

const PostQuestion = ({ initialValues = null }) => {
	const [questionAndAccessibility, setQuestionAndAccessibility] = useState({ question: '', allowUsersViewResponses: false });
	const [options, setOptions] = useState([]);
	const [error, setError] = useState('');
	const [mounted, setMounted] = useState(false);
	const [loading, setLoading] = useState(false);

	/**
	 * GET INITIAL VALUES (IF THIS IS FOR EDITING)
	 */
	useEffect(() => {
		if (initialValues) {
			const qA = { question: initialValues.question, allowUsersViewResponses: initialValues.allowUsersViewResponses };
			setQuestionAndAccessibility(qA);
			const opts = initialValues.options.map(({ option }) => ({ option }));
			setOptions(opts);
		}
		setMounted(true);
	}, [initialValues]);

	/**
	 * POST QUESTION
	 */
	const handlePostQuestion = async () => {
		setError('');
		setLoading(true);
		try {
			const { question, allowUsersViewResponses } = questionAndAccessibility;

			// Validate
			if (!question.trim()) throw Error('Please enter the question.');
			if (options.length < 2) throw Error('Enter at least two options.');

			// Setup data
			const data: any = { question, allowUsersViewResponses, options };
			if (initialValues) data.id = initialValues.id;

			// Add question data
			const addQuestion = httpsCallable(funcs, 'addQuestion');
			const questionData: any = await addQuestion(data);

			// If error
			if (!questionData.data.success) throw Error(questionData.data.message);

			Router.push('/');
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!mounted) return <Loader />;
	return (
		<div className='PostQuestion'>
			<SectionTitle>{initialValues ? `Edit	${initialValues.id}` : 'Post new question'}</SectionTitle>

			{/* FIELDS */}
			<QuestionForm value={questionAndAccessibility} onChange={result => setQuestionAndAccessibility(result)} />
			<OptionsForm value={options} onChange={opts => setOptions(opts)} />

			{/* SUBMIT */}
			<div className='aCenter marg'>
				<ErrorMessage center error={error} />
				<Button onClick={handlePostQuestion} isLoading={loading}>
					Publish Question
				</Button>
			</div>
		</div>
	);
};

export default PostQuestion;
