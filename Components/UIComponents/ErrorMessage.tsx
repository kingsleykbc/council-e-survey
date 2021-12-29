import React from 'react';
import Animatable from './Animatable';

const ErrorMessage = ({ error, center = false }) => {
	return (
		<Animatable
			variants={{ initial: { scale: 0.7, opacity: 0 }, final: { scale: 1, opacity: 1, transition: { ease: 'easeOut' } } }}
			initial='initial'
			animate='final'
			exit='initial'
			show={error !== ''}
		>
			<h5 className={center ? 'aCenter' : "aLeft"}>{error}</h5>
		</Animatable>
	);
};

export default ErrorMessage;
