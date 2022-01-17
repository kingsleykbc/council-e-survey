import React, { FC } from 'react';
import Spinner from 'react-spinners/ScaleLoader';

interface ButtonProps {
	children?: any;
	className?: string;
	isLoading?: boolean;
	onClick?: any;
	icon?: any;
	responsiveHideText?: boolean;
	secondType?: boolean;
	spinnerColor?: string;
	responsiveHideIcon?: boolean;
}

const Button: FC<ButtonProps> = props => {
	const {
		children,
		icon,
		className = '',
		isLoading = false,
		onClick,
		spinnerColor = '#fff',
		responsiveHideIcon = false,
		responsiveHideText = false,
		secondType
	} = props;
	
	return (
		<button onClick={onClick} className={className} disabled={isLoading}>
			{isLoading ? (
				<Spinner color={spinnerColor} width={5} height={20} />
			) : (
				<>
					{icon && <div className='icon'>{icon}</div>}
					{children && <div className='child'>{children}</div>}
				</>
			)}

			{/* STYLE */}
			<style jsx>{`
				button {
					transition: all linear 0.2s;
					padding: ${isLoading || (icon && !children) ? '6px 10px' : '10px 15px'};
					display: inline-flex;
					align-items: center;
					gap: 10px;
					background: ${secondType ? 'var(--backgroundColor)' : 'var(--primaryColor)'};
					color: ${secondType ? 'var(--textColor)' : '#fff'};
					min-height: 38px;
				}

				.icon {
					font-size: 1.2rem;
					margin-bottom: -3px;
					display: ${responsiveHideIcon ? 'none' : 'block'};
					opacity: ${secondType ? 0.5 : 1};
				}

				@media screen and (max-width: 800px) {
					.icon {
						display: block;
					}
					.child {
						display: ${responsiveHideText ? 'none' : 'block'};
					}
				}
			`}</style>
		</button>
	);
};

export default Button;
