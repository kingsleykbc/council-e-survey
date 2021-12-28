import React, { Component, createContext, useContext } from 'react';
import themes from '../config/themes';

const initialState = { theme: 'light', colors: themes.light, setTheme: null };

export const ThemeContext = createContext(initialState);

export const useTheme = () => {
	return useContext(ThemeContext);
};


class ThemeContextProvider extends Component {
	setTheme = theme => {
		this.setState({ theme, colors: theme === 'light' ? themes.light : themes.dark });
		localStorage.setItem('theme', theme);
	};

	state = { ...initialState, setTheme: this.setTheme };

	componentDidMount(): void {
		this.setState({
			theme: localStorage.getItem('theme'),
			colors: localStorage.getItem('theme') === 'light' ? themes.light : themes.dark,
			setTheme: this.setTheme
		});
	}

	// =======================================================================
	//  RENDER
	// =======================================================================
	render() {
		const { children } = this.props;
		return <ThemeContext.Provider value={this.state}>{children}</ThemeContext.Provider>;
	}
}

export default ThemeContextProvider;
