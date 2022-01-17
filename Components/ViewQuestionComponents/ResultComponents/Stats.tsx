import React, { useEffect, useState, FC } from 'react';
import { getDocument, getDocuments } from '../../../firebase/clientUtils';

const Stats: FC<any> = ({ liveData, liveData: { totalResponses, averageResponseTime } }) => {
	const [percentResponded, setPercentResponded] = useState('...');

	/**
	 * CALCULATE THE PERCENTAGE OF USERS THAT RESPONDED
	 */
	useEffect(() => {
		try {
			const getData = async () => {
				const allUsers = await getDocuments('users');
				setPercentResponded(((allUsers.length / totalResponses) * 100).toFixed(1));
			};
			if (liveData) getData();
		} catch (e) {}
	}, [liveData]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div id="resultView" className='stats'>
			<div className='stat'>
				<h4>Total Responses</h4>
				<p>{totalResponses}</p>
			</div>

			<div className='stat'>
				<h4>Average response date</h4>
				<p>{averageResponseTime.toLocaleString()}</p>
			</div>

			<div className='stat'>
				<h4>Percentage of respondents</h4>
				<p>{percentResponded}%</p>
			</div>

			{/* STYLE */}
			<style jsx>{`
				.stats {
					display: flex;
					flex-wrap: wrap;
					gap: 10px;
				}

				h4 {
					font-weight: normal;
					color: var(--lightTextColor);
				}

				p {
					font-size: 1.3rem;
					margin-top: 12px;
				}

				.stat {
					flex-grow: 1;
					border-radius: 5px;
					box-shadow: var(--boxShadow);
					padding: 15px;
					text-align: center;
				}
			`}</style>
		</div>
	);
};

export default Stats;
