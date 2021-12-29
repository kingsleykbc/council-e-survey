import React from 'react';

const QuestionsSkeleton = () => {
	return (
		<div>
			<QuestionSkeleton />
			<QuestionSkeleton />
			<QuestionSkeleton />
			<QuestionSkeleton />
		</div>
	);
};

export default QuestionsSkeleton;

export const QuestionSkeleton = () => {
	return (
		<div className='Question skeleton'>
			{/* STYLE */}
			<style jsx>{`
				.Question {
          width: 100%;
          height: 120px;
          box-shadow: var(--boxShadow);
          margin-bottom: 20px;
				}
			`}</style>
		</div>
	);
};
