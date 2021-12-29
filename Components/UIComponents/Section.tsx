import React from 'react';

const Section = ({ children, maxWidth = '900px' }) => {
	return (
		<div>
			{children}

			{/* STYLE */}
			<style jsx>{`
				div {
					max-width: ${maxWidth};
					padding: 20px;
					margin: auto;
				}
			`}</style>
		</div>
	);
};

export default Section;
