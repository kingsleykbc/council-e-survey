import React from 'react';

const Footer = () => {
	return (
		<div className='lightText'>
			CO7102 Coursework - Kingsley C.A. &copy;{new Date().getFullYear()} - <a target="blank" href="https://github.com/kingsleykbc/council-e-survey">GitHub</a>

			{/* STYLE */}
			<style jsx>{`
				div {
					text-align: center;
          padding: 25px 0;
          font-size: 0.95rem;
				}
				a {
					text-decoration: underline;
				}
			`}</style>
		</div>
	);
};

export default Footer;
