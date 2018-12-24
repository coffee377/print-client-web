import {
	getUrl,
	OP_SESSION_ID,
	REPORT_FORM_PARAM_PREFIX,
	REPORT_SESSION_ID_NAME,
	reportFrameIdSelector,
	serializeJSON4Form,
	trimPrefix
} from './base';

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
	}
	throw new Error('报表服务地址不能为空');
};

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
	let newParams = params;
	newParams.op = OP_SESSION_ID;
	newParams = trimPrefix(newParams, REPORT_FORM_PARAM_PREFIX);
	$.getJSON(`${reportServer}?callback=?`, newParams, res => {
		debugger;
		const sessionID = res.sessionID || res.responseText || res;
		if (sessionID) {
			debugger;
			console.log(`报表SessionID：${sessionID}`);
			reportFrameIdSelector(reportId).attr(REPORT_SESSION_ID_NAME, sessionID);
		}
	});
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
 * 报表 SessionID 校验
 * @param reportId
 */
function reportSessionVerify(reportId) {
	let reportSessionID = getReportSession(reportId);
	if (!reportSessionID) {
		debugger;
		const url = `${reportFrameIdSelector(reportId).attr('src')}&op=${OP_SESSION_ID}`;
		$.get(url, res => {
			reportSessionID = res;
			if (reportSessionID && reportSessionID.match('^[0-9]*$')) {
				console.log(`报表SessionID：${reportSessionID}`);
				reportFrameIdSelector(reportId).attr(REPORT_SESSION_ID_NAME, reportSessionID);
			} else {
				throw new Error('获取报表sessionID失败，报表扩展功能将无法使用，请联系相关技术人员');
			}
		});
	}
}

/**
 * 根据报表表单 id,报表服务地址 查询报表内容
 * @param {String} reportId 报表ID
 * @param {String} reportServer 报表服务地址
 */
function reportQuery(reportId, reportServer) {
	debugger;
	const params = serializeJSON4Form(reportId);
	debugger;
	const url = reportUrl(reportServer, params, REPORT_FORM_PARAM_PREFIX);
	console.log(`报表实际访问地址：${url}`);
	debugger;
	setReportSession(reportId, reportServer, params);
	reportFrameIdSelector(reportId)
		.attr('src', url)
		.addClass('bg-color');
	reportSessionVerify(reportId);
}

export { reportQuery, getReportSession, reportUrl };
