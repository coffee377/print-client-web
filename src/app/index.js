import '../../public/html/app.html';
import './style.less';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

	render() {
		return (
			<p>render</p>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
// ReactDOM.render(<div>React Test</div>, document.body);
// document.write('Hello Webpack');
