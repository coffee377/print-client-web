import '../../public/html/app.html';
import './style.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

class App extends Component {

	render(){
		return (
			<div>
				<TodoList/>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
