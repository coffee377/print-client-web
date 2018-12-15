import '../../public/html/app.html';
import './style.less';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

	render() {
		return (
			<p>render2</p>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
