import React, { FC, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart: FC<any> = ({ liveData: { options: opts } }) => {
	const labels = Object.keys(opts).map(key => opts[key].value);

	useEffect(() => {
		document.getElementById('resultView').scrollIntoView({ behavior: 'smooth' });
	}, []);

	const options: ChartOptions = {
		indexAxis: 'y' as const,
		elements: { bar: { borderWidth: 2 } },
		responsive: true,
		plugins: {
			title: { display: true, text: 'Participants Responses' }
		}
	};

	const data = {
		labels,
		datasets: [
			{
				label: 'Responses',
				data: Object.keys(opts).map(key => opts[key].noResponses),
				borderColor: '#5e87ff',
				backgroundColor: 'rgba(92, 133, 255, 0.663)'
			}
		]
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			<h3 className='lightText'>Chart</h3>

			<div className='whiteboard'>
				<Bar options={options} data={data} />
			</div>

			{/* STYLE */}
			<style jsx>{`
				h3 {
					margin: 25px 0 15px 0;
				}

				.whiteboard {
					padding-top: 10px;
				}
			`}</style>
		</div>
	);
};

export default Chart;
