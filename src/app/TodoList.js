import React, { Component } from 'react';
import { Button, Col, Input, List, message, Row } from 'antd';
import store from '../redux/store';
import './style.less';

const success = () => {
	message.success('打印完成8', 3);
};

const printing = () => {
	message.loading('正在打印8', 3);
};

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = store.getState();
		this.updateInputValue = this.updateInputValue.bind(this);
		this.addItem = this.addItem.bind(this);
		this.onPressEnter = this.onPressEnter.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
		store.subscribe(this.handleStoreChange);
	}

	updateInputValue = e => {
		store.dispatch({ type: 'CHANGE_TODO', value: e.target.value });
	};

	addItem = () => {
		store.dispatch({ type: 'ADD_TODO', value: store.getState().inputValue });
	};

	onPressEnter = () => {
		this.addItem();
	};

	handleStoreChange() {
		this.setState(store.getState());
	}

	render() {
		return (
			<div>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col span={18}>
						<Input
							placeholder="请输入待办事项"
							value={this.state.inputValue}
							onPressEnter={this.onPressEnter}
							onChange={this.updateInputValue}
							className="todo"
						/>
					</Col>
					<Col span={6}>
						<Button htmlType="button" onClick={this.addItem} type="primary" icon="add">
							添加
						</Button>
						<Button onClick={success}>打印完成</Button>
						<Button type="info" onClick={printing}>
							打印
						</Button>
					</Col>
				</Row>
				<Row>
					<List
						bordered
						dataSource={this.state.list}
						renderItem={item => <List.Item className="list-item">{item}</List.Item>}
					/>
				</Row>
			</div>
		);
	}
}

export default TodoList;
