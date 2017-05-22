define(['./getModeComponent', './getModeKey'], function(generateComponent, keys) {
	var modeConfig = {
		'2': {
			title: '快速面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.Temp_Hold]
		},
		'3': {
			title: '标准面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.WorkTime]
		},
		'4': {
			title: '法式面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'5': {
			title: '粗粮面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'6': {
			title: '大米面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'7': {
			title: '米粉面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'8': {
			title: '低糖面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'9': {
			title: '意式面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'10': {
			title: '甜味面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3),
				generateComponent.heightSetter(),
				generateComponent.heightSetter()
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'11': {
			title: '标准无糖面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3)
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'12': {
			title: '松软无糖面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3)
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'13': {
			title: '严寒无糖面包',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
				generateComponent.weightSetter(3)
			],
			appointment: true, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'14': {
			title: '标准蛋糕',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'15': {
			title: '意式蛋糕',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.roastColorSetter(0, 2, 1),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'16': {
			title: '肉松',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'17': {
			title: '果酱',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'18': {
			title: '年糕',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'19': {
			title: '酸奶',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(6, 12, 8, 1),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'20': {
			title: '泡菜',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(24, 48, 36, 1),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'21': {
			title: '酵素',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(72, 168, 72, 1)
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'22': {
			title: '米酒',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(24, 96, 1, 1)
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'23': {
			title: '葡萄酒',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'24': {
			title: '和面',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(10, 20, 10, 1, '', 'minute'),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'25': {
			title: '意式和面',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'26': {
			title: '披萨面团',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'27': {
			title: '发面',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'28': {
			title: '烘烤',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(10, 60, 10, 1, '', 'minute'),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'29': {
			title: '发酵解冻',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(1, 120, 60, 1, '', 'minute'),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'30': {
			title: '翻炒干货',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.workTimeSetter(45, 90, 45, 1, '', 'minute'),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
		'31': {
			title: '自定义菜单',
			viewData: [
				generateComponent.imageSetter(),
				generateComponent.promptSetter(),
				generateComponent.customList( '&#xe614;','搅拌1', '10分钟', "&#xe617;"),
				generateComponent.customList( '&#xe623;','发酵1', '10分钟', "&#xe617;"),
				generateComponent.customList( '&#xe614;','搅拌2', '10分钟', "&#xe617;"),
				generateComponent.customList( '&#xe623;','发酵2', '10分钟', "&#xe617;"),
				generateComponent.customList( '&#xe614;','搅拌3', '10分钟', "&#xe617;"),
				generateComponent.customList( '&#xe623;','发酵3', '10分钟', "&#xe617;"),
				generateComponent.customList( '&#xe60c;','烘烤', '10分钟', "&#xe617;"),
			],
			appointment: false, // 支持预约功能
			keys: [keys.PowerMode, keys.WorkTime]
		},
	};
	return modeConfig;
})