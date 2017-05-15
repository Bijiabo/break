/**
 * Created by huchunbo on 2017/2/16.
 */
define([
    './../command',
    './../workStatus',
    './../helper',
    './../record'
], function() {
    var viewData = [];
    
    // 导航栏
    var navigationbarView = {
        type: 'navigationBar',
        title: function (data) {
            return helperManager.nameForWorkMode(data.WorkMode);
        },
        componentType: 'mixed'
    };
    viewData.push(navigationbarView);
    
    // 工作完成提示
    var workDoneView = {
        type: 'work-done-view',
        show: function (data, context) {
            return workStatusManager.isWorkDone;
        }
    };
    viewData.push(workDoneView);

    // 添加倒计时显示
    var countDownView = {
        type: 'KDCountDownView',
        backgroundImage: function (data) {
            var defaultImage = 'https://img.alicdn.com/imgextra/i1/176994656/TB2nEdZpHxmpuFjSZJiXXXauVXa_!!176994656.jpg',
                maskImage = 'https://img.alicdn.com/imgextra/i2/176994656/TB2Eu9qkiC9MuFjSZFoXXbUzFXa_!!176994656.jpg';
            switch (data.WorkStatus) {
                case '2': // 热喷
                    return defaultImage;
                case '3': // 冷喷
                    return 'https://img.alicdn.com/imgextra/i4/176994656/TB2wRZFmY0kpuFjy0FjXXcBbVXa_!!176994656.jpg';
                case '4': // 温喷
                    return 'https://img.alicdn.com/imgextra/i4/176994656/TB21hp.pNlmpuFjSZPfXXc9iXXa_!!176994656.jpg';
                case '6': // 敷面膜开始等待
                    return maskImage;
                case '7': // 敷面膜中
                    return maskImage;
                case '8': // 敷面膜时间到
                    return maskImage;
                default:
                    return defaultImage;
            }
        },
        displayData: function(data) {
            var _displayData = {
                mainExplain: '',
                mainContent: '',
                mainNumber: 10,
                keyForMainNumber: 'WorkTime',
                mainNumberLength: 2,
                main: 'main',
                state: '加载中',
                allTimeNumber: -1,
                allTime: '',
                allTimeLength: 2,
                keyForAllTimeNumber: 'WorkTime',
                additional: '',
                currentStep: 2,
                allStep: 3,
                working: true,
                needAutoCountDown: true,
                pause: data.WorkStatus === '5',
                hideStep: true,
                shouldAutoCountDown: function (data) {
                    return workStatusManager.shouldAutoCountDownTime;
                }
            };

            // 显示剩余当前步骤时间
            if (data.WorkMode == '8') { // 手动模式
                _displayData.mainNumber = Number(data.WorkTime);
            } else { // 非手动模式
                _displayData.mainNumber = Number(data.WorkTime_Left);
            }

            // 显示当前工作状态
            _displayData.state = helperManager.workStatusName;

            // 显示总剩余时间
            _displayData.allTimeNumber = data.WorkTime ? Number(data.WorkTime) : -1;
            
            // 判断工作状态
            _displayData.working = function (data) {
                return workStatusManager.isWorking;
            };
            
            // 添加温馨提示
            if (workStatusManager.isPreparingHeat) {
                _displayData.additional = '预热完成后，即可开始进行护肤<br>预计护肤总时间 ' + helperManager.formatTimeTo_XX_XX(data.WF_TimeLeft);
            }
            
            // 设定对应 TRD KEY，处理用户交互引起的数据抖动问题
            if (data.WorkMode == '8') { // 手动模式
                _displayData.keyForMainNumber = 'WorkTime';
            } else { // 非手动模式
                _displayData.keyForMainNumber = 'WorkTime_Left';
            }

            return _displayData;
        },
        renderMainNumber: function (currentMainNumber) {
            var leftTime = currentMainNumber;
            var seconds = leftTime % 60;
            var minutes = Math.floor(leftTime / 60);
            if (seconds < 10) { seconds = '0' + seconds; }
            if (minutes < 10) { minutes = '0' + minutes; }
            return helperManager.fontCodeForNumber(minutes + ':' + seconds);
        },
        show: function (data) {
            return !workStatusManager.isWorkDone;
        }
    };
    viewData.push(countDownView);

    // 添加步骤显示
    var stepView = {
        type: 'stepView',
        displayData: function(data) {
            var _displayData = {
                list: ['加载中'],
                stepNow: -1,
                isCloudMenu: false,
                cloudMenuHasAppointment: false,
                cloudMenuAdditionalStep: []
            };
            
            // 更新列表文字数据
            _displayData.list = helperManager.stepList; 
            console.warn(_displayData.list);
    
            // 更新当前步骤
            var currentStepIndex = Number(data.WF_CurrentStep);
            if (_displayData.list[0] == '预热' || _displayData.list[0] == '预热中') {
                if (data.WorkStatus == '1') { // 预热中
                    currentStepIndex = 0;
                } else {
                    currentStepIndex += 0;
                }
            } else {
                currentStepIndex -= 1;
            }
            // 工作完成后，当前步骤要 >= steplist.count
            if (workStatusManager.isWorkDone) {
                currentStepIndex = _displayData.list.length;
            }
            _displayData.stepNow = currentStepIndex;

            return _displayData;
        }
    };
    viewData.push(stepView);
    
    // 底部留白
    var separatorView = {
        type: 'separator-view',
        height: 80
    };
    viewData.push(separatorView);

    // 添加取消按钮
    var stopView = {
        type: 'stopView',
        config: function (data) {
            return {
                majorButton: {
                    title: workStatusManager.isWorkDone ? '我知道啦' : '取消',
                    customTapFunction: function(data, context) {
                        if (workStatusManager.isWorkDone) {
                            recordManager.stop('stop_work');
                            commandManager.stop;
                        } else {
                            context.$set('data._stop', true);
                        }
                        
                        return false;
                    }
                }
            }
        }
    };
    viewData.push(stopView);

    // 添加面膜模式时间到弹窗提示

    // 添加取消二次确认
    var stopWorkConfirm = {
        type: 'confirmView',
        needDisplay: function(data) {
            return data._stop;
        },
        display: {value: false},
        title: '启动xxx模式',
        text: '我是提示内容',
        confirm: {
            text: '确定',
            customTapFunction: function (data, context) {
                // var command = 'start_work_' + data._WorkMode;
                recordManager.stop('stop_work');
                context.$set('data._stop', false);
                commandManager.stop;
            }
        },
        cancel: {
            text: '取消',
            customTapFunction: function (data, context) {
                context.$set('data._stop', false);
            }
        },
        didCloseModal: function (context) {
            context.$set('data._stop', false);
        },
        displayData: function (data) {
            var _displayData = {
                title: '取消工作',
                text: '请确认是否取消工作'
            };
            
            return _displayData;
        }
    };
    viewData.push(stopWorkConfirm);
    
    // 添加面膜开始确认
    var startMaskWorkFlowConfirm = {
        type: 'confirmView',
        needDisplay: function(data) {
            return data.WorkStatus == '6';
        },
        display: {value: false},
        title: '开始敷面膜',
        text: '热喷过程已经结束，毛孔已经打开，现在是敷面膜的最佳时机哦!<br>请敷好面膜后，点击开始按钮',
        confirm: {
            text: '确定',
            customTapFunction: function (data, context) {
                commandManager.start;
            }
        },
        cancel: {
            text: '取消',
            customTapFunction: function (data, context) {
                commandManager.stop;
            }
        },
        didCloseModal: function (context) {
            // context.$set('data._stop', false);
        },
        customClass: 'mask_confirm'
    };
    viewData.push(startMaskWorkFlowConfirm);
    
    // 添加面膜结束确认
    var stopMaskWorkFlowConfirm = {
        type: 'confirmView',
        needDisplay: function(data) {
            return data.WorkStatus == '8';
        },
        display: {value: false},
        title: '取下面膜',
        text: '面膜已经达到了最佳吸收效果，现在可以取下面膜，冷喷紧致肌肤啦!<br>取下后请点击继续按钮',
        confirm: {
            text: '继续',
            customTapFunction: function (data, context) {
                commandManager.start;
            }
        },
        cancel: {
            text: '取消',
            customTapFunction: function (data, context) {
                commandManager.stop;
            }
        },
        didCloseModal: function (context) {
        },
        customClass: 'mask_confirm'
    };
    viewData.push(stopMaskWorkFlowConfirm);


    return viewData;
});