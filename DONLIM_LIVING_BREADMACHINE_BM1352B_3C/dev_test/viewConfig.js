/**
 * Created by huchunbo on 2017/2/16.
 */
define([
    './workModes',
    './../command',
    './../workStatus',
    './../helper'
], function(modeConfig) {
    // 取对应工作模式的参数值
    var viewData = [];
    
    var actionSheetView = {
        type: 'actionSheetView',
        subViewData: [
            {
                type: 'explainView',
                title: 'this is title',
                content: 'hello,world.'
            },
            {
                type: 'promptCell',
                content: '温馨提示：制作时间需',
                contentPackageFunction: function(data) {
                    return helperManager.syncTime(data);
                }
            }
        ]
    };
    viewData.push(actionSheetView);
    
    return viewData;
});