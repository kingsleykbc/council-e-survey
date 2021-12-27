import Home from '../Components/Home';
import Section from '../Components/UIComponents/Section';

export default function index({ authState, route }) {
	return (
		<Section>
			<Home authState={authState} />
		</Section>
	);
}
