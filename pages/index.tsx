import Home from '../Components/QuestionsList';
import Section from '../Components/UIComponents/Section';

/**
 * HOME PAGE
 */
export default function index({ authState }) {
	return (
		<Section maxWidth='800px'>
			<Home authState={authState} />
		</Section>
	);
}
