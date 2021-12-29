import Home from '../Components/Home';
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
