<template>
  <div>
    <common-header :header-title="headerTitle"/>
    <div style="height: 2.3rem"></div>
    <!---------------------------->
    <!--<p>温度：{{temperature}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;湿度：{{wetDegree}}%</p>-->
    <!--<p>煤气浓度：{{coalDegree}}%&nbsp;&nbsp;&nbsp;光照强度：{{lightDegree}}</p>-->
    <div class="addEquipment" v-cloak>
      <div class="imgcard">
         <!--  <div class="container">
          <table class="table">
            <thead>
            <tr>
              <th>室内温度</th>
              <th>室内湿度</th>
              <th>煤气浓度</th>
              <th>光照强度</th>
              <th>门状态</th>
              <th>客厅窗户状态</th>
              <th>卧室窗户状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="coalDegree === ''&& temperature ===''&&wetDegree===''
            &&coalDegree===''&&doorStatus===''&&window1Status === ''&&window2Status ===''">
              <th  colspan="7">暂时没有数据,请检查下设备是否开了哦</th>
            </tr>
            <tr v-else>
              <th v-if="temperature=== ''"></th>
                <th v-else>{{temperature}}℃</th>
              <th v-if="wetDegree === ''"></th>
                <th v-else>{{wetDegree}}%</th>
              <th v-if="coalDegree === ''"></th>
                <th v-else>{{coalDegree}}%</th>
              <th v-if="lightDegree === ''"></th>
               <th v-else>{{lightDegree}}%</th>
              <th>{{doorStatus}}</th>
              <th>{{window1Status}}</th>
              <th>{{window2Status}}</th>
            </tr>

            </tbody>
          </table>
        </div> -->
      </div>
      <div class="aui-grids-box" v-cloak>
        <div class="aui-grids-item" v-for="(item,index) in devicesData" :key="index">
          <router-link :to="{path:'EquipmentDetail',query:{device_id: item.device_id}}">
            <div class="aui-grids-item-hd">
              <img :src="imgDict[item.device_type]" alt="DJun">
            </div>
            <br/>
            <div class="aui-grids-item-bd">
              {{item.device_name}}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!---------------------------->
    <div>
      <!--popup-transition="popup-fade"-->
      <mt-popup style="background-color: white" v-model="addPopupVisible" position="right" class="mint-popup-3"
            :modal="false">
        <div v-if="equipmentName==='活体检测'">
          <!-- <div >
            <h3 class="modal-header modal-title">{{equipmentName}}</h3>
          </div>
          <div style="height: 4rem"></div>
          <div class="modal-body modal-content">
            <span style="width: 100%">当前客厅<span style="color: red;">{{liveScan}}</span></span>
          </div>
          <mt-button @click.native="addPopupVisible = false" size="large" type="primary">退出</mt-button> -->
        </div>
        <div v-else>
          <div>
            <h3 class="modal-header modal-title" style="display:flex;">
              <!-- <mt-button @click.native="addPopupVisible = false" size="large" type="primary">返回</mt-button> -->
              <mt-button icon="back" @click.native="addPopupVisible = false"></mt-button>
              <span style="flex-grow: 1;padding-left: 10px">{{oneDeviceData.equipmentName}}</span>
              <mt-button icon='more' @click.native="showSetting(oneDeviceData)"></mt-button>
            </h3>
          </div>
          <div style="height: 4rem"></div>
          <div class="modal-body modal-content">
            <span style="width: 100%">常规状态</span>
            <mt-cell title="在线">{{oneDeviceData.online ? '是' : '否'}}</mt-cell>
            <mt-cell title="设备开关"><mt-switch v-model="oneDeviceData.equipmentStatus"></mt-switch></mt-cell>
          </div>
          <div style="height: 4rem"></div>
          <div class="modal-body modal-content">
            <span style="width: 100%">附加状态</span>
            <div v-for="(item, index) in oneDeviceData.otherstatus" :key="index">
              <div v-if="item.type==='discreate'">
                <mt-cell :title="item.name">
                  <!-- <mt-picker :slots="mytest" @change="pikerValuesChange"></mt-picker> -->
                  <mt-picker
                    :slots="computedSlots(item)" 
                    :visible-item-count="3" 
                    @change="pickerChange"
                  ></mt-picker>
                </mt-cell>
              </div>
              <!-- <div v-if="item.type==='continues'"></div> -->
              <div v-if="item.type==='continues'">
                <mt-cell :title="item.name">{{item.value}}</mt-cell>
                <mt-range
                  v-model="item.value"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                  :bar-height="5">
                </mt-range>
              </div>
            </div>
          </div>
          <div v-if="editing===true"><mt-button size="large" type="primary">确定修改</mt-button></div>
          
        </div>
      </mt-popup>
      <!-- 修改基本信息 如名称 删除设备等 -->
      <mt-popup style="background-color: white" v-model="settingVisible" position="right" class="mint-popup-3"
            :modal="false">
        <div>
          <div>
            <h3 class="modal-header modal-title" style="display:flex;">
              <!-- <mt-button @click.native="addPopupVisible = false" size="large" type="primary">返回</mt-button> -->
              <mt-button icon="back" @click.native="settingVisible = false"></mt-button>
              <span style="flex-grow: 1;padding-left: 10px">设置</span>
              <mt-button icon='back' style="opacity: 0"></mt-button>
            </h3>
          </div>
          <div class="page">
            <mt-cell title="设备名称" :value="deviceName" is-link @click.native="changeName(deviceName)"></mt-cell>
          </div>
          <div style="margin: 15px;">
            <mt-button type="danger" size='large' @click.native="deleteDevice(deviceId)">删除设备</mt-button>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import CommonHeader from "../../../common/Header"
  import {getRoomDevices} from '../../../../model/index';
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    name: "CustomerEquipment",
    data() {
      return {
        devicesData: [],
        oneDeviceData: {},
        visible: this.popupVisible,
        // 基础信息展示界面
        addPopupVisible: false,
        // 设置界面
        settingVisible: false,
        // 选中需要修改名称的设备
        deviceName: '',
        // 选中删除的设备id
        deviceId: '',
        equipType: 0,
        editing: false,
        // 1. 智能灯
        // 2. 台灯
        // 3. 窗户
        // 4. 空调
        // 5. 温控器
        // 6. 智能插座
        equipmentName: '',
        equipmentStatus: false,
        online: false,
        otherstatus: {},
        imgDict: {
          "icon_airCheack": require('../../../../assets/image/equipmentImages/icon_airCheack.png'), // 空气检测仪
          "icon_waterClean": require('../../../../assets/image/equipmentImages/icon_waterClean.png'), // 净水器
          "icon_security": require('../../../../assets/image/equipmentImages/icon_security.png'), // 安防
          "icon_socket": require('../../../../assets/image/equipmentImages/icon_socket.png'), // 智能插座
          "icon_gateway": require('../../../../assets/image/equipmentImages/icon_gateway.png'), // 智能网关
          "icon_dry": require('../../../../assets/image/equipmentImages/icon_dry.png'), // 除湿器
          "icon_temp": require('../../../../assets/image/equipmentImages/icon_temp.png'), // 温控器
          "icon_heatPump": require('../../../../assets/image/equipmentImages/icon_heatPump.png'), // 热泵
          "icon_pressureCooker": require('../../../../assets/image/equipmentImages/icon_pressureCooker.png'), // 电压力锅
          "icon_doorLock": require('../../../../assets/image/equipmentImages/icon_doorLock.png'), // 智能门锁
          "icon_switch": require('../../../../assets/image/equipmentImages/icon_switch.png'), // 面板开关
          "icon_mirror": require('../../../../assets/image/equipmentImages/icon_mirror.png'), // 智能魔镜
          "icon_colorLight": require('../../../../assets/image/equipmentImages/icon_colorLight.png'), // 彩灯
          "small_light": require('../../../../assets/image/equipmentImages/icon_light.png'), // 色温灯
          "icon_lights": require('../../../../assets/image/equipmentImages/icon_lights.png'), // 灯带
          "icon_smokeAlarm": require('../../../../assets/image/equipmentImages/icon_smokeAlarm.png'), // 烟雾报警器
          "icon_circle": require('../../../../assets/image/icon_circle.png'), // 窗帘
        },
        // index1: false, // 空气检测仪
        // index2: false, // 智能插座
        // index3: false, // 门的状态
        // index4: false, // 活体检测
        // index5: false, // 温控器
        // index6: false, // 卧室灯=>智能灯
        // index7: false, // 客厅灯=>台灯1
        // index8: false, // 次卧灯=>台灯2
        // index9: false, // 窗户1状态
        // index10: false, // 窗户2状态
        // index11: false, // 厨房灯
        // index12: false, // 全部灯
        // // 温度
        // temperature: '',
        // // 光照强度
        // lightDegree: '',
        // // 湿度
        // wetDegree: '',
        // // 煤气浓度
        // coalDegree: '',
        // // 门的状态
        // doorStatus:'',
        // // 窗户1的状态 客厅
        // window1Status:'',
        // // 窗户2的状态 卧室
        // window2Status:'',
        // // 活体检测
        // liveScan:''
      }
    },
    props: ['popupVisible'],
    created() {
      getRoomDevices(this.roomId).then(data => this.devicesData = data.result);
    },
    computed: {
      gridsData () {
        return this.devicesData.devices || [];
      },
      headerTitle() {
        return (this.devicesData.room_name || '房间') + "的设备";
      },
      roomId() {
        return this.$route.query.room_id;
      }
    },
    components: {
      CommonHeader
    },
    methods: {
      showSetting(oneDeviceData) {
        this.settingVisible = true;
        this.deviceName = oneDeviceData.equipmentName;
        this.deviceId = oneDeviceData.deviceId;
      },
      deleteDevice(deviceId) {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        }).then(({ value, action }) => {

        });
      },
      changeName(val) {
        MessageBox.prompt(val, '请输入名称').then(({ value, action }) => {
          if (action === 'confirm') {
            Indicator.open('加载中...');
            setTimeout(() => {
              this.deviceName = value;
              Indicator.close();
            }, 1500);
          }
        });
      },
      computedSlots(item) {
        return [{
          values: item.options,
          defaultIndex: item.options.indexOf(item.value)
        }];
      },
      // setTimer() {
      //     this.timer = setInterval( () => {
      //         this.requestService("现在多热");
      //         this.requestService("现在光照强度");
      //         this.requestService("现在湿度");
      //         this.requestService("煤气浓度");
      //         this.requestService("现在客厅窗户的状态");
      //         this.requestService("现在卧室窗户的状态");
      //         this.requestService("现在门的状态");
      //         this.requestService("客厅有人吗");
      //     }, 3000)

      // },
      modalControl(deviceData) {
        this.oneDeviceData = deviceData;
        this.addPopupVisible = true;
      },
      poweronoff(deviceId) {
      },
      pickerChange(picker, values) { 
        console.log(picker, values)
      }
      /**
       * 1.现在多热（温度）
       * 2.现在光照强度/湿度
       * 3.现在烟雾浓度
       * 4.煤气浓度
       * 5.打开过道灯
       * 6.打开客厅灯
       * 7.打开卧室灯
       * 8.打开厨房灯
       * 9.打开全部灯
       * @param direction 以上指令
       */
      // requestService(direction) {
      //     let that = this;
      //     // console.log(direction);
      //     this.$http.get(this.postUrl, {
      //         params: {
      //             "a": direction
      //         }
      //     }).then(function (response) {
      //         if (direction === "现在多热") {
      //             that.temperature = response.data;
      //         } else if (direction === "现在光照强度") {
      //             that.lightDegree = response.data;
      //         } else if (direction === "现在湿度") {
      //             that.wetDegree = response.data;
      //         } else if (direction === "煤气浓度") {
      //             that.coalDegree = response.data;
      //         } else if(direction === "现在客厅窗户的状态"){
      //             if (response.data === "现在客厅的窗户是开着的"){
      //                 that.window1Status = "开";
      //             } else{
      //                 that.window1Status = "关";
      //             }
      //         }else if (direction === "现在卧室窗户的状态") {
      //             if (response.data === "现在卧室窗户是开着的"){
      //                 that.window2Status = "开";
      //             } else{
      //                 that.window2Status = "关";
      //             }
      //         }else if (direction === "现在门的状态") {
      //             if (response.data === "现在门是开着的"){
      //                 that.doorStatus = "开";
      //             } else{
      //                 that.doorStatus = "关";
      //             }
      //         }else if(direction === "客厅有人吗"){
      //             if (response.data === "当前客厅没人")
      //                 that.liveScan ="有人";
      //              else
      //                 that.liveScan = "没人";
      //         } else{
      //             that.resData = response.data;
      //         }
      //     });
      // }

    },
  }
</script>

<style scoped>
  @import url("../../../../assets/css/equip_style.css");

  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

/*  .mint-popup-3 .mint-button {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 5%;
  }*/

  .imgcard {
    margin: 2.3rem auto;
    background-color: #FF8C00;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
  }

  .container {
    padding: 10px;
  }
</style>
