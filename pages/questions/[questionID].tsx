import React from 'react';
import SlideUp from '../../Components/UIComponents/Animated/SlideUp';
import Section from '../../Components/UIComponents/Section';
import ViewQuestion from '../../Components/ViewQuestion';

const questionID = ({ authState }) => {
	return (
		<SlideUp>
			<Section maxWidth='800px'>
				<ViewQuestion authState={authState} />
			</Section>
		</SlideUp>
	);
};

export default questionID;
