import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Animatable = ({
	id = '',
	variants = undefined,
	initial = {},
	animate = {},
	transition = {},
	exit = {},
	show = true,
	inline = false,
	display = null,
	presenceInitial = true,
	exitBeforeEnter = true,
	children
}) => {
	const comp = (
		<motion.div
			key={id}
			variants={variants}
			initial={initial}
			animate={animate}
			transition={transition}
			exit={exit}
			className='AnimatableComponentGlobal'
		>
			{children}
			{/* STYLE */}
			<style jsx>{`
				:global(.AnimatableComponentGlobal) {
					display: ${display || inline ? 'inline-block' : 'block'};
					max-width: 100%;
				}
			`}</style>
		</motion.div>
	);

	if (exit) return <AnimatePresence initial={presenceInitial} exitBeforeEnter={exitBeforeEnter}>{show && comp}</AnimatePresence>;
	return comp;
};

export default Animatable;
