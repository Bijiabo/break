/**
 * Created by huchunbo on 16/6/4.
 */
define(function(){
    return {
        platform: 'aliSmart',
        debugView: false,
        viewData: [
            {
                type: 'switch',
                key: 'OnOff_Power',
                defaultValue:'0',
                value: {
                    on: '1',
                    off: '0'
                }
            },
            {
                type: 'switch',
                key: 'Child_Lock',
                defaultValue:'0',
                value: {
                    on: '1',
                    off: '0'
                },
                show: [
                    {
                        key: 'OnOff_Power',
                        equal:'1'
                    }
                ]
            },
            {
                type: 'grid',
                key: 'Mode',
                gridNum:'4',
                defaultValue:'1',
                title:'xxx模式',
                map:[
                    {
                        icon:'&#xe71a;',
                        txt:'披萨',
                        value:'1',
                    },
                    {
                        icon:'&#xe69d;',
                        txt:'蛋糕',
                        value:'2',
                    },
                    {
                        icon:'&#xe71b;',
                        txt:'酸奶',
                        value:'6',
                    },
                    {
                        icon:'&#xe719;',
                        txt:'面包',
                        value:'3',
                    },
                ],
                show: [
                    {
                        key: 'OnOff_Power',
                        equal:'1'
                    }
                ],
                updateValue: {
                    "0": [
                        {
                            key: 'Child_Lock',
                            equal: '1'
                        }
                    ]
                }
            },
            {
                type: 'grid',
                key: 'SubMode',
                gridNum:'4',
                defaultValue:'1',
                title:'xxx子模式',
                map:[
                    {
                        icon:'&#xe71a;',
                        txt:'披萨',
                        value:'1',
                    },
                    {
                        icon:'&#xe69d;',
                        txt:'蛋糕',
                        value:'2',
                    },
                    {
                        icon:'&#xe71b;',
                        txt:'酸奶',
                        value:'6',
                    },
                    {
                        icon:'&#xe719;',
                        txt:'面包',
                        value:'3',
                    },

                ],
                show: [
                    {
                        key: 'Mode',
                        //equal: '2',
                        in: ['1','2']
                    },
                    {
                        key: 'OnOff_Power',
                        equal:'1'
                    }
                ]
            },
            {
                type: 'powerButton',
                key: 'OnOff_Power',
                defaultValue:'0',
                map: {
                    on: '1',
                    off: '0'
                }
            },
            {
                type: 'slider',
                key: 'Temperature',
                title: 'this is slider title',
                min: 16,
                max: 36,
                step: 1,
                defaultValue:'25',
                show: [
                    {
                        key: 'OnOff_Power',
                        equal:'1'
                    }
                ],
                enable: [
                    {
                        key: 'Child_Lock',
                        equal:'0'
                    }
                ]
            }
        ],
        navigationBar: {

        }
    }
});