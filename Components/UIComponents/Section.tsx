import React from 'react';

const Section = ({ children, maxWidth = '900px', bottomPadding = '20px', makeCard = false }) => {
	return (
		<div className={makeCard ? 'card' : ''}>
			{children}

			{/* STYLE */}
			<style jsx>{`
				div {
					max-width: ${maxWidth};
					padding: 20px;
					padding-bottom: ${bottomPadding};
					margin: auto;
				}

				.card {
					background: var(--backgroundColor);
					border-radius: 5px;
					box-shadow: var(--boxShadow);
					padding: 20px;
					margin: 20px auto;
				}

				@media screen and (max-width: 500px) {
					.card {
						margin-top: 0;
						box-shadow: none;
					}
				}
			`}</style>
		</div>
	);
};

export default Section;
