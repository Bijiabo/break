/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', './UI_timePicker', './UI_confirmView'], function(Vue, _public) {

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var CustomList = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div class="custom-list custom-group">\
                            <div class="custom_list_child">\
                                <i class="iconfont left_icon">{{{itemData.leftIcon}}}</i>\
                                <p class="custom_step_title">{{{itemData.title}}}</p>\
                                <i class="iconfont right_icon">{{{itemData.rightIcon}}}</i>\
                                <p class="custom_step_time">{{{itemData.rightTime}}}</p>\
                            </div>\
                        </div>\
                        <div \
                        class="custom-list-appointment-view"\
                        >\
                            <div class="shadow" v-tap="toggleAppointmentUI"></div>\
                            <div class="appointment-view-content">\
                                <time-picker\
                                :data.sync="data"\
                                :item-data="timePickerConfig"\
                                :display="displayAppointmentUI"\
                                :index="appointment"\
                                auto-init="true"\
                                ></time-picker>\
                                \
                                <div class="bottom-button-group">\
                                    <div \
                                    class="minor-button ui-important-light-orange-btn"\
                                    v-tap="tapSetAppointCancelButton"\
                                    >取消</div>\
                                    <div \
                                    class="major-button ui-important-orange-btn"\
                                    v-tap="tapSetAppointMentButton"\
                                    >确定</div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                leftIcon: this.itemData.leftIcon,
                title: this.itemData.title,
                rightTime: this.itemData.rightTime,
                rightIcon: this.itemData.rightIcon || "&#xe617;",
                displayAppointmentUI: false,
                timePickerConfig: this.itemData.appointment ? {
                    title: this.itemData.appointment.title || '设置制作时间',
                    // minorButtonClass: this.itemData.appointment.minorButtonClass || 'ui-important-orange-btn',
                    // majorButtonClass: this.itemData.appointment.majorButtonClass || 'ui-important-green-btn',
                    // expectTime: this.itemData.appointment.expectTime,
                    defaultValue: this.itemData.appointment.defaultValue || '10',
                    key: this.itemData.appointment.key || 'TM_Start',
                    type: 'timePicker',
                    unit: this.itemData.appointment.unit || 'second',
                    min: this.itemData.appointment.min || 10,
                    max: this.itemData.appointment.max || 100,
                    step: this.itemData.appointment.step || 2,
                    system12: this.itemData.appointment.system12 === undefined ? true : this.itemData.appointment.system12,
                    system24: this.itemData.appointment.system24 === undefined ? false : this.itemData.appointment.system24,
                    stringValue: this.itemData.appointment.stringValue || true,
                    fromNow: this.itemData.appointment.fromNow === undefined ? true : this.itemData.appointment.fromNow
                } : {},
                displayConfirm: {
                    value: false
                }
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            // getViewCommandData: function(keys) {
            //     // 获取界面设置项目的对应下发数据
            //     var command = {};
            //     if (keys === undefined) {
            //         return command;
            //     }

            //     for (var i = 0, len = keys.length; i < len; i++) {
            //         var keyName = keys[i];
            //         if (window.data[keyName]) {
            //             command[keyName] = window.data[keyName];
            //         }
            //     }
            //     return command;
            // },
            // tapButton: function() {
            //     if (this.itemData.customTapFunction) {
            //         return this.itemData.customTapFunction(this.data)
            //     }
            // },
            buttonTimePicker: function() {
                // 点击次要按钮
                if (this.checkIfNeedShowWorkingTip()) {
                    return;
                }

                // 获取要下发的命令
                // if (this.itemData.minorButton.customTapFunction) {
                //     this.itemData.minorButton.customTapFunction();
                // } else {
                //     var keys = this.itemData.majorButton.keys;
                //     var command = this.getViewCommandData(keys);

                //     // 添加附加指令
                //     if (this.itemData.majorButton.additionalCommand) {
                //         var additionalCommands = this.itemData.majorButton.additionalCommand;
                //         for (var i = 0, len = additionalCommands.length; i < len; i++) {
                //             var currentItem = additionalCommands[i];
                //             command[currentItem.key] = currentItem.value;
                //         }
                //     }
                //     _setDeviceStatus(false, command);
                // }

                if (this.itemData.appointment !== false) {
                    this.toggleAppointmentUI();
                }

            },
            toggleAppointmentUI: function() {
                // 切换预约设置界面显示状态
                this.displayAppointmentUI = !this.displayAppointmentUI;
            },
            tapSetAppointMentButton: function() {
                // 获取要下发的命令
                if (this.checkIfNeedShowWorkingTip()) {
                    return;
                }

                window.loadPageCount = 1;

                var currentItemData = this.itemData.appointment;
                if (currentItemData.customTapFunction) {
                    currentItemData.customTapFunction(this.data);
                } else {
                    var keys = currentItemData.keys;
                    var command = this.getViewCommandData(keys);

                    // 添加附加指令
                    if (currentItemData.additionalCommand) {
                        var additionalCommands = currentItemData.additionalCommand;
                        for (var i = 0, len = additionalCommands.length; i < len; i++) {
                            var currentItem = additionalCommands[i];
                            command[currentItem.key] = currentItem.value;
                        }
                    }
                    _setDeviceStatus(false, command);
                }
                this.toggleAppointmentUI();
            },
            tapSetAppointCancelButton: function() {
                this.toggleAppointmentUI();
                // 获取要下发的命令
                if (this.checkIfNeedShowWorkingTip()) {
                    return;
                }

                var currentItemData = this.itemData.appointment;
                if (currentItemData.customTapCancelFunction) {
                    currentItemData.customTapCancelFunction();
                } else {
                    var keys = currentItemData.cancel.keys;
                    var command = this.getViewCommandData(keys);

                    // 添加附加指令
                    if (currentItemData.cancel.additionalCommand) {
                        var additionalCommands = currentItemData.cancel.additionalCommand;
                        for (var i = 0, len = additionalCommands.length; i < len; i++) {
                            var currentItem = additionalCommands[i];
                            command[currentItem.key] = currentItem.value;
                        }
                        _setDeviceStatus(false, command);
                    }

                }
            },
            checkIfNeedShowWorkingTip: function() {
                var working = this.itemData.working(data);
                if (working) {
                    DA.toast({
                        cls: "toast-container",
                        message: "正在工作中，未结束...",
                        duration: 1000,
                        hold: false
                    });
                }

                return working;
            },

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
    Vue.component('customList', CustomList);

    return CustomList;
});