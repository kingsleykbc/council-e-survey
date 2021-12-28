import React from 'react';

const Button = ({children, isLoading, onClick}) => {
	return <button disabled={isLoading}>{children}</button>;
};

export default Button;
