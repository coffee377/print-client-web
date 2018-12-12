/**
 * 报表 SESSION_ID 名称
 * @type {string}
 */
const REPORT_SESSION_ID_NAME = 'data-report-session';

/**
 * 获取报表session的命令
 * @type {string}
 */
const OP_SESSION_ID = 'getSessionID';

/**
 * 报表Form ID前缀
 * @type {string}
 */
const REPORT_FORM_ID_PREFIX = '#reportForm';

/**
 * 报表Form 参数前缀前缀
 * @type {string}
 */
const REPORT_FORM_PARAM_PREFIX = 'params.';

/**
 * 报表Frame ID前缀
 * @type {string}
 */
const REPORT_FRAME_ID_PREFIX = '#reportFrame';

/**
 * 获取Get请求详细地址
 * @param {String} url 请求地址
 * @param {Object} params 请求参数对象
 * @param {string} paramPrefix 参数前缀
 * @returns {String}
 */
function getUrl(url, params, paramPrefix) {
	let paramStr = '';
	debugger;
	params = trimPrefix(params, paramPrefix);
	if (params) {
		Object.keys(params).map((key, index, array) => {
			let value = params[key] ? params[key] : '';
			if (index !== array.length - 1) {
				paramStr += `${key}=${value}&`;
			} else {
				paramStr += `${key}=${value}`;
			}
		});
	}
	return paramStr !== '' ? `${url}?${paramStr}` : url;
}

/**
 * 参数去前缀
 * @param params  {Object} params 请求参数对象
 * @param paramPrefix 参数名前缀
 */
function trimPrefix(params, paramPrefix) {
	debugger;
	if (params && paramPrefix) {
		let map = {};
		Object.keys(params).map((key) => {
			let value = params[key] ? params[key] : '';
			if (paramPrefix && key.match('^' + paramPrefix)) {
				key = key.substring(paramPrefix.length);
			}
			map[key] = value;
		});
		return map;
	}
	return params;
}

/**
 * 表单数据序列化
 * @param selector jQuery 选择器
 * @returns {*|jQuery}
 */
function getFormData(selector) {
	debugger;
	const data = $(selector).serializeJSON({checkboxUncheckedValue: 'false', parseBooleans: true});
	console.log(JSON.stringify(data));
	return data;
}

/**
 * 根据报表表单序列化为查询参数
 * @param {String} reportId 报表ID
 * @returns {Object} map
 */
function serializeJSON4Form(reportId) {
	const formIdSelector = reportId ? $(REPORT_FORM_ID_PREFIX + reportId) : $(REPORT_FORM_ID_PREFIX);
	return getFormData(formIdSelector);
}

/**
 * 报表表单下指定选择器值得修改
 * @param selector Query 选择器
 * @param value 新值
 * @param idSelector 指定ID选择器下（可选）
 */
function changeValue(selector, value, idSelector) {
	debugger;
	if (idSelector) {
		idSelector.find(selector).val(value);
	} else {
		$(selector).val(value);
	}
}

/**
 * 报表form jQuery选择器
 * @param reportId
 * @returns {*|jQuery|HTMLElement}
 */
function reportFormIdSelector(reportId) {
	return reportId ? $(REPORT_FORM_ID_PREFIX + reportId) : $(REPORT_FORM_ID_PREFIX);
}

/**
 * 报表iframe jQuery选择器
 * @param reportId
 * @returns {*|jQuery|HTMLElement}
 */
function reportFrameIdSelector(reportId) {
	return reportId ? $(REPORT_FRAME_ID_PREFIX + reportId) : $(REPORT_FRAME_ID_PREFIX);
}

export {
	REPORT_SESSION_ID_NAME, REPORT_FORM_ID_PREFIX, REPORT_FORM_PARAM_PREFIX,
	REPORT_FRAME_ID_PREFIX, OP_SESSION_ID,
	getUrl, serializeJSON4Form, changeValue, reportFormIdSelector, reportFrameIdSelector, trimPrefix
};
