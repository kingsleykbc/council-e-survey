import React, { useState } from 'react';
import EmptySet from '../UIComponents/EmptySet';
import { BiHide } from 'react-icons/bi';
import { FiInbox } from 'react-icons/fi';
import Stats from './ResultComponents/Stats';
import Chart from './ResultComponents/Chart';

const Result = ({ data: { allowUsersViewResponses }, liveData, liveData: { totalResponses, userVoted }, authState: { isAdmin } }) => {
	const [view, setView] = useState(false);
	const canViewResult = isAdmin || (userVoted && allowUsersViewResponses);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Result'>
			<div className='heading'>
				<h3 className='lightText'>Result</h3>
				{canViewResult && <div className='note'>Data is fetched live. No need to refresh your browser</div>}
			</div>

			{!canViewResult ? (
				<EmptySet margin='25px 0' icon={<BiHide />}>
					Results Hidden
					{allowUsersViewResponses && !isAdmin && <span className='prompt'>Post response to view result</span>}
				</EmptySet>
			) : totalResponses === 0 ? (
				<EmptySet margin='25px 0' icon={<FiInbox />}>
					No results yet
				</EmptySet>
			) : (
				<div className='whiteboard'>
					{view === false ? (
						<div className='toggle'>
							<button onClick={() => setView(true)}>View full results</button>
						</div>
					) : (
						<div className='data'>
							<Stats liveData={liveData} />
							<Chart liveData={liveData} />
						</div>
					)}
				</div>
			)}

			{/* STYLE */}
			<style jsx>{`
				.Result {
					margin-top: 30px;
				}
				.heading {
					margin-bottom: 20px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					gap: 15px;
				}

				.note {
					background: var(--faintColor);
					padding: 10px 12px;
					font-size: 0.95rem;
					color: var(--lightTextColor);
				}
				.toggle {
					text-align: center;
				}
				.prompt {
					padding-top: 20px;
					display: block;
					font-size: 0.9rem;
					font-weight: bold;
				}
			`}</style>
		</div>
	);
};

export default Result;
