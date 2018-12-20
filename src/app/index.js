import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import '../../public/html/app.html';
import './style.less';

const App = () => (
	<div>
		<TodoList />
	</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
