/**
 * Created by huchunbo on 16/6/4.
 */
requirejs(['./upt.js', './viewConfig', './debug'], function(upt, viewConfig, debug) {
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
                url: './work/app.html',
                params: {},
                condition: function(data, context) {
                    var shouldLoadPage = workStatusManager.isWorking;
                    return shouldLoadPage;
                }
            }
        ],
        
    };
    // data.loading = false;
    debug.init();
    
    upt.init(config);
});