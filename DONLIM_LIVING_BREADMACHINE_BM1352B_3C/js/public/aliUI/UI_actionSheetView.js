/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public', './components-template'], function(Vue, _public, upt_template){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var ActionSheetView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]" :e="enable">\
                        <div \
                        class="action-sheet-view"\
                        >\
                            <div class="shadow" v-tap="toggleActionSheetUI"></div>\
                            <div class="action-sheet-view-content">\
                                \
                                <template v-for="(index,item) in subViewData">\
                                '+upt_template+'\
                                </template>\
                                \
                                \
                                <div class="bottom-button-group">\
                                    <div \
                                    class="minor-button ui-important-light-orange-btn"\
                                    v-tap="tapConfirm"\
                                    >取消</div>\
                                    <div \
                                    class="major-button ui-important-orange-btn"\
                                    v-tap="tapCancel"\
                                    >确定</div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
        data: function() {
            return {
                subViewData: []
            };
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {
            tapConfirm: function () {
                if (this.itemData.tapConfirm) {
                    this.itemData.tapConfirm(this.data, this);
                }
            },
            tapCancel: function () {
                if (this.itemData.tapCancel) {
                    this.itemData.tapCancel(this.data, this);
                }
            },
            toggleActionSheetUI: function () {
                
            }
        },
        ready: function () {
            console.log('action sheet view is ready.');
            this.subViewData = this.itemData.subViewData || [];
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
    Vue.component('actionSheetView', ActionSheetView);

    return ActionSheetView;
});

