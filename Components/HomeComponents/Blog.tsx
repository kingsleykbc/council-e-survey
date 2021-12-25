import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

const Blog = ({ isFeatured = false, color = 'var(--primary)', title, content, date, subTitle, id, image }) => {
	return (
		<Link href={`/blog/${id}`}>
			<a className={classnames(['Blog', { isFeatured }])}>
				<div className='title'>
					<div className='marker'></div>
					<h2>{title}</h2>
				</div>

				<div className='image'>
					<img src={image || '/images/default.png'} alt='Article Image' />
				</div>
				{isFeatured && <p className='lightText'>{subTitle}</p>}
				<div className='details'>
					Posted <b className='lightText'>{new Date(date).toLocaleDateString()}</b>{' '}
				</div>
			{/* STYLE */}
			<style jsx>{`
				.Blog {
					grid-column: span 12;
					display: flex;
					flex-direction: column;
					border-radius: 5px;
					background: var(--faint);
					cursor: pointer;
				}
				h2 {
					font-size: 1.1rem;
					font-weight: normal;
				}
				.isFeatured h2 {
					font-size: 1.3em;
					font-weight: bold;
				}

				.marker {
					margin-right: 20px;
					width: 15px;
					height: 15px;
					border-radius: 5px;
					border: 3px solid ${color};
				}

				.isFeatured .marker {
					width: 25px;
					height: 25px;
					border: 4px solid ${color};
				}

				.title {
					display: flex;
					align-items: center;
				}

				.title,
				.details {
					padding: 10px 15px;
				}

				.isFeatured .title,
				.isFeatured .details {
					padding: 20px;
				}
				p {
					padding: 20px;
					border-bottom: 2px solid var(--borderColor);
				}
				.image {
					flex-grow: 1;
				}
				img {
					width: 100%;
					height: 100%;
					max-height: 120px;
					object-fit: cover;
					object-position: center;
				}

				@media screen and (min-width: 500px) {
					.Blog {
						grid-column: span 6;
					}
					.isFeatured {
						grid-column: span 12;
						grid-row: span 3;
					}
					.isFeatured img {
						max-height: 250px;
					}
				}

				@media screen and (min-width: 700px) {
					.Blog {
						grid-column: span 4;
					}

					.isFeatured {
						grid-column: span 8;
						grid-row: span 2;
					}
				}
			`}</style>
			</a>
		</Link>
	);
};

export default Blog;
