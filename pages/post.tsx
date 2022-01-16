import React from 'react';
import PostQuestion from '../Components/PostQuestion';
import SlideUp from '../Components/UIComponents/Animated/SlideUp';
import Section from '../Components/UIComponents/Section';

const post = () => {
	return (
		<Section makeCard maxWidth='600px' bottomPadding='30px'>
			<SlideUp>
				<PostQuestion />
			</SlideUp>
		</Section>
	);
};

export default post;
