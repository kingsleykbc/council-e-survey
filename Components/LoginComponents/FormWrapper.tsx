import React from 'react';
import Animatable from '../UIComponents/Animatable';
import { useRouter } from 'next/router';

const FormWrapper = ({ children, show, route, isLogin = false }) => {
	const { pathname } = useRouter();

	return (
		<Animatable
			variants={{
				hidden: { opacity: 0, x: -100 },
				visible: { opacity: 1, x: 0 },
				exit: { opacity: 0, x: 100 }
			}}
			initial='hidden'
			animate='visible'
			exit='exit'
			transition={{ duration: 0.25 }}
			show={show}
			id={route}
		>
			{route}
			{children}
		</Animatable>
	);
};

export default FormWrapper;
