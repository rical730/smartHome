/**
 * @file mock
 */
export const getroomdevice = {
    error: 0,
    data: {
        devices: [
            {
                deviceId: 1,
                imgName: "icon_colorLight",
                equipmentName: '智能灯',
                equipmentStatus: false,
                online: true,
                equipType: "smart_light",
                otherstatus: [
                    {
                        name: '亮度',
                        type: 'discreate',
                        options: ['强', '中', '弱'],
                        slots: [{ values: ['强', '中', '弱'] }],
                        value: '中'
                    },
                    {
                        name: '温度',
                        type: 'continues',
                        step: 1,
                        max: 100,
                        min: 0,
                        value: 35
                    }
                ]
            }
        ]
    }
}
