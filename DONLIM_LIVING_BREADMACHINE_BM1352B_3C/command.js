/**
 * Created by huchunbo on 2017/2/16.
 */
define(['./js/manager/commandManager'], function (command) {

    // 测试指令
    
    command.add('start', {
        KG_Action: '1'
    });

    command.add('stop', {
        KG_Action: '0'
    });

    // 设定普通模式启动指令

    // 启动 卸妆模式
    command.add('start_work_1', {
        WorkMode: '1',
        // KG_Action: '1',
        WF: {
            extra: {
                StepNum: '2',
                Type: '1',
                Steps: [
                    {
                        Action: {
                            Type: '1', // 热喷
                            WorkTime: '180'
                        },
                        ID: '1'
                    }
                ]
            }
        }
    });

    // 启动 深层补水
    command.add('start_work_2', {
        WorkMode: '2',
        // KG_Action: '1',
        WF: {
            extra: {
                StepNum: '2',
                Type: '1',
                Steps: [
                    {
                        Action: {
                            Type: '1',
                            WorkTime: '300'
                        },
                        ID: '1'
                    },
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '300'
                        },
                        ID: '2'
                    }
                ]
            }
        }
    });

    // 启动 肌肤 SPA
    command.add('start_work_3', {
        WorkMode: '3',
        // KG_Action: '1',
        WF: {
            extra: {
                StepNum: '2',
                Type: '1',
                Steps: [
                    {
                        Action: {
                            Type: '1',
                            WorkTime: '360'
                        },
                        ID: '1'
                    },
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '180'
                        },
                        ID: '2'
                    }
                ]
            }
        }
    });

    // 启动 晒后恢复
    command.add('start_work_4', {
        WorkMode: '4',
        // KG_Action: '1',
        WF: {
            extra: {
                StepNum: '3',
                Type: '1',
                Steps: [
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '480'
                        },
                        ID: '1'
                    }
                ]
            }
        }
    });

    // 启动 敏感肌肤护理
    command.add('start_work_5', {
        WorkMode: '5',
        // KG_Action: '1',
        WF: {
            extra: {
                StepNum: '2',
                Type: '1',
                Steps: [
                    {
                        Action: {
                            Type: '3',
                            WorkTime: '180'
                        },
                        ID: '1'
                    },
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '180'
                        },
                        ID: '2'
                    }
                ]
            }
        }
    });

    // 启动 控油模式
    command.add('start_work_6', {
        WorkMode: '6',
        WF: {
            extra: {
                StepNum: '6',
                Type: '1',
                Steps: [
                    {
                        Action: {
                            Type: '1',
                            WorkTime: '180'
                        },
                        ID: '1'
                    },
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '60'
                        },
                        ID: '2'
                    },
                    {
                        Action: {
                            Type: '1',
                            WorkTime: '120'
                        },
                        ID: '3'
                    },
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '30'
                        },
                        ID: '4'
                    },
                    {
                        Action: {
                            Type: '1',
                            WorkTime: '120'
                        },
                        ID: '5'
                    },
                    {
                        Action: {
                            Type: '2',
                            WorkTime: '30'
                        },
                        ID: '6'
                    }
                ]
            }
        }
    });
    
    // 设定高级模式启动指令
    
    // 面膜模式
    command.add(
        'start_work_mask',
        {
            WorkMode: '9',
            // KG_Action: '1'
        },
        [],
        function (packagedData, data) { //customPackageFunction
            packagedData.WF = {
                extra: {
                    StepNum: '3',
                    Type: '1',
                    Steps: [
                        {
                            Action: {
                                Type: '1',
                                WorkTime: '180'
                            },
                            ID: '1'
                        },
                        {
                            Action: {
                                Type: '4',
                                WorkTime: String(Number(data._WorkTime) * 60)
                            },
                            ID: '2'
                        },
                        {
                            Action: {
                                Type: '2',
                                WorkTime: '180'
                            },
                            ID: '3'
                        }
                    ]
                },
                value: '1'
            };
            return packagedData;
        }
    );

    command.add(
        'start_work_diy',
        {
            WorkMode: '7',
            // KG_Action: '1'
        },
        [],
        function (packagedData, data) { //customPackageFunction
            packagedData.WF = {
                extra: {
                    StepNum: '1',
                    Type: '1',
                    Steps: [
                        {
                            Action: {
                                Type: data.diy_type,
                                WorkTime: String(Number(data._WorkTime) * 60)
                            },
                            ID: '1'
                        }
                    ]
                },
                value: '1'
            };
            return packagedData;
        }
    );

});