import React from 'react';
import Animatable from '../Animatable';

const SlideUp = ({ children, ...props }) => {
	return (
		<Animatable variants={variants} initial='initial' presence={false} exit='exit' animate='final' {...props}>
			{children}
		</Animatable>
	);
};

export default SlideUp;

const variants = {
	initial: { y: 40, opacity: 0 },
	final: i => ({ y: 0, opacity: 1, transition: { duration: 0.3, type: 'tween', ease: 'easeOut', delay: i * 0.1 } }),
	exit: { height: 0, opacity: 0, transition: { duration: 0.3, type: 'tween', ease: 'easeOut' } }
};
