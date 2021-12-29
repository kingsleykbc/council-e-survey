import React, { FC } from 'react';
import Spinner from 'react-spinners/ScaleLoader';

interface ButtonProps {
	children?: any;
	className?: string;
	isLoading?: boolean;
	onClick?: any;
}

const Button: FC<ButtonProps> = props => {
	const { children, className = '', isLoading = false, onClick } = props;
	return (
		<button onClick={onClick} className={className} disabled={isLoading}>
			{isLoading ? <Spinner color='#fff' width={5} height={20} /> : children}

			{/* STYLE */}
			<style jsx>{`
				button {
					transition: all linear 0.2s;
					padding: ${isLoading ? '7px 10px' : '10px 15px'};
				}
			`}</style>
		</button>
	);
};

export default Button;
