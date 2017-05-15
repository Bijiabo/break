/**
 * Created by huchunbo on 2017/2/17.
 */
define(['./js/manager/helperManager'], function (helper) {

    var workModeList = ['', '卸妆模式', '深层补水', '肌肤SPA', '晒后恢复', '敏感肌肤护理', '控油模式', 'DIY模式', '手动模式'];

    // 当前模式名称
    helper.add(
        'workModeName',
        function (data) {
            var workModeName = workModeList[Number(data.WorkMode)];
            if (workModeName) {
                return workModeName;
            } else if (Number(data.WorkMode) >= 9) {
                return '面膜模式';
            }
            return '未知模式';
        }
    );
    
    helper.add(
        '_workModeName',
        function (data) {
            var workModeName = workModeList[Number(data._WorkMode)];
            if (workModeName) {
                return workModeName;
            } else if (Number(data.WorkMode) >= 9) {
                return '面膜模式';
            }
            return '未知模式';
        }
    );

    // 模式名称
    helper.addFunction(
        'nameForWorkMode',
        function (data, params) {
            if (params.length === 0) { return 'params error for [nameForWorkMode] in helper manager'; }
            var workMode = Number(params[0]);
            var workModeName = workModeList[workMode];
            if (workModeName) {
                return workModeName;
            } else if (workMode >= 9) {
                return '面膜模式';
            }
            return '未知模式';
        }
    );

    // 当前模式启动说明
    helper.add(
        '_workModeStartTip',
        function (data) {
            var workModeTipList = [
                '',
                '卸妆模式启动说明',
                '深层补水启动说明',
                '肌肤SPA启动说明',
                '晒后恢复启动说明',
                '敏感肌肤护理启动说明',
                '控油模式启动说明',
                'DIY模式启动说明'
            ];
            var tip = workModeTipList[Number(data._WorkMode)];
            if (tip) {
                return tip;
            } else if (Number(data.WorkMode) >= 9) {
                return '面膜模式启动说明';
            }
            return '未找到对应模式启动说明';
        }
    );

    // 获取工作模式对应的名字 WF.extra.Steps[x].Action.Type
    helper.addFunction(
        'nameForActionType',
        function (data, actionType) {
            var typeNames = ['', '热喷', '冷喷', '温喷', '敷面膜'];
            var actionTypeNumber = Number(actionType[0]);
            var name = typeNames[actionTypeNumber];
            if (name) {
                return name;
            }
            return '未知动作';
        }
    )

    // 当前工作状态名称
    helper.add(
        'workStatusName',
         function (data) {
             var workStatusList = [
                 '待机',
                 '预热中',
                 '热喷中',
                 '冷喷中',
                 '温喷中',
                 '完成',
                 '敷面膜开始等待',
                 '敷面膜中',
                 '敷面膜时间到'
             ];
             var name = workStatusList[Number(data.WorkStatus)];
             if (name) {
                 return name;
             }
             return '未知状态' + data.WorkStatus;
         }
    );

    // 转化数字为对应 iconfont 代码
    helper.addFunction(
        'fontCodeForNumber',
        function (data, params) {
            if (params.length === 0 || params[0] === undefined) { return ''; }

            var targetNumber = params[0].toString();
            var fontCodeList = [
                '&#xe62c;',
                '&#xe62d;',
                '&#xe62e;',
                '&#xe62f;',
                '&#xe630;',
                '&#xe631;',
                '&#xe632;',
                '&#xe633;',
                '&#xe634;',
                '&#xe635;'
            ];
            var colonCode = '&#xe63a;'; // 冒号 :
            var asteriskCode = '&#xe692;'; // 星号 *
            var minusCode = '&#xe62a;'; // 减号 *

            var result = '';
            for (var i=0,len=targetNumber.length; i<len; i++) {
                var index = Number(targetNumber[i]);
                if (!isNaN(index)) {
                    result += '<span class="iconfont">' + fontCodeList[index] + '</span>';
                } else if (targetNumber[i] === ':') {
                    result += '<span class="iconfont colon">' + colonCode + '</span>';
                } else {
                    result += '<span class="iconfont">' + minusCode + '</span>';
                }
            }

            return result;
        }
    );

    helper.add(
        'stepList',
        function(data) {
            var commandForWorkModeIndex = function(workModeIndex, workStatus) {
                workModeIndex = Number(workModeIndex);
                var commandKey = workModeIndex;
                if (workModeIndex == 7) { // diy mode
                    commandKey = 'diy';
                } else if (workModeIndex >= 9) { // mask mode
                    commandKey = 'mask';
                } else { // manual
                    
                }
                var targetCommandName = '_raw_data_' + 'start_work_' + commandKey;
                var targetCommand = commandManager[targetCommandName];
                if (targetCommand === undefined) { return {}; }
                if (workModeIndex == 7) { // diy mode
                    var actionType = '1'; // 工作流程步骤的工作模式，对应 WF.extra.Steps[0].Action.Type
                    if (Number(workStatus) < 250) {
                        actionType = String(Number(workStatus) - 1);
                    } else {
                        switch (Number(workStatus)) {
                            case 253:
                                actionType = '1';
                                break;
                            case 254:
                                actionType = '2';
                                break;
                            case 255:
                                actionType = '3';
                                break;
                            default:
                                break;
                        }
                    }
                    targetCommand.WF.extra.Steps[0].Action.Type = actionType;
                }
                
                return targetCommand.WF.extra.Steps;
            };
            var displayListForCommandList = function(commandList, targetWorkMode) {
                // commandList: 下发指令集 Array
                // targetWorkMode: 下发指令目标模式 WorkMode，用于个别状态特殊显示转换
                var displayList = [];
                for (var i=0, len=commandList.length; i<len; i++) {
                    var currentItem = commandList[i];
                    var currentStepActionType = currentItem.Action.Type;
                    
                    // 若第一步为热喷过程，则添加预热步骤显示
                    if (i === 0 && currentStepActionType == '1') {
                        displayList.push('预热');
                    }
                    
                    var currentStepActionTypeName = helperManager.nameForActionType(currentStepActionType);
                    
                    // 面膜模式下，冷喷显示为冷敷
                    if (Number(targetWorkMode) >= 9 && currentStepActionType == '2') {
                        currentStepActionTypeName = '冷敷';
                    }
                    
                    displayList.push(currentStepActionTypeName);
                }
                return displayList;
            };
            var processDisplayListByAddingWorkStatus = function(displayList, data) {
                var _displayList= [];
                var currentWorkStatus = data.WorkStatus;
                var currentStepIndex = Number(data.WF_CurrentStep);
                
                // 若第一步为预热，且不在预热过程中，则设定 currentStepIndex 偏移 +1
                if (displayList[0] == '预热') {
                    if (data.WorkStatus == '1') { // 预热中
                        currentStepIndex = 0;
                    } else {
                        currentStepIndex += 0;
                    }
                } else {
                    currentStepIndex -= 1;
                }
                
                for (var i=0, len=displayList.length; i<len; i++) {
                    var item = displayList[i];
                    if (currentStepIndex === i) {
                        item = item + '中';
                    }
                    _displayList.push(item);
                }
                return _displayList;
            };
            return processDisplayListByAddingWorkStatus(
                        displayListForCommandList(
                            commandForWorkModeIndex(
                                data.WorkMode,
                                data.WorkStatus
                            ),
                            data.WorkMode
                        ),
                        data);
        }
    );
    
    helper.addFunction(
        'formatTimeTo_XX_XX',
        function (data, params) {
            var currentTime = params[0];
            var left = Math.floor(currentTime / 60),
                right = currentTime % 60;
            
            var addZero = function (value) {
                return Number(value) > 9 ? value : '0'+value;
            };
            
            left = addZero(left);
            right = addZero(right);
            
            return left + ':' + right;
        }
    );

});