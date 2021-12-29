import React from 'react';

const HideAnsweredQuestionsBanner = ({ onToggle }) => {
	return (
		<div className='HideAnsweredQuestionsBanner'>
			<label>
				<input onChange={({ target: { checked } }) => onToggle(checked)} type='checkbox' />
				<span>Hide answered questions</span>
			</label>
			{/* STYLE */}
			<style jsx>{`
				.HideAnsweredQuestionsBanner {
					background: var(--faintColor);
					border-radius: 5px;
					padding: 15px;
					margin-bottom: 20px;
				}

				label {
					display: flex;
					cursor: pointer;
					align-items: center;
					gap: 15px;
				}
			`}</style>
		</div>
	);
};

export default HideAnsweredQuestionsBanner;
