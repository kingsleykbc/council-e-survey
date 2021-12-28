import '../styles/globals.css';
import Layout from '../Components/Layout';
import ThemeContextProvider, { ThemeContext } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps, router }) {
	return (
		<ThemeContextProvider>
			<ThemeContext.Consumer>
				{({ theme, colors, setTheme }) => (
					<>
						{['/signup', '/login', '/admin-login'].includes(router.route) ? (
							<Component route={router.route} {...pageProps} />
						) : (
							<Layout theme={theme} setTheme={setTheme}>
								{({ authState }) => <Component route={router.route} authState={authState} {...pageProps} />}
							</Layout>
						)}

						{/* STYLE */}
						<style jsx global>{`
							:root {
								--primary: ${colors.primaryColor};
								--primaryColor: ${colors.primaryColor};
								--faint: ${colors.faintColor};
								--borderColor: ${colors.borderColor};
								--textColor: ${colors.textColor};
								--lightTextColor: ${colors.lightText};
								--backgroundColor: ${colors.backgroundColor};
								--boxShadow: 0 2px 5px ${theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'};
							}
							* {
								transition: background 0.2s linear;
							}
							body {
								background: var(--backgroundColor);
								color: var(--textColor);
							}
						`}</style>
					</>
				)}
			</ThemeContext.Consumer>
		</ThemeContextProvider>
	);
}

export default MyApp;
