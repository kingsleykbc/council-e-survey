import React from 'react';
import QrReader from 'react-qr-reader';

import dynamic from 'next/dynamic';

const QrReader: any = dynamic(() => import('react-qr-reader'), {
	ssr: false
});

const QRScan = ({ onScan }) => {
	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div>
			<QrReader
				delay={300}
				onError={() => {}}
				onScan={data => {
					if (data) onScan(data);
				}}
			/>

			{/* STYLE */}
			<style jsx>{`
				div {
					margin-top: 15px;
					margin: 15px auto;
					border-radius: 5px;
					overflow: hidden;
					box-shadow: var(--boxShadow);
				}
			`}</style>
		</div>
	);
};

export default QRScan;
