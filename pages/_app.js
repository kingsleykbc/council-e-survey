import '../styles/globals.css';
import Layout from '../Components/Layout';

function MyApp({ Component, pageProps }) {
	return <Layout>{({ authState }) => <Component authState={authState} {...pageProps} />}</Layout>;
}

export default MyApp;
