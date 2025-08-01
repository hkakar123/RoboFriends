import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'; 

import { combineReducers } from 'redux';
import Scroll from '../components/Scroll';
import './App.css';
import Header from '../components/Header.js';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	onRequestRobots: () => dispatch(requestRobots())
}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}


	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
			const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
			return isPending ?
			<h1>Loading...</h1> : 
			 (
		<div className='tc'>
		<Header />
		<SearchBox searchChange={onSearchChange}/>
		<Scroll>
		<CardList robot={filteredRobots}/>
	</Scroll>
	</div>
		);
}
}


export default connect(mapStateToProps, mapDispatchToProps)(App); 