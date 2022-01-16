import React, { Children } from 'react';
import { FaChevronCircleUp } from 'react-icons/fa';

const Highlighted = ({ children }) => {
	return (
		<div className='Highlighted'>
			<div className='content'>{children}</div>
			<a href='#'>
				<FaChevronCircleUp />
			</a>

			{/* STYLE */}
			<style jsx>{`
				.Highlighted {
					background: var(--faintColor);
					border-radius: 5px;
					padding: 15px 20px;
					font-size: 1.15rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
					overflow: hidden;
				}

        a {
          margin-bottom: -5px;
          opacity: 0.5;
        }
			`}</style>
		</div>
	);
};

export default Highlighted;
