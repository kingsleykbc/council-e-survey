import React from 'react';
import Link from 'next/link';
import SlideUp from '../UIComponents/Animated/SlideUp';

const AdminCreateBanner = () => {
	return (
		<SlideUp>
			<div className='AdminCreateBanner'>
				<div>Welcome Admin</div>

				<div className='options'>
					<Link href='/apidocs'>
						<a>
							<button>API</button>
						</a>
					</Link>
					<Link href='/post'>
						<a className='button hasShadow'>Add Question</a>
					</Link>
				</div>

				{/* STYLE */}
				<style jsx>{`
					.AdminCreateBanner {
						border-radius: 5px;
						margin-bottom: 20px;
						background: var(--primary);
						padding: 10px 10px 10px 20px;
						font-weight: bold;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 10px;
					}

					.button {
						background: #fff;
						border: 2px solid #fff;
						color: var(--primary);
					}

					button {
						border: 2px solid rgba(255, 255, 255, 0.5);
						box-shadow: none;
					}

					.options {
						display: flex;
						align-items: center;
						gap: 10px;
					}

					@media screen and (max-width: 700px) {
						.AdminCreateBanner {
							flex-direction: column;
							padding: 15px;
						}
						.options {
							width: 100%;
							border-top: 1px solid rgba(0, 0, 0, 0.219);
							justify-content: center;
							padding-top: 15px;
						}
					}

					@media screen and (max-width: 500px) {
						.options {
							flex-direction: column;
							align-items: stretch;
							text-align: center;
						}
					}
				`}</style>
			</div>
		</SlideUp>
	);
};

export default AdminCreateBanner;
