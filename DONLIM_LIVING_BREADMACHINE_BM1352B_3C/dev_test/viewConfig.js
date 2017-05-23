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
        subViewData: [ // 容器内主要区域的组件
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
        ],
        tapConfirm: function () {
            // 点击确定按钮
        },
        tapCancel: function () {
            // 点击取消按钮
        }
    };
    // viewData.push(actionSheetView);
    
    // 时间选择器
    var timePicker = {
        title: '制作时间',
        defaultValue: 'now',
        key: 'WorkTime',
        type: 'timePicker',
        system24: true,
        stringValue: true
    };
    viewData.push(timePicker);
    
    return viewData;
});