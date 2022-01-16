import React from 'react';
import Section from '../../Components/UIComponents/Section';
import EditQuestion from '../../Components/EditQuestion';

const post = () => {
	return (
		<Section makeCard maxWidth='600px' bottomPadding='30px'>
			<EditQuestion />
		</Section>
	);
};

export default post;
