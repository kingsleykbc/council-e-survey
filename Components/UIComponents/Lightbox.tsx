import React, { useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

const Lightbox = props => {
	let {
		show,
		title,
		autoWidth,
		width,
		autoHeight,
		height,
		contentPadding,
		isFullScreen,
		toggle,
		onClose,
		isFixed,
		children,
		className: cName,
		showCancelButton,
		closeOnBackClick,
		fullScreenInResponsive
	} = props;

	const [display, setDisplay] = useState('none');
	const [displayClass, setDisplayClass] = useState('show');

	/**
	 * CLOSE LIGHTBOX
	 */
	const closeBox = () => {
		setDisplay('none');
		if (onClose) onClose();
	};

	/**
	 * HANDLE TOGGLE CHANGE
	 */
	useEffect(() => {
		let timeOut;

		if (show) {
			setDisplayClass('show');
			setDisplay('block');
		} else {
			setDisplayClass('hide');
			timeOut = setTimeout(closeBox, 250);
		}
		return () => clearTimeout(timeOut);
	}, [show]);

	/**
	 * SETUP CSS
	 */
	contentPadding = contentPadding || '15px';

	const maxHeight = height ? height : isFullScreen || autoHeight ? 'none' : '400px';
	const maxWidth = width ? width : isFullScreen || autoWidth ? 'none' : '800px';
	const mainWidth = isFullScreen ? '100%' : autoWidth ? 'auto' : '90%';
	const mainHeight = isFullScreen ? '100%' : autoHeight ? 'auto' : '90%';
	const borderRadius = isFullScreen ? '0' : '5px';

	const mobileMaxWidth = fullScreenInResponsive ? 'none' : maxWidth;
	const mobileMaxHeight = fullScreenInResponsive ? 'none' : maxHeight;
	const mobileMainWidth = fullScreenInResponsive ? '100%' : mainWidth;
	const mobileMainHeight = fullScreenInResponsive ? '100%' : mainHeight;
	const mobileBorderRadius = fullScreenInResponsive ? '0' : borderRadius;

	if (isFixed) {
		showCancelButton = false;
		closeOnBackClick = false;
	}

	// =======================================================================
	//  UI
	// =======================================================================
	return (
		<div className={`Lightbox ${displayClass}`}>
			<div className='box'>
				{/* TITLE */}
				{title && <div className='title'>{title}</div>}

				{/* CANCEL BUTTON */}
				{showCancelButton !== false && (
					<div className='cancelButton' onClick={toggle}>
						<IoIosClose />
					</div>
				)}

				{/* CONTENT */}
				<div className='content'> {children} </div>
			</div>

			<div className='backdrop' onClick={closeOnBackClick !== false ? toggle : null}></div>

			{/* STYLE */}
			<style jsx>{`
				.Lightbox {
					position: fixed;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					background: transparent;
					display: ${display};
					z-index: 5;
				}

				.title {
					padding: 18px;
					font-weight: bold;
					font-size: 1.1rem;
					border-bottom: var(--border);
				}

				.backdrop {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					opacity: 0;
					cursor: ${closeOnBackClick === false ? 'auto' : 'pointer'};
					z-index: 3;
					background: rgba(0, 0, 0, 0.4);
				}

				.show .backdrop {
					animation: fadeIn 0.25s 1 linear forwards;
				}

				.hide .backdrop {
					animation: fadeOut 0.25s 1 ${`linear`} forwards;
				}

				@keyframes fadeIn {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}

				@keyframes fadeOut {
					0% {
						opacity: 1;
					}
					100% {
						opacity: 0;
					}
				}

				.box {
					background: var(--backgroundColor);
					position: absolute;
					overflow: hidden;
					z-index: 1000;
					top: 40%;
					width: ${mainWidth};
					height: ${mainHeight};
					max-width: ${maxWidth};
					max-height: ${maxHeight};
					border-radius: ${borderRadius};
					box-shadow: var(--boxShadow);
					left: 50%;
					transform: translate(-50%, -40%);
				}

				.show .box {
					animation: slideIn 0.25s 1 ease-out forwards;
				}

				.hide .box {
					animation: slideOut 0.25s 1 ${`ease-out`} forwards;
				}

				@keyframes slideIn {
					0% {
						opacity: 0;
						top: 80%;
					}
					100% {
						opacity: 1;
						top: 40%;
					}
				}

				@keyframes slideOut {
					0% {
						opacity: 1;
						top: 40%;
					}
					100% {
						opacity: 0;
						top: 80%;
					}
				}

				.cancelButton {
					position: absolute;
					top: 8px;
					right: 12px;
					font-size: 1.7rem;
					cursor: pointer;
					z-index: 5;
				}

				.cancelButton:hover {
					opacity: 0.5;
				}

				.content {
					padding: ${contentPadding};
				}

				@media screen and (max-width: 800px) {
					.box {
						width: ${mobileMainWidth};
						height: ${mobileMainHeight};
						max-width: ${mobileMaxWidth};
						max-height: ${mobileMaxHeight};
						border-radius: ${mobileBorderRadius};
					}
				}
			`}</style>
		</div>
	);
};

export default Lightbox;
