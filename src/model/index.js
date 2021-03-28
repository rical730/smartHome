/**
 * @file model
 */

import Axios from "axios";
import {getroomdevice} from '../mock/getroomdevice';
import {getroomdevices} from '../mock/getroomdevices';
import {getroomsinfo} from '../mock/getroomsinfo';

const HOST = 'https://test.baidu.com';
const MOCK = true;
export function getDeviceDetail(id) {
    if (MOCK) {
        return Promise.resolve(getroomdevice);
    }
    return Axios.get(HOST + '/api/getroomdevice', {
        data: {
            deviceId: id,
        }
    });
}

export function getRoomDevices(id) {
    if (MOCK) {
        return Promise.resolve(getroomdevices);
    }
    return Axios.get(HOST + '/api/getroomdevices', {
        htype: 'get_info',
        room_id: id,
    });
}

export function getRoomsInfo() {
    if (MOCK) {
        return Promise.resolve(getroomsinfo);
    }
    return Axios.get(HOST + '/api/room_handler', {
        htype: 'get_info',
    });
}
