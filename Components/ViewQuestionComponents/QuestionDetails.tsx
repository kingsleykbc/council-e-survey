import React, { FC } from 'react';
import Link from 'next/link';
import Option from './Option';
import { AuthStateType, ResponseData } from '../../utils/types';

type QuestionDetailsProps = {
	authState: AuthStateType;
	data: any;
	liveData: ResponseData;
};

const QuestionDetails: FC<QuestionDetailsProps> = ({
	authState,
	data: { id, question, options, allowUsersViewResponses },
	liveData: { totalResponses, options: opts, userVoted }
}) => {

	const optionsWidgets = options.map(item => (
		<Option
			key={item.id}
			data={{ ...item, ...opts[item.id] }}
			questionID={id}
			totalResponses={totalResponses}
			userVoted={userVoted}
			authState={authState}
			allowUsersViewResponses={allowUsersViewResponses}
		/>
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
				{totalResponses === 0 && isAdmin && (
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
