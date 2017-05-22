/*
	各种模式的所有组件，不包括公用组件
*/
define(['./getModeKey','./../helper'], function(keys) {
	var generateComponent = {
		// 添加头部展示图组件
		imageSetter: function() {
			return {
				type: 'productImage',
				url: 'image/xxx.jpg'
			};
		},
		// 添加温馨提示组件
		promptSetter: function() {
			return {
				type: 'promptCell',
				content: '温馨提示：制作时间需',
				contentPackageFunction: function(data) {
					return helperManager.syncTime(data)		
				}
			};
		},
		//添加中间间隔层组件
		heightSetter: function(height, backgroundColor) {
			return {
				type: 'separator-view',
				height: height || '20px',
				backgroundColor: backgroundColor || 'none',
				show: true,
				enable: true
			}
		},
		// 添加烤色选择组件
		roastColorSetter: function(min, max, defaultValue, title) {
			return {
				type: 'serialPipSlider',
				sync: false,
				key: keys.Color,
				title: title || '烤色选择',
				min: min,
				max: max,
				step: 1,
				defaultValue: defaultValue.toString(),
				unit: ' ',
				labelForValue: function(value, unit) {
					return ['浅色', '中色', '深色'][value];
				},
				serialMode: false,
				optimizeTitleStyle: true,
				didChange: function(data, context) {
					context.$set('data._didOpenModel', false);
				}
			};
		},
		// 添加质量选择组件
		weightSetter: function(length, title) {

			return {
				type: 'grid',
				key: keys.Weight,
				gridNum: length,
				defaultValue: '1',
				title: title || '分量选择',
				sync: false,
				map: [{
					txt: '500g',
					value: '1',
				}, {
					txt: '750g',
					value: '2',
				}, {
					txt: '1000g',
					value: '3',
				}]
			}
		},
		// 添加设置制作时长组件
		workTimeSetter: function(min, max, defaultValue, step, title, unit) {
			return {
				title: title || '制作时间',
				defaultValue: defaultValue.toString(),
				key: keys.WorkTime,
				type: 'timePicker',
				unit: unit || 'hour',
				min: min,
				max: max,
				step: step || 1,
				system12: false,
				stringValue: true
			}
		},
		//添加自定义组件
		singleCell : function(title, leftIcon){
			return {
				type: 'singleCell',
            	title: title,
            	after: '',
            	leftIcon: leftIcon,
            	rightIcon: "&#xe617;",
            	onItemClick: function(data){

            	}
			}
		},
		// 添加自定义组件
		customList : function(leftIcon, title, rightTime, rightIcon){
			return {
				type: 'customList',
				leftIcon: leftIcon,
				title: title,
				rightTime: rightTime,
				rightIcon: rightIcon
			}
		}
	};
	return generateComponent;
})