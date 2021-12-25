import React from 'react';
import Link from 'next/link';

const Banner = ({ username }) => {
	return (
		<div className='Banner'>
			<p>Welcome {username}</p>
			<Link href='/post'>
				<a className='button'>Create Post</a>
			</Link>

			{/* STYLE */}
			<style jsx>{`
				.Banner {
					padding: 0px 10px;
					background: var(--primary);
					font-weight: bold;
					color: #fff;
					border-radius: 5px;
					margin-bottom: 15px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}

				p {
					margin: 10px;
					text-align: center;
				}

				.button {
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
					margin: 10px;
					background: #fff;
					color: var(--primary);
				}

				@media screen and (min-width: 550px) {
					.Banner {
						flex-direction: row;
						justify-content: space-between;
					}
				}
			`}</style>
		</div>
	);
};

export default Banner;
