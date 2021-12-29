import React from 'react';
import Link from 'next/link';
import SlideUp from '../UIComponents/Animated/SlideUp';

const AdminCreateBanner = () => {
	return (
		<SlideUp>
			<div className='AdminCreateBanner'>
				<div>Welcome Admin</div>
				<Link href='/post'>
					<a className='button hasShadow'>Add Question</a>
				</Link>

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
					}

					.button {
						background: #fff;
						color: var(--primary);
					}
				`}</style>
			</div>
		</SlideUp>
	);
};

export default AdminCreateBanner;
