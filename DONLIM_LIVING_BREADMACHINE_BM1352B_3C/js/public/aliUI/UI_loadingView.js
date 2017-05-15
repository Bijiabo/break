/**
 * Created by huchunbo on 2016/9/30.
 */

define(['./../vue', './public'], function(Vue, _public){

    var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 头部信息显示控件
    var loadingView = Vue.extend({
        template: '<div :class="[show ? \'\' : \'hide\' ]">\
                        <div class="loading-view">\
                            <div class="loading-icon">\
                                <div class="iconfont">&#xe636;</div>\
                            </div>\
                            <div class="loading-text">加载中...</div>\
                        </div>\
                    </div>',
        data: function() {
            return {};
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        computed: {
            show: function() {
                return data.loading;
            }
        }
    });
    Vue.component('loadingView', loadingView);

    return loadingView;
});

