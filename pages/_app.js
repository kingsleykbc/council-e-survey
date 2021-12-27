import '../styles/globals.css';
import Layout from '../Components/Layout';

function MyApp({ Component, pageProps, router }) {
	return <Layout>{({ authState }) => <Component route={router.route} authState={authState} {...pageProps} />}</Layout>;
}

export default MyApp;
