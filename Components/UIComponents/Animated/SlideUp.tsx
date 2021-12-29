import React from 'react';
import Animatable from '../Animatable';

const SlideUp = ({ children, ...props }) => {
	return (
		<Animatable variants={variants} initial='initial' animate='final' {...props}>
			{children}
		</Animatable>
	);
};

export default SlideUp;

const variants = {
	initial: { y: 20, opacity: 0 },
	final: i => ({ y: 0, opacity: 1, transition: { duration: 0.2, type: "tween", ease: "easeOut", delay: i * 0.2 } })
};
