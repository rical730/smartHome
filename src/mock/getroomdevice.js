/**
 * @file mock
 */
export const getroomdevice = {
    status: 0,
    msg: '',
    result: {
        device_name: "智能灯",
        device_type: 'small_light',
        online: true,
        power: true,
        other_param: [
            {
                "name": "light",
                "slots": [
                    "high",
                    "middle",
                    "low"
                ],
                "type": "Discreate",
                "value": "middle"
            },
            {
                "name": "tempreture",
                "step": 1,
                "type": "Continuous",
                "value": 26,
                "vmax": 16,
                "vmin": 30
            }
            // {
            //     name: '亮度',
            //     type: 'discreate',
            //     options: ['强', '中', '弱'],
            //     slots: [{ values: ['强', '中', '弱'] }],
            //     value: '中'
            // },
            // {
            //     name: '温度',
            //     type: 'continues',
            //     step: 1,
            //     max: 100,
            //     min: 0,
            //     value: 35
            // }
        ]
    }
}
