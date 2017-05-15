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
        title: '面膜模式',
        componentType: 'mixed'
    };
    viewData.push(navigationbarView);

    // 添加模式说明
    var titleComponent = {
        type: 'explainView',
        title: '面膜模式说明',
        content: '下面的时间设定为敷面膜时间，请根据肤质、面膜情况来设置，一般建议冬天15分钟，夏天20分钟。敷面膜前后会有热喷和冷喷过程。'
    };
    viewData.push(titleComponent);

    // 添加模式时间设定组件
    var workTimeSetter = {
        type: 'kd-mask-slider-view',
        sync: false,
        key: 'WorkTime',
        title: '设定敷面膜时间',
        min: 5,
        max: 15,
        step: 1,
        defaultValue: '10',
        unit: '℃',
        optimizeTitleStyle: true
    };
    viewData.push(workTimeSetter);

    // 添加启动按钮
    var startView = {
        type: 'startView',
        working: function(data){ // 判断是否正在工作中
            return workStatusManager.isWorking;
        },
        majorButton: {
            title: '现在开始',
            customTapFunction: function(data) {
                commandManager.start_work_mask;
            },
            buttonClass: 'start-view-main-button'
        }
    };
    viewData.push(startView);

    return viewData;
});