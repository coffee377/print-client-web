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

ReactDOM.render(<App />, document.getElementById('root'));

const changeSets = require('diff-json');

let oldObj = {
	id: '1',
	name: '张三'
};
oldObj = null;
let newObj = null;
newObj = {
	id: '1',
	name: '张三',
	age: 30
};
const diffs = changeSets.diff(oldObj, newObj);
for (const [index, value] of diffs.entries()) {
	console.log(index, value);
}
console.log(JSON.stringify(diffs));
