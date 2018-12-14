import {
	getUrl,
	OP_SESSION_ID,
	REPORT_FORM_PARAM_PREFIX,
	REPORT_FRAME_ID_PREFIX,
	REPORT_SESSION_ID_NAME,
	reportFrameIdSelector,
	serializeJSON4Form,
	trimPrefix
} from './base';


/**
 * 根据报表表单 id,报表服务地址 查询报表内容
 * @param {String} reportId 报表ID
 * @param {String} reportServer 报表服务地址
 */
function reportQuery(reportId, reportServer) {
	debugger;
	const params = serializeJSON4Form(reportId);
	const url = reportUrl(reportServer, params, REPORT_FORM_PARAM_PREFIX);
	console.log(`报表实际访问地址：${url}`);
	debugger;
	setReportSession(reportId, reportServer, params);
	const frameIdSelector = reportId ? $(REPORT_FRAME_ID_PREFIX + reportId) : $(REPORT_FRAME_ID_PREFIX);
	frameIdSelector.attr('src', url).addClass('bg-color');
}

/**
 * 获取报表 SessionID
 * @param reportId 报表ID
 * @returns {string}
 */
function getReportSession(reportId) {
	return reportFrameIdSelector(reportId).attr(REPORT_SESSION_ID_NAME);
}

/**
 * 设置报表SessionID
 * @param {String} reportId 报表ID
 * @param {String} reportServer 报表服务地址
 * @param {Object} params 请求参数
 * @returns {String}
 */
function setReportSession(reportId, reportServer, params) {
	// TODO: 2018/12/11 0011 16:07 校验查询条件发生变化才重新获取session
	debugger;
	params.op = OP_SESSION_ID;
	params = trimPrefix(params, REPORT_FORM_PARAM_PREFIX);
	$.getJSON(reportServer + '?callback=?', params, function (res) {
		debugger;
		let sessionID = res.sessionID;
		console.log(`报表SessionID：${sessionID}`);
		debugger;
		reportFrameIdSelector(reportId).attr(REPORT_SESSION_ID_NAME, sessionID);
	});
}

/**
 * 跨域请求获取 sessionID
 * @param reportId
 * @param reportServer
 * @param params
 */
function jsonp(reportId, reportServer, params) {
	debugger;
	params = trimPrefix(params);
	$.ajax({
		url: reportServer, type: 'post', data: params, dataType: 'jsonp', jsonp: 'callback', success: function (res) {
			debugger;
			console.log('跨域请求成功：' + JSON.stringify(res));
			console.log(`报表SessionID：${res.sessionID}`);
			debugger;
			reportFrameIdSelector(reportId).attr(REPORT_SESSION_ID_NAME, res.sessionID);
		}
	});

}

/**
 * 获取报表实际请求地址
 * @param {String} reportServer 报表服务地址
 * @param {Object} params 请求参数
 * @param {string} paramPrefix 请求参数前缀
 * @returns {String}
 */
const reportUrl = (reportServer, params, paramPrefix) => {
	if (reportServer) {
		return encodeURI(getUrl(reportServer, params, paramPrefix));
	} else {
		throw new Error('报表服务地址不能为空');
	}
};

export {reportQuery, getReportSession, reportUrl};
