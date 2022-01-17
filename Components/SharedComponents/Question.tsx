import React, { useState, useRef } from 'react';
import SlideUp from '../UIComponents/Animated/SlideUp';
import { FaCheckCircle as IcCheck } from 'react-icons/fa';
import { BsFillPersonCheckFill as IconParticipants } from 'react-icons/bs';
import { AiOutlineCalendar as IconDate } from 'react-icons/ai';
import { MdModeEdit as IcEdit } from 'react-icons/md';
import { MdDelete as IcDelete } from 'react-icons/md';
import { httpsCallable } from 'firebase/functions';
import { funcs } from '../../firebase/clientApp';
import Button from '../UIComponents/Button';
import AreYouSureBox from '../UIComponents/AreYouSureBox';
import Link from 'next/link';

const Question = ({ isAdmin, id, question, index, datePosted, noAnswers = 0, hasAnswered }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const aysRef = useRef(null);

	/**
	 * HANDLE DELETING
	 */
	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			// Delete question
			const deleteQuestion = httpsCallable(funcs, 'deleteQuestion');
			await deleteQuestion({ questionID: id });
		} catch (e) {}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<SlideUp show={true} custom={index}>
			<div className='Question'>
				{/* QUESTION */}
				<div className='question'>
					<div className='lightText'>{id}</div>
					<p>{question}</p>
					<div className='details'>
						<QuestionDetail icon={<IconDate />} value={datePosted.toDate().toLocaleDateString()} />
						<QuestionDetail icon={<IconParticipants />} value={noAnswers.toString()} />
						{hasAnswered && <QuestionDetail isAnswered icon={<IcCheck />} />}
					</div>
				</div>

				{/* OPTIONS */}
				<div className='options'>
					{isAdmin && (
						<>
							{/* EDIT BUTTON */}
							{noAnswers === 0 && (
								<Link href={`/edit/${id}`}>
									<a>
										<Button secondType icon={<IcEdit />} />
									</a>
								</Link>
							)}

							{/* DELETE BUTTON */}
							<Button
								onClick={() => aysRef.current.openAreYouSureBox({ message: 'Delete this question', onYes: handleDelete })}
								secondType
								isLoading={isDeleting}
								spinnerColor='var(--primaryColor)'
								icon={<IcDelete />}
							/>
						</>
					)}
					<Link href={`/questions/${id}`}>
						<a>
							<Button>{isAdmin || hasAnswered ? 'View' : 'Answer'}</Button>
						</a>
					</Link>
				</div>
			</div>

			<AreYouSureBox ref={aysRef} />

			{/* STYLE */}
			<style jsx>{`
				.Question {
					padding: 20px;
					box-shadow: var(--boxShadow);
					margin-bottom: 10px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-radius: 5px;
					background: var(--backgroundColor);
				}
				.details {
					display: flex;
					gap: 10px;
				}
				.question p {
					margin: 12px 0;
				}

				.options {
					gap: 10px;
					display: flex;
				}

				@media screen and (max-width: 800px) {
					.Question {
						flex-direction: column;
						align-items: stretch;
					}
					.options {
						margin-top: 12px;
						border-top: 1px solid var(--borderColor);
						padding: 10px 0 0 0;
						display: flex;
						justify-content: center;
					}
				}
			`}</style>
		</SlideUp>
	);
};

export default Question;

const QuestionDetail = ({ icon, value = '', isAnswered = false }) => (
	<div className='QuestionDetail'>
		<div className='icon'>{icon}</div>
		{value && <span>{value}</span>}

		{/* STYLE */}
		<style jsx>{`
			.QuestionDetail {
				display: flex;
				align-items: center;
				background: ${isAnswered ? 'var(--successColor)' : 'var(--faintColor)'};
				padding: 8px 12px;
				font-size: 0.95rem;
				border-radius: 5px;
			}

			.icon {
				font-size: 1.2rem;
				margin-bottom: -5px;
				opacity: ${isAnswered ? '1' : 0.4};
			}

			.icon :global(svg) {
				color: ${isAnswered ? '#fff' : 'var(--textColor)'};
			}

			span {
				margin-left: 10px;
			}
		`}</style>
	</div>
);
