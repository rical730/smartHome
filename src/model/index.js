/**
 * @file model
 */

import Axios from "axios";
import {getroomdevice} from '../mock/getroomdevice';

const HOST = 'https://test.baidu.com';
const MOCK = true;
export function getRoomDevice(id) {
    if (MOCK) {
        return Promise.resolve(getroomdevice);
    }
    return Axios.get(HOST + '/api/getroomdevice', {
        data: {
            deviceId: id,
        }
    });
}
