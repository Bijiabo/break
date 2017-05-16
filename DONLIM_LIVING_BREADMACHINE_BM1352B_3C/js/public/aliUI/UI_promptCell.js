/**
 * Create by changyuanhua on 2017/4/25
 */

define(['./../vue', './public'], function(Vue, _public){
	var ComponentName = _public.ComponentName;
    var publicComputed = _public.publicComputed;

    // 提示控件

    var PromptCell = Vue.extend({
     	template: '<div :class="[show ? \'\' : \'hide\']" :e="enable">\
     			  		<div class="prompt-cell">\
							<div class="content">\
                                {{{content}}}\
							</div>\
     			  		</div>\
     			  </div>',

        data: function(){
            return {
            }
        },
        props: ['index', 'itemData', 'currentValue', 'data'],
        methods: {},
        computed: {
            show: function() {
                return publicComputed.show(this);
            },
            enable: function() {
                return publicComputed.enable(this);
            },
            content: function() {
                var controlTime = this.itemData.controlTime;
                return controlTime(this.data);
            }
        }
    });
    Vue.component('promptCell', PromptCell);

    return PromptCell;
})