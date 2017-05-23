/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', './UI_timePicker', './UI_confirmView'], function(Vue, _public) {

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var StopView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="start-view bottom-button-group">\
                            <div v-if="minorButton"\
                            class="minor-button ui-important-light-green-btn"\
                            v-tap="tapMinorButton"\
                            >{{minorButton.title}}</div>\
                            \
                            <div v-if="majorButton"\
                            class="major-button ui-important-dark-green-btn"\
                            v-tap="tapMajorButton"\
                            >{{majorButtonText}}</div>\
                        </div>\
                        \
                        <confirm-view \
                        :display="displayConfirm" \
                        index="stop-view" \
                        :item-data="confirm"\
                        ></confirm-view>\
                    </div>',
        data: function() {
            return {
                majorButtonText: '取消',
                majorButton: {
                    title: '暂停',
                    command: [],
                },
                minorButton: {
                    title: '取消',
                    command: [],
                },

                confirm: {
                    title: '温馨提示',
                    text: '是否结束制作？',
                    confirm: {
                        text: '继续制作',
                        data: [{
                            key: 'KG_Cancel',
                            value: '1'
                        }]
                    },
                    cancel: {
                        text: '结束制作'
                    }
                },
                displayConfirm: {
                    value: false
                }
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            tapMajorButton: function() {
                // 点击主按钮
                console.log('tapMajorButton');

                if (this.majorButton.customTapFunction) {
                    if (!this.majorButton.customTapFunction(this.data, this)) {
                        return;
                    }
                }

                // 二次确认弹窗
                if (this.majorButton.confirm) {
                    this.displayConfirm.value = true;
                    return;
                }

                // 获取要下发的命令
                var isCommandFunction = Object.prototype.toString.call(this.majorButton.command) === '[object Function]';
                var command = {};
                var commandConfig = isCommandFunction ? this.majorButton.command(this.data) : this.majorButton.command;
                if (commandConfig) {
                    for (var i = 0, len = commandConfig.length; i < len; i++) {
                        var currentItem = commandConfig[i];
                        command[currentItem.key] = currentItem.value;
                    }
                }
                _setDeviceStatus(false, command);
            },
            tapMinorButton: function() {
                // 点击次要按钮
                console.log('tapMinorButton');

                if (this.minorButton.customTapFunction) {
                    if (!this.minorButton.customTapFunction(this.data, this)) {
                        return;
                    }
                }

                // 二次确认弹窗
                if (this.minorButton.confirm) {
                    this.displayConfirm.value = true;
                    return;
                }

                // 获取要下发的命令
                var command = {};
                var commandConfig = this.minorButton.command;
                if (commandConfig) {
                    for (var i = 0, len = commandConfig.length; i < len; i++) {
                        var currentItem = commandConfig[i];
                        command[currentItem.key] = currentItem.value;
                    }
                }
                _setDeviceStatus(false, command);
            },
            updateConfig: function() {
                var currentConfig = this.itemData.config(this.data);
                var majorButton = $('.major-button');
                var minorButton = $('.minor-button');
                this.majorButton = undefined;
                this.minorButton = undefined;
                if (currentConfig.majorButton) {
                    this.majorButton = currentConfig.majorButton;
                    if (currentConfig.majorButton.confirm) {
                        this.confirm = currentConfig.majorButton.confirm;
                    }
                }
                if (currentConfig.minorButton) {
                    this.minorButton = currentConfig.minorButton;
                    if (currentConfig.minorButton.confirm) {
                        console.log(currentConfig.minorButton.confirm)
                        this.confirm = currentConfig.minorButton.confirm;
                    }
                }

                // 更新按钮文字
                var majorButtonTitleIsFunction = Object.prototype.toString.call(currentConfig.majorButton.title) === '[object Function]';
                if (majorButtonTitleIsFunction) {
                    this.majorButtonText = currentConfig.majorButton.title(this.data);
                } else {
                    this.majorButtonText = currentConfig.majorButton.title;
                }

                // 更新按钮UI
                if (['1'].indexOf(this.data.WorkStatus) >= 0) {
                    majorButton.removeClass('ui-important-dark-green-btn');
                    majorButton.addClass('ui-important-dark-orange-btn');
                }else{
                    majorButton.removeClass('ui-important-dark-orange-btn');
                    majorButton.addClass('ui-important-dark-green-btn');                    
                }


                if (['1'].indexOf(this.data.WorkStatus) >= 0) {
                    minorButton.removeClass('ui-important-light-green-btn');
                    minorButton.addClass('ui-important-light-orange-btn');
                }else{
                    minorButton.removeClass('ui-important-light-orange-btn');
                    minorButton.addClass('ui-important-light-green-btn');                    
                }

            }
        },
        ready: function() {
            this.updateConfig();
        },
        watch: {
            'data': {
                handler: function(newDataVal, oldVal) {
                    // var majorButtonTitleIsFunction = Object.prototype.toString.call( this.itemData.majorButton.title ) === '[object Function]';
                    // if ( majorButtonTitleIsFunction ) {
                    //     this.majorButtonText = this.itemData.majorButton.title(newDataVal);
                    // } else {
                    //     this.majorButtonText = this.itemData.majorButton.title ;
                    // }
                    this.updateConfig();
                },
                deep: true
            }
        },
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            }
        }
    });
    Vue.component('stopView', StopView);

    return StopView;
});