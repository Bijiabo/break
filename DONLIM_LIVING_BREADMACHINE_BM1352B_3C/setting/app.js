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
                type: 'load',
                url: '/work/app.html',
                condition: function(data) {
                    if ( Number(data.WorkStatus) > 0) {
                        return true;
                    }
                    return false;
                }
            }
        ]
    };
    // data.loading = false;
    debug.init();

    upt.init(config);
});