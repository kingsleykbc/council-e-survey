import React, { PureComponent } from 'react';
import Lightbox from './Lightbox';

class AreYouSureBox extends PureComponent {
	message = 'You are about to perform an action.';
	onYes;
	yesLabel = 'Yes';
	title = 'Are you sure?';

	state = { show: false };

	/**
	 * TOGGLE
	 */
	toggle = () => this.setState({ show: !this.state.show });

	/**
	 * ADD STATUS
	 */
	openAreYouSureBox = ({ message, onYes, yesLabel = 'Yes', title = 'Are you sure?' }) => {
		this.message = message;
		this.onYes = onYes;
		this.yesLabel = yesLabel;
		this.title = title;
		this.toggle();
	};

	/**
	 * HANDLE YES CLICK
	 */
	handleYesClick = () => {
		this.toggle();
		if (this.onYes) this.onYes();
	};

	// =======================================================================
	//  RENDER
	// =======================================================================
	render() {
		const { show } = this.state;

		// =======================================================================
		//  UI
		// =======================================================================
		return (
			<Lightbox show={show} toggle={this.toggle} showCancelButton={false} contentPadding='0' width='400px' autoHeight>
				<h3 className='lightText'>{this.title}</h3>
				<div className='message'>
					<p> {this.message} </p>
				</div>

				<div className='options'>
					<div className='option' onClick={this.toggle}>
						Cancel
					</div>

					<div className='option' onClick={this.handleYesClick}>
						{this.yesLabel}
					</div>
				</div>

				{/* STYLE */}
				<style jsx>{`
					h3 {
						padding: 18px;
						text-align: center;
						font-size: 1.1em;
					}
					.message {
						padding: 20px;
						padding-bottom: 30px;
						padding-top: 0;
						text-align: center;
					}

					.options {
						display: flex;
						align-items: center;
					}

					.option {
						flex-grow: 1;
						text-align: center;
						padding: 15px;
						cursor: pointer;
					}

					.options {
						border-top: var(--border);
					}

					.option:hover {
						background: var(--faintColor);
					}

					.option:last-child {
						font-weight: bold;
						border-left: var(--border);
						color: var(--primaryColor);
					}
				`}</style>
			</Lightbox>
		);
	}
}

export default AreYouSureBox;
