import { message } from 'antd';

const defaultState = {
	inputValue: '',
	list: [
		// 'Racing car sprays burning fuel into crowd.888'
		// 'Japanese princess to wed commoner.',
		// 'Australian walks 100km after outback crash.',
		// 'Man charged over missing wedding girl.',
		// 'Los Angeles battles huge wildfires.',
	]
};

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function reducer(state = defaultState, action) {
	if (action.type === 'CHANGE_TODO') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.inputValue = action.value;
		return newState;
	}
	if (action.type === 'ADD_TODO') {
		if (action.value) {
			const newState = JSON.parse(JSON.stringify(state));
			newState.list.push(action.value);
			newState.inputValue = '';
			return newState;
		}
		message.warn('请输入待办事项', 3);
	}
	return state;
}

export default reducer;
