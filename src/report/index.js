import './style.less';

const REPORT_FRAME_ID = '#reportFrame';
const REPORT_FORM_ID = '#reportForm';

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
 * 获取报表服务地址 API 接口
 * @returns {string}
 */
const getReportServer = () => {
	// TODO: 2018/11/5 0005 11:13 API获取服务地址
	// $.get()
	return 'http://192.168.88.235:8083/WebReport/ReportServer';
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
		/*如果报表服务地址为空，则根据API接口进行获取*/
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
 */
const queryReport = (reportId) => {
	debugger;
	const _r = reportId ? $(REPORT_FRAME_ID + reportId) : $(REPORT_FRAME_ID);
	const reportServer = getReportServer();
	const params = serializeJSON(reportId);
	const url = getReportUrl(params, reportServer);
	console.log(url);
	_r.attr('src', url).addClass('bg-color');
};

/**
 * js 动态设置指定表单的报表路径
 * @param reportId 报表ID
 * @param reportlet 报表路径
 */
const switchReport = (reportlet, reportId) => {
	debugger;
	const _r = reportId ? $(REPORT_FORM_ID + reportId) : $(REPORT_FORM_ID);
	_r.find('input[name=\'reportlet\']').val(reportlet);
};

// TODO: 2018/11/6 0006 9:26 如何暴露统一接口????
window.reportQuery = function (reportId) {
	debugger;
	queryReport(reportId);
};

window.reportSwitch = function (reportlet, reportId) {
	debugger;
	switchReport(reportlet, reportId);
};

