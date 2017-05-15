/**
 * Created by huchunbo on 2017/2/16.
 */
define([
    './../command',
    './../workStatus',
    './../helper'
], function() {
    var viewData = [];
    
    // 导航栏
    var navigationbarView = {
        type: 'navigationBar',
        title: 'DIY 模式',
        componentType: 'mixed'
    };
    viewData.push(navigationbarView);

    // 添加模式切换标题
    var titleComponent = {
        type: 'explainView',
        title: '补水模式'
    };
    viewData.push(titleComponent);

    // 添加冷热温喷模式切换控件
    var tabSwitch = {
        type: 'tabView',
        key: 'diy_type',
        map: [
            {
                txt: '热喷模式',
                value: '1'
            },
            {
                txt: '冷喷模式',
                value: '2'
            },
            {
                txt: '温喷模式',
                value: '3'
            }
        ]
    };
    viewData.push(tabSwitch);

    // 添加时间设定控件
    var timeSetter = {
        title: '时间设定',
        defaultValue: '3',
        key: '_WorkTime',
        type: 'timePicker',
        unit: 'minute',
        min: 1,
        max: 60,
        step: 1,
        system12: false,
        stringValue: true
    };
    viewData.push(timeSetter);

    // 添加启动按钮
    var startView = {
        type: 'startView',
        working: function(data){ // 判断是否正在工作中
            return workStatusManager.isWorking;
        },
        majorButton: {
            title: '现在开始',
            customTapFunction: function(data) {
                commandManager.start_work_diy;
            },
            buttonClass: 'start-view-main-button'
        }
    };
    viewData.push(startView);


    return viewData;
});