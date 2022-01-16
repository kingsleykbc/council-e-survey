import React from 'react';

const Models = () => {
	return (
		<div>
			<div className='anchor' id='models' />[ Go to{' '}
			<a className='top' href='#methods'>
				Methods
			</a>{' '}
			]{/* MODELS */}
			<div className='model'>
				<h3>
					<code>IdText</code> - IdText
				</h3>

				<div className='field-items'>
					<div className='param'>id (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#string'>String</a>
						</span>
					</div>

					<div className='param'>Text (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#string'>String</a>
						</span>
					</div>
				</div>
			</div>
			<div className='model'>
				<h3>
					<a>
						<code>Options</code> - Options
					</a>
				</h3>

				<div className='field-items'>
					<div className='param'>Question (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#string'>String</a>
						</span>
						Question ID
					</div>
					<div className='param'>Options (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#IdText'>array[IdText]</a>
						</span>
					</div>
				</div>
			</div>
			<div className='model'>
				<h3>
					<a>
						<code>Questions</code> - Questions
					</a>
				</h3>

				<div className='field-items'>
					<div className='param'>consulations (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#Questions_consulations'>Questions_consulations</a>
						</span>
					</div>
				</div>
			</div>
			<div className='model'>
				<h3>
					<a>
						<code>Questions_consulations</code>
					</a>
				</h3>

				<div className='field-items'>
					<div className='param'>Questions (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#IdText'>array[IdText]</a>
						</span>
						Question in the DB
					</div>
				</div>
			</div>
			<div className='model'>
				<h3>
					<a>
						<code>Responses</code> - Responses
					</a>
				</h3>

				<div className='field-items'>
					<div className='param'>Question (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#string'>String</a>
						</span>
						Question ID
					</div>
					<div className='param'>Answers (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#Responses_Answers'>array[Responses_Answers]</a>
						</span>
					</div>

				</div>
			</div>
			<div className='model'>
				<h3>
					<a>
						<code>Responses_Answers</code>
					</a>
				</h3>
				<div className='marg lightText'>Options with their counts</div>
				<div className='field-items'>
					<div className='param'>id (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#string'>String</a>
						</span>
					</div>
					<div className='param'>count (optional)</div>
					<div className='param-desc'>
						<span className='param-type'>
							<a href='#string'>String</a>
						</span>
					</div>
				</div>
			</div>
			{/* STYLE */}
			<style jsx>{`
				.top {
					color: var(--primaryColor);
					font-weight: bold;
				}

				.top:hover {
					text-decoration: underline;
				}

				.field-items {
					margin-left: 20px;
				}
				.param {
					margin-top: 15px;
				}
				.model {
					margin-top: 25px;
					border-bottom: var(--border);
					padding-bottom: 20px;
				}
				.param-type a {
					color: var(--lightTextColor);
					display: inline-block;
					padding: 10px 0;
					margin-right: 15px;
				}
				.model h3 {
					background: var(--faintColor);
					padding: 10px 15px;
					border-radius: 5px;
				}
			`}</style>
		</div>
	);
};

export default Models;
