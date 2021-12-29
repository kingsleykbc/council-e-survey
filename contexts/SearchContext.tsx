import React, { Component, createContext, useContext } from 'react';
import themes from '../config/themes';

export const SearchContext = createContext({ keyword: '', setKeyword: null });

export const useSearch = () => {
	return useContext(SearchContext);
};

class SearchContextProvider extends Component {
	setKeyword = keyword => this.setState({ keyword });
	state = { keyword: '', setKeyword: this.setKeyword };

	// =======================================================================
	//  RENDER
	// =======================================================================
	render() {
		const { children } = this.props;
		return <SearchContext.Provider value={this.state}>{children}</SearchContext.Provider>;
	}
}

export default SearchContextProvider;
