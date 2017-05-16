/**
 * Created by huchunbo on 2017/2/16.
 */
define([
    './../command',
    './../workStatus',
    './../helper'
], function() {
    var viewData = [];
    
    // 添加导航栏组件
    var navigationbarView = {
        type: 'navigationBar',
        title: '标准无糖面包',
        componentType: 'mixed'
    };
    viewData.push(navigationbarView);

    // 添加头部展示图组件
    var imageView = {
        type: 'productImage',
        url: 'image/xxx.jpg'
    };
    viewData.push(imageView);

    // 添加温馨提示组件
    var warmPrompt = {
        type: 'promptCell',
        content: '温馨提示：制作时间需要',
        controlTime: function(data){
            var cookTotalTime = data.WorkTime;
            return '温馨提示：制作时间需要' + cookTotalTime
        }
    };
    viewData.push(warmPrompt);

    // 添加烤色选择组件
    var bakeColor = {
        type: 'serialPipSlider',
        sync: true,
        key: 'Color',
        title: '烤色选择',
        min: 0,
        max: 2,
        step: 1,
        defalutValue: '0',
        unit: '',
        optimizeTitleStyle: true,
        serialMode: true,
        labelForValue : function(value, unit){
            var labels = ['浅色', '中色', '深色'];
            return labels[Number(value)];
        },
        didChange: function(data, context){
            //do sth
            return true;
        },
        beforeSendCommand: function (data, context) {
            //do sth
            return true;
        },
        tapWhenDisabled: function (data, context) {
            //do sth
            return true;
        },

    }
    viewData.push(bakeColor);

    // 添加质量选择组件
    var weightChoiceArray = [
        {
            txt: '500g',
            value: '1'
        },
        {
            txt: '750g',
            value: '2'
        },
        {
            txt: '1000g',
            value: '3'
        },
    ];
    var weightChoice = {
        type: 'grid',
        key: 'Weight',
        gridNum: '3',
        defaultValue: '0',
        title: '分量选择',
        map: weightChoiceArray,
        customTapFunction: function (index, item, data, context) {
            //do sth
            return true;
        },
        enable: function (data) {
            //do sth
            return true;
        }
    };
    viewData.push(weightChoice)

    // 添加底部按键组件
    var startButton = {
        type: 'startView',
        minorButton: {
            title: '预约',
            minorButtonClass: 'ui-important-light-orange-btn',
            working: function(data){
                if(data.WorkStatus && data.WorkStatus.value == 0){
                    return false;
                }
                return true
            },
            keys: ['WorkTime'],
            customTapFunction: function(data){
                //do sth
            }
        },
        majorButton: {
            title: '<i class="iconfont startIcon">&#xe605;</i>&nbsp;开启',
            majorButtonClass: 'ui-important-orange-btn',
            appointment: true
        },
        
    }
    viewData.push(startButton)

    return viewData;
});