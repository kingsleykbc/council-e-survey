import Link from 'next/link';
import React from 'react';
import Option from './Option';

const QuestionDetails = ({ authState, data: { id, question, noAnswers, options, allowUsersViewResponses } }) => {
	const optionsWidgets = options.map((item, index) => (
		<Option allowUsersViewResponses={allowUsersViewResponses} authState={authState} key={item.id} data={item} />
	));
	const { isAdmin } = authState;

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			{/* HEADING SECTION */}
			<div className='heading'>
				<h2 className='lightText'>#{id}</h2>
				{noAnswers === 0 && isAdmin && (
					<Link href={`/edit/${id}`}>
						<a className='button'>Edit Question</a>
					</Link>
				)}
			</div>
			<div className='question whiteboard'>{question}</div>
			<div className='options whiteboard'>{optionsWidgets}</div>

			{/* STYLE */}
			<style jsx>{`
				.heading {
					padding: 20px 0;
					display: flex;
					align-items: center;
					gap: 15px;
					flex-wrap: wrap;
					justify-content: space-between;
				}
				.question {
					min-height: 100px;
				}
				.whiteboard.options {
					padding: 0;
				}
			`}</style>
		</div>
	);
};

export default QuestionDetails;
