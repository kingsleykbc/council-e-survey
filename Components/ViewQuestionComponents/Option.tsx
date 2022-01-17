import React, { useRef, useState } from 'react';
import { MdOutlineCheckBoxOutlineBlank as Unchecked } from 'react-icons/md';
import { SiCheckmarx as Checked } from 'react-icons/si';
import { AiOutlineCloseCircle as IcClose } from 'react-icons/ai';
import AreYouSureBox from '../UIComponents/AreYouSureBox';
import { httpsCallable } from 'firebase/functions';
import { funcs } from '../../firebase/clientApp';
import SlideUp from '../UIComponents/Animated/SlideUp';
import Animatable from '../UIComponents/Animatable';

const Option = ({
	data: { id, option, noResponses, selected },
	questionID,
	totalResponses,
	userVoted,
	authState: { isAdmin },
	allowUsersViewResponses
}) => {
	const [statusMessage, setStatusMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const noData = totalResponses === 0;
	const aysRef = useRef(null);
	const canViewResult = isAdmin || (userVoted && allowUsersViewResponses);
	const canAnswer = !(isAdmin || userVoted);
	const percentage = noData ? 0 : (noResponses / totalResponses) * 100;

	/**
	 * SELECT THIS OPTION
	 */
	const handleSelect = async () => {
		setIsLoading(true);
		setStatusMessage('Sending response...');
		try {
			// Add question data
			const answerQuestion = httpsCallable(funcs, 'answerQuestion');
			const questionData: any = await answerQuestion({ questionID, optionID: id });

			// If error
			if (!questionData.data.success) throw Error(questionData.data.message);

			setStatusMessage('Response successful! Thanks');
		} catch (e) {
			setStatusMessage(e.message);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div
			className={`Option ${canAnswer && 'clickable'} `}
			onClick={
				canAnswer && !isLoading ? () => aysRef.current.openAreYouSureBox({ message: 'Submit this option', onYes: handleSelect }) : () => {}
			}
		>
			<div className='optionContent'>
				{/* CHECK ICON */}
				<div className='icon'>
					{selected ? <Checked style={{ color: 'var(--successColor)' }} /> : <Unchecked style={{ color: 'var(--lightTextColor)' }} />}
				</div>

				{/* QUESTION */}
				<div className='optionText'>{option}</div>

				{/* VOTES */}
				{canViewResult && <div className='lightText'>{percentage.toFixed(1)}%</div>}
			</div>

			{/* VOTES */}
			{canViewResult && (
				<div className='votes'>
					<div className='bar'></div>
				</div>
			)}

			<SlideUp presence={true} show={statusMessage}>
				<div
					className={`statusMessage ${
						statusMessage.toLocaleLowerCase().includes('success')
							? 'success'
							: statusMessage.toLocaleLowerCase().includes('sending')
							? ''
							: 'error'
					}`}
				>
					<span>{statusMessage}</span>
					<div className='ic'>
						<IcClose
							onClick={e => {
								e.stopPropagation();
								setStatusMessage('');
							}}
						/>
					</div>
				</div>
			</SlideUp>

			<AreYouSureBox ref={aysRef} />

			{/* STYLE */}
			<style jsx>{`
				.Option {
					border-bottom: var(--border);
				}
				.clickable:hover {
					cursor: pointer;
					background: var(--faintColor);
				}
				.optionContent {
					padding: 17px 15px;
					display: flex;
					align-items: center;
				}
				.optionText {
					flex-grow: 1;
				}
				.votes {
					background: var(--faintColor);
					height: 5px;
					font-size: 0.8rem;
					color: #fff;
					font-weight: bold;
					position: relative;
				}
				.icon {
					margin-right: 15px;
					font-size: 1.6rem;
					margin-bottom: -6px;
				}
				.bar {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: ${percentage}%;
					background: var(--successColor);
					transition: width 0.2s ease-out;
				}
				.statusMessage {
					position: fixed;
					background: var(--backgroundColor);
					bottom: 30px;
					padding: 12px 15px;
					border-radius: 5px;
					left: 50%;
					display: flex;
					align-items: center;
					transform: translateX(-50%);
					box-shadow: var(--boxShadow);
					gap: 10px;
					overflow: hidden;
				}

				.statusMessage.success,
				.statusMessage.error {
					color: #fff;
				}

				.statusMessage.success {
					background: var(--successColor);
				}

				.statusMessage.error {
					background: rgb(233, 18, 83);
				}

				.ic {
					opacity: 0.5;
					cursor: pointer;
					font-size: 1.5rem;
					flex-shrink: 0;
				}
			`}</style>
		</div>
	);
};

export default Option;
