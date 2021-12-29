import React from 'react';
import SlideUp from '../UIComponents/Animated/SlideUp';

const Question = ({ question, index }) => {
	return (
		<SlideUp custom={index}>
			<div className='Question'>{question}</div>

			{/* STYLE */}
			<style jsx>{`
				.Question {
					padding: 30px;
					box-shadow: var(--boxShadow);
					margin-bottom: 10px;
				}
			`}</style>
		</SlideUp>
	);
};

export default Question;
