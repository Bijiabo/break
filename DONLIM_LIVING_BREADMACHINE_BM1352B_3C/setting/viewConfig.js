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
    var getCurrentModeConfig = function() {
        if (DA.query.WorkMode) {
            return modeConfig[DA.query.WorkMode];
        }
        return {
            title: 'Unknow'
        }
    };

    // 公用组件、各工作模式组件的调用
    var getCurrentModeConfigViewData = function() {
        var modeConfigData = getCurrentModeConfig();
        var viewData = [];

        viewData = modeConfigData.viewData ? viewData.concat(modeConfigData.viewData) : viewData;

        // 添加导航栏组件
        var navigationbarView = {
            type: 'navigationBar',
            title: modeConfigData.title,
            componentType: 'mixed'
        };
        viewData.push(navigationbarView);

        // 添加底部按键组件
        var startButton = {
            type: 'startView',
            working: function(data) { // 判断是否正在工作中
                if (data.WorkStatus === '0') {
                    return false;
                }
                return true;
            },
            customTapFunction: function(data){
                if(data.KG_Start == '1' || data.KG_Start == '0'){

                }
            },
            majorButton: {
                title: '<i class="iconfont startIcon">&#xe605;</i>&nbsp;开启',
                majorButtonClass: 'ui-important-orange-btn',
                keys: ['KG_Start'],
                customTapFunction: function(data) {
                    //do sth
                    var preSet = {
                        'KG_Start': {value: '1'},
                        'WorkMode': {value: DA.query.WorkMode}
                    };
                    DA.setDeviceStatus(DA.uuid, preSet);
                }
            },
        };
        if (modeConfigData.appointment !== false) {
            startButton.minorButton = {
                title: '预约',
                key: ['Reserve'],
                minorButtonClass: 'ui-important-light-orange-btn',
                customTapFunction: function() {
                    // do sth
                }
            };
            startButton.appointment = {
                title: '预约完成时间',
                keys: ['TM_Finish'],
                system12: false,
                system24: false,
                unit: 'minute',
                fromNow: false,
                min: 1,
                max: 570,
                step: 1,
                customTapFunction: function(data) {
                    // do sth
                },
                cancel: {}
            }
        }
        viewData.push(startButton);

        return viewData;
    }
    return getCurrentModeConfigViewData();
});