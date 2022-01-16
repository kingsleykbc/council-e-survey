import React, { useState } from 'react';
import { Option } from '../../utils/types';
import EmptySet from '../UIComponents/EmptySet';
import { MdDelete as IcDelete } from 'react-icons/md';

const OptionsForm = ({ onChange, value }) => {
	const [options, setOptions] = useState<Array<{ option: string }>>(value);

	/**
	 * HANDLE ADD
	 */
	const onAdd = e => {
		e.preventDefault();
		const option = e.target[0].value.trim();
		if (!option) return;
		const newOptions = [...options, { option }];
		setOptions(newOptions);
		onChange(newOptions);
		e.target[0].value = '';
	};

	/**
	 * HANDLE REMOVE
	 */
	const onRemove = index => {
		const newOptions = options.filter((item, ind) => ind !== index);
		setOptions(newOptions);
		onChange(newOptions);
	};

	const addedOptions = options.map((o: Option, index) => <AddedOption onRemove={() => onRemove(index)} key={`${o}_${index}`} {...o} />);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='OptionsForm'>
			<h4 className='lightText'>Options</h4>
			<div className='addedOption'>{addedOptions.length ? addedOptions : <EmptySet margin='0'>No Options added</EmptySet>}</div>

			{/* ADD BUTTON */}
			<form onSubmit={onAdd}>
				<input type='text' placeholder={`Option ${options.length + 1}`} />
				<button>Add</button>
			</form>

			{/* STYLE */}
			<style jsx>{`
				form {
					display: flex;
					gap: 12px;
				}

				.addedOption {
					margin: 30px 0;
				}
			`}</style>
		</div>
	);
};

export default OptionsForm;

const AddedOption = ({ option, onRemove }) => (
	<div className='option'>
		<div>{option} </div>

		<div className='deleteIcon' onClick={onRemove}>
			<IcDelete color='var(--dangerColor)' />
		</div>

		{/* STYLE */}
		<style jsx>{`
			.option {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-shadow: var(--boxShadow);
				padding: 10px;
				border-radius: 5px;
				margin: 10px 0;
				background: var(--backgroundColor);
				padding-left: 20px;
			}
			.deleteIcon {
				width: 40px;
				height: 40px;
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: var(--faintColor);
				font-size: 1.2rem;
				cursor: pointer;
			}
		`}</style>
	</div>
);
