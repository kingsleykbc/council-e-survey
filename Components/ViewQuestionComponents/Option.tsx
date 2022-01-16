import React, { useRef } from 'react';
import { MdOutlineCheckBoxOutlineBlank as Unchecked } from 'react-icons/md';
import { SiCheckmarx as Checked } from 'react-icons/si';
import AreYouSureBox from '../UIComponents/AreYouSureBox';

const Option = ({
	data: { id, option, percentage = 60, respondents = [] },
	questionID,
	userVoted = true,
	authState: {
		isAdmin,
		userData: { id: userID }
	},
	allowUsersViewResponses
}) => {
	const aysRef = useRef(null);
	const canViewResult = isAdmin || (userVoted && allowUsersViewResponses);
	const selected = respondents.indexOf(userID) !== -1;

	/**
	 * SELECT THIS OPTION
	 */
	const handleSelect = () => {};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div
			className={`Option ${isAdmin || userVoted ? '' : 'clickable'} `}
			onClick={
				isAdmin || userVoted ? () => {} : () => aysRef.current.openAreYouSureBox({ message: 'Submit this option', onYes: handleSelect })
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
				{canViewResult && <div className='lightText'>{percentage}%</div>}
			</div>

			{/* VOTES */}
			{canViewResult && (
				<div className='votes'>
					<div className='bar'></div>
				</div>
			)}

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
			`}</style>
		</div>
	);
};

export default Option;
