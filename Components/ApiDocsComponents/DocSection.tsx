import React from 'react';

const DocSection = ({ id=null, title, children }) => {
	return (
		<section id={id}>
			<h2>{title}</h2>
			<div>{children}</div>

			{/* STYLE */}
			<style jsx>{`
				div {
					margin-top: 20px;
				}
				section {
					margin-top: 35px;
				}
			`}</style>
		</section>
	);
};

export default DocSection;
