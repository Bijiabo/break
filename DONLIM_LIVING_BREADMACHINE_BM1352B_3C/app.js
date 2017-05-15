/**
 * Created by huchunbo on 16/6/4.
 */
requirejs(['./upt.js', './viewConfig'], function(upt, viewConfig) {
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
    data.loading = false
    
    upt.init(config);
});