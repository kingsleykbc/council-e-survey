import React from 'react';
import { RiGovernmentLine  as LogoIcon} from 'react-icons/ri';
import Link from 'next/link';

const Logo = ({ showText = true, iconSize = '2rem', margin = '0', isLink = false, showResponsiveText = true }) => {
	const item = (
		<div className='Logo'>
			<div className='logoIcon'>
				<LogoIcon style={{ fill: 'var(--primaryColor)' }} />
			</div>

			{showText && <h2>Council E-survey</h2>}

			{/* STYLE */}
			<style jsx>{`
				.Logo {
					display: inline-flex;
					align-items: center;
					margin: ${margin};
				}

				h2 {
					font-size: 1rem;
					margin-left: 15px;
				}

				.logoIcon {
					font-size: ${iconSize};
					margin-bottom: -7px;
				}

				@media screen and (max-width: 700px){
					h2 {
						display: ${showResponsiveText ? "block" : "none"};
					}
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
