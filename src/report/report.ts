/**
 * 报表JS接口
 */
interface IReport {

    /**
     * 报表查询
     * @param reportId 报表ID
     * @param reportServer 报表服务
     */
    query(reportId: string, reportServer?: string): void;

    /**
     * 报表切换
     * @param reportId 报表ID
     * @param reportlet 报表名称
     */
    switch(reportId: string, reportlet: string): void;

    /**
     * 报表打印
     * @param reportId 报表ID
     * @param showDialog 是否对话框
     */
    print(reportId: string, showDialog?: boolean): void;

    /**
     * 打印预览
     * @param reportId 报表ID
     */
    preview(reportId: string): void;

}

/**
 * 报表配置
 */
interface ReportConfig {
    /**
     * 报表Form ID 前缀
     */
    reportFormIdPrefix?: string;
    /**
     * 报表Form 参数前缀
     */
    reportFormParamPrefix?: string;
    /**
     * 报表Frame ID前缀
     */
    reportFrameIdPrefix?: string;
    /**
     * 报表 sessionID 名称
     */
    reportSessionIdName?: string;
    /**
     * 报表服务地址
     */
    reportServer?: string;
}

class Report implements IReport {
    private readonly config: ReportConfig;

    constructor(config?: ReportConfig) {
        const defaultConfig = {
            reportFormIdPrefix: '#reportForm',
            reportFormParamPrefix: '',
            reportFrameIdPrefix: '#reportFrame',
            reportSessionIdName: 'data-report-session'
        };
        if (config && config.reportFormIdPrefix) {
            defaultConfig.reportFormIdPrefix = config.reportFormParamPrefix;
        }
        if (config && config.reportFormParamPrefix) {
            defaultConfig.reportFormParamPrefix = config.reportFormParamPrefix;
        }
        if (config && config.reportFrameIdPrefix) {
            defaultConfig.reportFrameIdPrefix = config.reportFrameIdPrefix;
        }
        if (config && config.reportSessionIdName) {
            defaultConfig.reportSessionIdName = config.reportSessionIdName;
        }
        this.config = defaultConfig;
    }

    preview(reportId: string): void {
        console.warn(`报表预览：${reportId}-${this.config.reportFormParamPrefix}`)
    }

    print(reportId: string, showDialog?: boolean): void {
        console.warn(`报表打印：${reportId}-${showDialog}`)
    }

    query(reportId: string, reportServer?: string): void {
        console.warn(`报表查询：${reportId}-${reportServer}`)
    }

    switch(reportId: string, reportlet: string): void {
        console.warn(`报表切换：${reportId}-${reportlet}`)
    }

}

export {Report}
