import React, { useState } from 'react';
import EmptySet from '../UIComponents/EmptySet';

const Result = () => {
	const noData = false;
	const [view, setView] = useState(false);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Result'>
			<h3 className='lightText'>Result</h3>

			{noData ? (
				<EmptySet>No results yet</EmptySet>
			) : (
				<div className='whiteboard'>
					{view === false ? (
						<div className='toggle'>
							<button onClick={() => setView(true)}>View full results</button>
						</div>
					) : (
						<div className='data'></div>
					)}
				</div>
			)}

			{/* STYLE */}
			<style jsx>{`
				.Result {
					margin-top: 30px;
				}
				h3 {
					margin-bottom: 20px;
				}
				.toggle {
					text-align: center;
				}
			`}</style>
		</div>
	);
};

export default Result;
