/**
 * Created by huchunbo on 16/6/4.
 */
requirejs(['./../upt.js', './viewConfig', './../debug'], function(upt, viewConfig, debug) {
    var config = {
        platform: 'aliSmart',
        debugView: false,
        sendAllData: false,
        customFont: true,
        viewData: viewConfig,
        navigationBar: {

        },
        direction: [
            {
                type: 'back',
                url: 'deviceHome',
                params: {},
                condition: function(data) {
                    var statusThatShouldDirectToWorkingPage = ['0'];
                    if ( statusThatShouldDirectToWorkingPage.indexOf(data.WorkStatus) >= 0) {
                        return true;
                    }
                    return false;
                }
            }
        ],
        bodyBackgroundColor: '#ffffff'
    };

    // data.loading = false;
    debug.init();

    upt.init(config);
});