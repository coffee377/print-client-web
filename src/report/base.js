/**
 * 获取报表session的命令
 * @type {string}
 */
const OP_SESSION_ID = 'getSessionID';

/**
 * 报表服务器版本
 * @type {string}
 */
let reportVersion = '9.0';

/**
 * 设置报表版本
 * @param version
 */
function setReportVersion(version) {
	reportVersion = version;
}

/**
 * 是否显示打印提示
 * @type {boolean}
 */
let showPrintTip = false;

function setShowPrintTip(showTip) {
	showPrintTip = showTip;
}

/**
 * 全局报表服务地址
 * @type {string}
 */
let reportServerUrl;

function setReportServer(reportServer) {
	reportServerUrl = reportServer;
}

/**
 * 报表 SESSION_ID 名称
 * @type {string}
 */
let reportSessionIdName = 'data-report-session';

function setSessionIdName(sessionIdName) {
	reportSessionIdName = sessionIdName;
}

/**
 * 报表Form ID前缀
 * @type {string}
 */
let reportFormIdPrefix = '#reportForm';

function setFormIdPrefix(formIdPrefix) {
	reportFormIdPrefix = formIdPrefix;
}

/**
 * 报表Form 参数前缀前缀
 * @type {string}
 */
let reportFormParamPrefix = '';

function setFormParamPrefix(formParamPrefix) {
	reportFormParamPrefix = formParamPrefix;
}

/**
 * 报表Frame ID前缀
 * @type {string}
 */
let reportFrameIdPrefix = '#reportFrame';

function setFrameIdPrefix(frameIdPrefix) {
	reportFrameIdPrefix = frameIdPrefix;
}

/**
 * 参数去前缀
 * @param params  {Object} params 请求参数对象
 * @param paramPrefix 参数名前缀
 */
function trimPrefix(params, paramPrefix) {
	debugger;
	if (params && paramPrefix) {
		const map = {};
		Object.keys(params).map(key => {
			const value = params[key] ? params[key] : '';
			let trimKey = key;
			if (paramPrefix && key.match(`^${paramPrefix}`)) {
				trimKey = key.substring(paramPrefix.length);
			}
			map[trimKey] = value;
		});
		return map;
	}
	return params;
}

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
	const newParams = trimPrefix(params, paramPrefix);
	if (params) {
		Object.keys(newParams).map((key, index, array) => {
			const value = newParams[key] ? newParams[key] : '';
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
 * 表单数据序列化
 * @param selector jQuery 选择器
 * @returns {*|jQuery}
 */
function getFormData(selector) {
	debugger;
	const data = $(selector).serializeJSON({ checkboxUncheckedValue: 'false', parseBooleans: true });
	console.log(JSON.stringify(data));
	return data;
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
	return reportId ? $(reportFormIdPrefix + reportId) : $(reportFormIdPrefix);
}

/**
 * 报表iframe jQuery选择器
 * @param reportId
 * @returns {*|jQuery|HTMLElement}
 */
function reportFrameIdSelector(reportId) {
	return reportId ? $(reportFrameIdPrefix + reportId) : $(reportFrameIdPrefix);
}

/**
 * 根据报表表单序列化为查询参数
 * @param {String} reportId 报表ID
 * @returns {Object} map
 */
function serializeJSON4Form(reportId) {
	return getFormData(reportFormIdSelector(reportId));
}

export {
	showPrintTip,
	reportServerUrl,
	OP_SESSION_ID,
	reportSessionIdName,
	reportFormIdPrefix,
	reportFormParamPrefix,
	reportFrameIdPrefix,
	reportVersion,
	setShowPrintTip,
	setReportServer,
	setReportVersion,
	setSessionIdName,
	setFormIdPrefix,
	setFormParamPrefix,
	setFrameIdPrefix,
	getUrl,
	serializeJSON4Form,
	changeValue,
	reportFormIdSelector,
	reportFrameIdSelector,
	trimPrefix
};
