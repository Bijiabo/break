/**
 * Created by huchunbo on 2017/2/17.
 */
define(['./js/manager/helperManager'], function(helper) {

    //温馨提示时间同步
    helper.addFunction(
        'syncTime',
        function(data) {
            var formatTime = data.WorkTime;
            var hourTime = Math.floor(formatTime / 60);
            var minuteTime = formatTime % 60; // todo: xxx
            if (formatTime >= 60) {
                if (minuteTime == 0) {
                    return '温馨提示：制作时间需' + hourTime + '小时'
                }
                return '温馨提示：制作时间需' + hourTime + '小时' + minuteTime + '分钟';
            } else {
                return '温馨提示：制作时间需' + minuteTime + '分钟';
            }
        }
    )

    helper.addFunction(
        'formatTimeTo_XX_XX',
        function(data, params) {
            var currentTime = params[0];
            var left = Math.floor(currentTime / 60),
                right = currentTime % 60;

            var addZero = function(value) {
                return Number(value) > 9 ? value : '0' + value;
            };

            left = addZero(left);
            right = addZero(right);

            return left + ':' + right;
        }
    );

});