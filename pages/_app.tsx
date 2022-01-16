import '../styles/globals.css';
import Layout from '../Components/Layout';
import ThemeContextProvider, { ThemeContext } from '../contexts/ThemeContext';
import SearchContextProvider from '../contexts/SearchContext';
import Router from 'next/router';
import NProgress from 'nprogress';

/**
 * SETUP N-PROGRESS LOADER
 */
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
	return (
		<SearchContextProvider>
			<ThemeContextProvider>
				<ThemeContext.Consumer>
					{({ theme, colors, setTheme }) => (
						<>
							{/* DON'T SHOW LAYOUT FOR THE AUTHENTICATION PAGES */}
							{['/signup', '/login', '/admin-login'].includes(router.route) ? (
								<Component route={router.route} {...pageProps} />
							) : (
								<Layout route={router.route} theme={theme} setTheme={setTheme}>
									{({ authState }) => <Component route={router.route} authState={authState} {...pageProps} />}
								</Layout>
							)}

							{/* STYLE */}
							<style jsx global>{`
								:root {
									--primary: ${colors.primaryColor};
									--primaryColor: ${colors.primaryColor};
									--faint: ${colors.faintColor};
									--faintColor: ${colors.faintColor};
									--faintestColor: ${colors.faintestColor};
									--borderColor: ${colors.borderColor};
									--textColor: ${colors.textColor};
									--lightTextColor: ${colors.lightText};
									--backgroundColor: ${colors.backgroundColor};
									--successColor: #29e694;
									--dangerColor: #f73464;
									--boxShadow: 0 2px 5px ${theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'};
									--border: 1px solid ${colors.borderColor};
								}
								
								#nprogress .bar {
									background: var(--primaryColor) !important;
									border-color: var(--primaryColor) !important;
								}

								body {
									background: var(--faintestColor);
									color: var(--textColor);
								}
							`}</style>
						</>
					)}
				</ThemeContext.Consumer>
			</ThemeContextProvider>
		</SearchContextProvider>
	);
}

export default MyApp;
