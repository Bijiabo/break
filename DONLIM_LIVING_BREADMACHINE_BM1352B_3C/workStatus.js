/**
 * Created by huchunbo on 2017/2/16.
 */
define(['./js/manager/workStatusManager'], function (workStatus) {
    workStatus.add(
        'isWorking',
        function (data) {
            return true
        }
    );
    
    workStatus.add(
        'isWorkDone',
        function (data) {
            return true
        }
    );

    workStatus.add(
        'isStandby',
        function (data) {
            return true
        }
    );
    
    workStatus.add(
        'canStartWork',
        function (data) {
            return true
        }
    );
    
    workStatus.add(
        'isPreparingHeat',
        function (data) {
            return true
        }
    );
    
    workStatus.add(
        'shouldAutoCountDownTime',
         function (data) {
             return true
         }
    );
    
});