/**
 * Created by huchunbo on 2017/2/16.
 */
define(['./js/manager/workStatusManager'], function (workStatus) {
    workStatus.add(
        'isWorking',
        function (data) {
            return Number(data.WorkStatus) > 0;
        }
    );
    
    workStatus.add(
        'isWorkDone',
        function (data) {
            return ['5', '253', '254', '255'].indexOf(data.WorkStatus) >= 0;
        }
    );

    workStatus.add(
        'isStandby',
        function (data) {
            return data.WorkStatus === '0' || data.WorkStatus === '';
        }
    );
    
    workStatus.add(
        'canStartWork',
        function (data) {
            return data.WorkStatus === '0' || data.WorkStatus === '' || data.WorkMode === '8';
        }
    );
    
    workStatus.add(
        'isPreparingHeat',
        function (data) {
            return data.WorkStatus === '1';
        }
    );
    
    workStatus.add(
        'shouldAutoCountDownTime',
         function (data) {
             return workStatusManager.isWorking && ['6','8', '9'].indexOf(data.WorkStatus) < 0;
         }
    );
    
});