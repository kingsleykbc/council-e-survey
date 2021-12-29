import React from 'react';

const TestCredentials = ({ isAdmin = false, onSelect }) => {
	const data = isAdmin
		? { email: 'admin@shangrila.gov.un', password: 'shangrila@2021$' }
		: { email: 'kim@gmail.com', password: 'password12' };

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div onClick={() => onSelect(data)}>
			Use test Credentials
			{/* STYLE */}
			<style jsx>{`
				div {
					max-width: 200px;
					margin: auto;
					cursor: pointer;
					text-align: center;
					padding: 12px 15px;
					background: var(--faintColor);
					border-radius: 5px;
				}
			`}</style>
		</div>
	);
};

export default TestCredentials;
