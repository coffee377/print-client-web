import React, { Component } from 'react';
import { Button, Input, List } from 'antd';
import './style.less';

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
];

class TodoList extends Component {

	render(){
		return (
			<div>
				<div>
					<Input placeholder="请输入待办事项" className={'todo'}/>
					<Button type="primary">提交</Button>
				</div>
				<List bordered dataSource={data} renderItem={item => (<List.Item>{item}</List.Item>)}/>
			</div>
		);
	}

}

export default TodoList;
