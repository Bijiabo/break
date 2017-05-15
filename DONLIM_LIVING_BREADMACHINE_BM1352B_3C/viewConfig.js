/**
 * Created by huchunbo on 2017/2/16.
 */
define([
    './command',
    './workStatus',
    './helper',
    './record',
], function() {
    var viewData = [];

    // 头部导航组件
    var navBar = {
        type: 'navigationBar'
    }
    viewData.push(navBar);

    // 头部大图组件
    var imageView = {
        type: 'productImage',
        url: 'image/xxx.jpg'
    };
    viewData.push(imageView);

    // 添加云食谱推荐组件
    var recommedRecipe = {
        type: 'cookbookPromotion',
    };
    viewData.push(recommedRecipe);

    // 添加头部工作信息组件
    var infoView = {
        type: 'cookbookCell',
        
    };
    viewData.push(infoView);

    // 添加模式普通面包选择控件
    var normalBreadMap = [
        {
            txt:'标准面包',
            value:'3'
        },
        {
            txt:'法式面包',
            value:'4'
        },
        {
            txt:'粗粮面包',
            value:'5'
        },
        {
            txt:'甜味面包',
            value:'10'
        },
        {
            txt:'低糖面包',
            value:'8'
        },
        {
            txt:'大米面包',
            value:'6'
        },
        {
            txt:'米粉面包',
            value:'7'
        },                                
        {
            txt:'快速面包',
            value:'2'
        },
        {
            txt:'意式面包',
            value:'9'
        }        
    ];

    var normalBread = {
        type: 'grid',
        key: 'WorkMode',
        gridNum:'3',
        defaultValue:'0',
        title: '普通面包',
        map: normalBreadMap,
        linkToPage: './setting/app.html',
        
        customTapFunction: function (index, item, data, context) {
            //do sth
            return true;
        },
        enable: function (data) {
            return workStatusManager.canStartWork;
        }
    };
    viewData.push(normalBread);

    // 添加模式无糖面包选择控件
    var noSugerBreadMap = [
        {
            txt:'标准无糖面包',
            value:'11'
        },
        {
            txt:'松软无糖面包',
            value:'12'
        },
        {
            txt:'严寒天无糖面包',
            value:'13'
        }       
    ];

    var noSugerBread = {
        type: 'grid',
        key: 'WorkMode',
        gridNum:'3',
        defaultValue:'0',
        title: '无糖面包',
        map: noSugerBreadMap,
        linkToPage: './setting/app.html',
        
        customTapFunction: function (index, item, data, context) {
            //do sth
            return true;
        },
        enable: function (data) {
            return workStatusManager.canStartWork;
        }
    };
    viewData.push(noSugerBread);

    // 添加模式百变发酵选择控件
    var fermentationChangeMap = [
        {
            txt:'酵素',
            value:'21'
        },
        {
            txt:'米酒',
            value:'22'
        },
        {
            txt:'葡萄酒',
            value:'23'
        },
        {
            txt:'酸奶',
            value:'19'
        },
        {
            txt:'泡菜',
            value:'20'
        },
        {
            txt:'发酵/解冻',
            value:'29'
        }       
    ];

    var fermentationChange = {
        type: 'grid',
        key: 'WorkMode',
        gridNum:'3',
        defaultValue:'0',
        title: '百变发酵',
        map: fermentationChangeMap,
        linkToPage: './setting/app.html',
        
        customTapFunction: function (index, item, data, context) {
            //do sth
            return true;
        },
        enable: function (data) {
            return workStatusManager.canStartWork;
        }
    };
    viewData.push(fermentationChange);

    // 添加模式和面搅拌选择控件
    var kneadMixingMap = [
        {
            txt:'和面',
            value:'24'
        },
        {
            txt:'披萨面团',
            value:'26'
        },
        {
            txt:'意式和面',
            value:'25'
        },
        {
            txt:'发面',
            value:'27'
        }       
    ];

    var kneadMixing = {
        type: 'grid',
        key: 'WorkMode',
        gridNum:'3',
        defaultValue:'0',
        title: '和面/搅拌',
        map: kneadMixingMap,
        linkToPage: './setting/app.html',
        
        customTapFunction: function (index, item, data, context) {
            //do sth
            return true;
        },
        enable: function (data) {
            return workStatusManager.canStartWork;
        }
    };
    viewData.push(kneadMixing);

    // 添加模式烘烤翻炒选择控件
    var bakeFryMap = [
        {
            txt:'果酱',
            value:'17'
        },                
        {
            txt:'烘烤',
            value:'28'
        },
        {
            txt:'翻炒干货',
            value:'30'
        },
        {
            txt:'肉松',
            value:'16'
        },
        {
            txt:'蛋糕',
            value:'14'
        },
        {
            txt:'意式蛋糕',
            value:'15'
        },
        {
            txt:'年糕',
            value:'18'
        },
        {
            txt:'自定义菜单',
            value:'31'
        }       
    ];

    var bakeFry = {
        type: 'grid',
        key: 'WorkMode',
        gridNum:'3',
        defaultValue:'0',
        title: '烘烤/翻炒',
        map: bakeFryMap,
        linkToPage: './setting/app.html',
        
        customTapFunction: function (index, item, data, context) {
            //do sth
            return true;
        },
        enable: function (data) {
            return workStatusManager.canStartWork;
        }
    };
    viewData.push(bakeFry);


    // 添加模式启动二次确认界面
    // var startWorkConfirm = {
    //     type: 'confirmView',
    //     needDisplay: function(data) {
    //         return data._start;
    //     },
    //     display: {value: false},
    //     title: '启动xxx模式',
    //     text: '我是提示内容',
    //     confirm: {
    //         text: '现在开始',
    //         customTapFunction: function (data, context) {
    //             // var command = 'start_work_' + data._WorkMode;
    //             // commandManager[command];
    //             commandManager.start;
    //             recordManager.start('start_work');
    //             context.$set('data._start', false);
    //             window.loadPageCount = 1;
    //         }
    //     },
    //     cancel: {
    //         text: '取消',
    //         customTapFunction: function (data, context) {
    //             commandManager.stop;
    //             recordManager.stop('stop_work');
    //             context.$set('data._start', false);
    //         }
    //     },
    //     didCloseModal: function (context) {
    //         context.$set('data._start', false);
    //     },
    //     displayData: function (data) {
    //         var _displayData = {
    //             title: helperManager._workModeName,
    //             text: helperManager._workModeStartTip
    //         };

    //         return _displayData;
    //     }
    // };
    // viewData.push(startWorkConfirm)

    return viewData;
});