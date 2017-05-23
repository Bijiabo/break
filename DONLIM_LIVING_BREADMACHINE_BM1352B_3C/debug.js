define(['_sdk_alink'], function(__sdk){
	DA.uuid = 'xxx';
	return {
		init: function (){
			DA.loadPage = function(targetPath, obj) {
				console.log('obj-->' + obj);

				// if (!/^\./.test(targetPath)) {
				// 	targetPath = '.' + targetPath;
				// }

				var targetGetParams = '';
				for(var key in obj){
					var currentValue = obj[key];
					console.log(key, currentValue);
					if (targetGetParams.length === 0) {
						targetGetParams = key + '=' + currentValue;
					} else {
						targetGetParams = targetGetParams + '&' + key + '=' + currentValue;
					}
				}
				if (targetGetParams.length > 0) {
					targetGetParams = '?' + targetGetParams;
				}
				location.href = targetPath + targetGetParams;
			}

			window.__data = {
				Color : {value : '0'},
				// Custom_Steps : {value : '0'},
				ErrorCode : {value : '0'},
				KG_Cancel : {value : '0'},
				// KG_Start : {value : '0'},
				MSGType : {value : '0'},
				Ref_WF : {value : '0'},
				Reserve : {value : '0'},
				// StepWorkMode : {value : '0'},
				StopStatus : {value : '0'},
				TM_Finish : {value : '180'},
				WarmTM : {value : '0'},
				Weight : {value : '1'},
				WF : {value : '8'},
				WF_CurrentStep : {value : '2'},
				// WF_TimeLeft : {value : '0'},
				WorkMode : {value : '0'},
				WorkStatus : {value : '0'},
				WorkTime : {value : '10'}
				// WorkTime_Left : {value : '0'},
			};

			DA.getDeviceStatus = function(uuid, callback) {
				setTimeout(function(){
					callback(__data);
				}, 200);
			};

    		// 模拟发送设备数据到 app 端内的 HTML5
    		window.__updateDeviceStatus = function() {
        		__sdk.sendApp('deviceStatusChange', __data);
    		};
		}
	}

})