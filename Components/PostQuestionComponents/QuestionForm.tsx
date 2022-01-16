import React, { useState } from 'react';

/**
 * FORM FIELD FOR THE QUESTION TEXT AND ACCESSIBILITY
 */
const QuestionForm = ({ onChange, value }) => {
	const [question, setQuestion] = useState(value.question);
	const [allowUsersViewResponses, setAllowUsersViewResponses] = useState(value.allowUsersViewResponses);

	/**
	 *	HANDLE ON CHANGE
	 */
	const handleChanged = e => {
		const {
			target: { name, checked, value }
		} = e;
		let newQuestion = question,
			newAllowViewResponse = allowUsersViewResponses;
		if (name === 'allow') {
			newAllowViewResponse = checked;
			setAllowUsersViewResponses(newAllowViewResponse);
		} else {
			newQuestion = value;
			setQuestion(newQuestion);
		}
		onChange({ question: newQuestion, allowUsersViewResponses: newAllowViewResponse });
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='QuestionForm form'>
			<p>Question</p>
			<textarea
				placeholder='Enter the survey question (Max length of 400 characters)'
				value={question}
				maxLength={500}
				onChange={handleChanged}
			/>

			<label>
				<input type='checkbox' name='allow' checked={allowUsersViewResponses} onChange={handleChanged} />
				<span>Allow users to view responses to this question</span>
			</label>

			{/* STYLE */}
			<style jsx>{`
				.QuestionForm {
					margin-bottom: 20px;
				}

				label {
					padding: 15px 0;
					display: inline-flex;
					gap: 15px;
					align-items: center;
				}
			`}</style>
		</div>
	);
};

export default QuestionForm;
