/**
 * Created by huchunbo on 2017/2/16.
 */
define([
    './workStatus',
    './../command',
    './../workStatus',
    './../helper',
    './../record'
], function(statusList) {
    var viewData = [];

    // 导航栏
    var navigationbarView = {
        type: 'navigationBar',
        // title: function (data) {
        //     return helperManager.nameForWorkMode(data.WorkMode);
        // },
        componentType: 'mixed'
    };
    viewData.push(navigationbarView);

    // 添加工作计时组件
    var workTimeCountView = {
        type: 'countDownView',
        title: 'mode title',
        displayData: function(data) {

            var state = '--',
                mainExplain = '剩余时间',
                mainNumber = 70,
                main = '',
                allTimeNumber = -1,
                allTime = '',
                additional = '', //'附加信息...',
                currentStep = 0,
                allStep = 0;
            var mainNumberLength = 2, // 主要数字组合长度 00：00：00
                allTimeLength = 2;
            var mainContent = undefined;

            // 工作状态判定
            switch (data.WorkStatus) {
                case '0':
                    state = '待机';
                    break;
                case '1':
                    state = '暂停';
                    break;
                case '2':
                    state = '预约中';
                    break;
                case '3':
                    state = '搅拌1';
                    break;
                case '4':
                    state = '发酵1';
                    break;
                case '5':
                    state = '搅拌2';
                    break;
                case '6':
                    state = '发酵2';
                    break;
                case '7':
                    state = '搅拌3';
                    break;
                case '8':
                    state = '发酵3';
                    break;
                case '9':
                    state = '烘烤';
                    break;
                case '10':
                    state = '保温';
                    break;
                case '11':
                    state = '出炉';
                    break;
                default:
                    state = '加载中';
                    break;
            };

            //工作模式判定
            switch (data.WorkMode) {
                case '1':
                    // 云食谱
                    break;
                default:
            }

            if (data.WorkMode !== '1') { //非云食谱
                if (workStatusManager.isMultistep) { //多步骤工作模式
                    if (workStatusManager.isAppoinment) { //有预约
                        alstep = 10;
                    } else {
                        allStep = 9;
                    }
                } else {
                    if (workStatusManager.isCustom) { //自定义模式
                        allStep = 9;
                    } else { //单步骤模式
                        allstep = 1;
                    }
                }
            }
            return {
                mainExplain: mainExplain,
                mainContent: mainContent,
                mainNumber: mainNumber,
                mainNumberLength: mainNumberLength,
                main: main,
                state: state,
                allTimeNumber: allTimeNumber,
                allTime: allTime,
                allTimeLength: allTimeLength,
                additional: additional,
                currentStep: currentStep,
                allStep: allStep,
                working: ['1', '2', '3', '4'].indexOf(data.WorkStatus) >= 0,
                needAutoCountDown: false,
                pause: data.WorkStatus === '5'
            }
        }
    }
    viewData.push(workTimeCountView);

    // 添加步骤显示
    var stepView = {
        type: 'stepView',
        displayData: function(data) {
            var list = [],
                stepNow = 0;
            var cloudMenuAdditionalStep = [];
            var defaultArray = statusList.commonStatusList; // 定义的默认数组

            if (workStatusManager.isMultistep) {
                if (workStatusManager.isAppoinment) {
                    list = defaultArray;
                } else {
                    list = defaultArray.slice(1);
                }
            } else {
                if (workStatusManager.isCustom) { //自定义模式
                    list = defaultArray.slice(1);
                } else { //单步骤模式
                    list = ['制作中']
                }
            }


            return {
                explain: '',
                list: list,
                stepNow: stepNow,
                isCloudMenu: data.WorkMode === '1',
                cloudMenuHasAppointment: Number(data.TM_Start) > 0,
                cloudMenuAdditionalStep: cloudMenuAdditionalStep
            };
        }
    };
    viewData.push(stepView);

    // 添加底部留白高度
    var footerHeight = {
        type: 'separator-view',
        height: 50,
    }
    viewData.push(footerHeight);

    //添加底部按钮
    var startButton = {
        type: 'stopView',

        config: function(data) {
            return {
                majorButton: {
                    title: function(data) {
                        if (['5'].indexOf(data.WorkStatus) >= 0) { // 暂停中
                            return '继续制作';
                        } else {
                            return '暂停制作'
                        }
                    },

                    command: function(data) {
                        if (['5'].indexOf(data.WorkStatus) >= 0) { // 暂停中
                            return [{
                                key: 'KG_Start',
                                value: '1'
                            }];
                        } else {
                            return [{
                                key: 'KG_Start',
                                value: '0'
                            }];
                        }
                    },

                    customTapFunction: function(data, component) {
                        if (data.ErrorCode == '1') {
                            component.$set('data.needCheckOpenDoor', true);
                            return false;
                        }
                        return true;

                    }
                },
                minorButton: {
                    title: '取消',
                    minorButtonClass: 'xxx',
                    command: [{
                        key: 'KG_Start',
                        value: '0'
                    }],
                    confirm: {
                        title: '取消',
                        text: '请确认是否取消工作',
                        confirm: {
                            text: '继续制作',
                            data: [{
                                key: 'KG_Start',
                                value: '0'
                            }]
                        },
                        cancel: {
                            text: '结束制作'
                        }
                    }
                }
            }
        },
    }
    viewData.push(startButton);

    return viewData;
});