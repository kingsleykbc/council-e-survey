import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import Link from 'next/link';

const Logo = ({ showText = true, iconSize = '2rem', margin = '0', isLink = false, showResponsiveText = true }) => {
	const item = (
		<div className='Logo'>
			<div className='logoIcon'>
				<FaGasPump style={{ fill: 'var(--primaryColor)' }} />
			</div>

			{showText && <h2>Shangri-La E-survey</h2>}

			{/* STYLE */}
			<style jsx>{`
				.Logo {
					display: inline-flex;
					align-items: center;
					margin: ${margin};
				}

				h2 {
					font-size: 1.1rem;
				}

				.logoIcon {
					font-size: ${iconSize};
					margin-right: ${showText ? '15px' : ''};
					margin-bottom: -7px;
				}
			`}</style>
		</div>
	);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (isLink)
		return (
			<Link href='/'>
				<a>{item}</a>
			</Link>
		);
	return item;
};

export default Logo;
