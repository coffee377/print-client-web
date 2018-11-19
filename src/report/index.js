import './style.less';

const REPORT_FRAME_ID = '#reportFrame';
const REPORT_FORM_ID = '#reportForm';
let _reportServer = null;

/**
 * 获取Get请求详细地址
 * @param url 请求地址
 * @param params 请求参数对象
 * @returns {string}
 */
const getUrl = (url, params) => {
	let paramStr = '';
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
};

/**
 * 获取报表服务地址
 * @returns {string}
 */
const getReportServer = () => {
	let server;
	debugger;
	if (_reportServer) {
		server = _reportServer;
	} else {
		throw new Error('请设置报表服务地址');
	}
	return server;
};

/**
 * 获取报表实际请求地址
 * @param params 请求参数
 * @param url 报表服务地址（可选）
 * @returns {string}
 */
const getReportUrl = (params, url) => {
	if (url) {
		return encodeURI(getUrl(url, params));
	} else {
		/*如果报表服务地址为空，则根据用户设置进行获取*/
		return encodeURI(getUrl(getReportServer(), params));
	}
};

/**
 * 表单数据序列化
 * @param selector jQuery 选择器
 * @returns {*|jQuery}
 */
let getFormData = (selector) => {
	debugger;
	const data = $(selector).serializeJSON({checkboxUncheckedValue: 'false', parseBooleans: true});
	console.log(JSON.stringify(data));
	return data;
};

/**
 * 根据报表表单序列化为查询参数
 * @param reportId 报表ID
 * @returns map
 */
const serializeJSON = (reportId) => {
	const _r = reportId ? $(REPORT_FORM_ID + reportId) : $(REPORT_FORM_ID);
	return getFormData(_r);
};

/**
 * 根据报表表单 id 查询报表内容
 * @param reportId 报表ID
 * @param reportServer 报表服务地址（可选）
 */
const queryReport = (reportId, reportServer) => {
	debugger;
	const _r = reportId ? $(REPORT_FRAME_ID + reportId) : $(REPORT_FRAME_ID);
	const params = serializeJSON(reportId);
	const url = getReportUrl(params, reportServer);
	console.log(url);
	_r.attr('src', url).addClass('bg-color');
};

/**
 * js 动态设置指定表单的报表路径
 * @param reportlet 待切换报表路径
 * @param reportId 报表ID
 */
const switchReport = (reportlet, reportId) => {
	debugger;
	const _r = reportId ? $(REPORT_FORM_ID + reportId) : $(REPORT_FORM_ID);
	_r.find('input[name=\'reportlet\']').val(reportlet);
};

if (window.report == null) {
	window.report = {};
}
report = {
	/**
	 * 设置报表服务器地址（优先级最高）
	 * @param reportServer
	 */
	setReportServer: function (reportServer) {
		debugger;
		_reportServer = reportServer;
	},
	/**
	 * 查询报表
	 * @param reportId 报表ID
	 * @param reportServer 报表服务地址
	 * @see #queryReport
	 */
	query: function (reportId, reportServer) {
		debugger;
		queryReport(reportId, reportServer);
	},
	/**
	 *
	 * @param reportlet
	 * @param reportId
	 * @see switchReport
	 */
	switch: function (reportlet, reportId) {
		debugger;
		switchReport(reportlet, reportId);
	}
};

/**
 *
 * @param reportId
 * @param reportServer
 * @deprecated
 */
window.reportQuery = function (reportId, reportServer) {
	debugger;
	queryReport(reportId, reportServer);
};
/**
 *
 * @param reportlet
 * @param reportId
 * @deprecated
 */
window.reportSwitch = function (reportlet, reportId) {
	debugger;
	switchReport(reportlet, reportId);
};
