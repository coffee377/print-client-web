import '../public/index.html';
import './common';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './app/TodoList';
import './app/style.less';

const App = () => (
	<div>
		<TodoList />
	</div>
);
console.log('hhhhhiiii');
ReactDOM.render(<App />, document.getElementById('root'));
