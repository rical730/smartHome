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
        <div class="aui-grids-item" v-for="(item,index) in gridsData" :key="index">
          <div class="aui-grids-item-hd" @click="modalControl(index)">
            <img :src="imgDict[item.imgName]" alt="DJun">
          </div>
          <br/>
          <div class="aui-grids-item-bd">
            {{item.equipmentName}}   {{index}}
          </div>
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
            <h3 class="modal-header modal-title">
              <!-- <mt-button @click.native="addPopupVisible = false" size="large" type="primary">返回</mt-button> -->
              <mt-button slot="left" icon="back" @click.native="addPopupVisible = false"></mt-button>
              {{equipmentName}} id:{{deviceid}}
            </h3>
          </div>
          <div style="height: 4rem"></div>
          <div class="modal-body modal-content">
            <span style="width: 100%">常规状态</span>
            <mt-cell title="在线">{{online}}</mt-cell>
            <mt-cell title="设备开关"><mt-switch v-model="equipmentStatus"></mt-switch>{{equipmentStatus}}</mt-cell>
          </div>
          <div class="modal-body modal-content">
            <span style="width: 100%">附加状态</span>
            <div v-for="(item,index) in specialStatus" :key="index">
              <div v-if="item.type==='discreate'">
                <mt-cell :title="index">
                  <!-- <mt-picker :slots="mytest" @change="pikerValuesChange"></mt-picker> -->
                  <mt-picker :slots="item.slots" @change="((val)=>{changeStatus(val, index)})" :visible-item-count="2" :valueKey="item.value"></mt-picker>
                </mt-cell>
              </div>
              <div v-if="item.type==='continues'"><mt-cell :title="index">{{item.value}}</mt-cell></div>
            </div>
          </div>
          
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import CommonHeader from "../../../common/Header"

  export default {
    name: "CustomerEquipment",
    data() {
      return {
        resData: '',
        headerTitle: '',
        postUrl: 'http://192.168.0.3:8886/add',
        visible: this.popupVisible,
        roomName: '',
        addPopupVisible: false,
        deviceid: '',
        equipType: 0,
        // 1. 智能灯
        // 2. 台灯
        // 3. 窗户
        // 4. 空调
        // 5. 温控器
        // 6. 智能插座
        equipmentName: '',
        equipmentStatus: false,
        online: false,
        specialStatus: {},
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
          "icon_light": require('../../../../assets/image/equipmentImages/icon_light.png'), // 色温灯
          "icon_lights": require('../../../../assets/image/equipmentImages/icon_lights.png'), // 灯带
          "icon_smokeAlarm": require('../../../../assets/image/equipmentImages/icon_smokeAlarm.png'), // 烟雾报警器
          "icon_circle": require('../../../../assets/image/icon_circle.png'), // 窗帘
        },
        allData:{
          '客厅':{
            "light1": {
              imgName: "icon_light",
              equipmentName: '台灯1',
              equipmentStatus: true,
              online: true,
              equipType: "light",
              otherstatus: {}
            },
            "light3": {
              imgName: "icon_colorLight",
              equipmentName: '智能灯',
              equipmentStatus: false,
              online: true,
              equipType: "smart_light",
              otherstatus: {
                '亮度': {
                  type: 'discreate',
                  slots: [{values: ['强','中','弱']}],
                  value: '强'
                },
                '温度': {
                  type: 'continues',
                  step: 1,
                  max: 30,
                  min: 16,
                  value: 25
                }
              }
            },
            "air1": {
              imgName: "icon_airCheack",
              equipmentName: '空调',
              equipmentStatus: false,
              online: true,
              equipType: "air",
              otherstatus: {}
            }
          },
          '主卧室':{
            "light2": {
              imgName: "icon_colorLight",
              equipmentName: '智能灯',
              equipmentStatus: false,
              online: true,
              equipType: "smart_light",
              otherstatus: {}
            },
            "socket1": {
              imgName: "icon_socket",
              equipmentName: '智能插座',
              equipmentStatus: false,
              online: true,
              equipType: "smart_socket",
              otherstatus: {}
            },
            "circle2": {
              imgName: "icon_circle",
              equipmentName: '窗户',
              equipmentStatus: false,
              online: true,
              equipType: "circle",
              otherstatus: {}
            }
          }
        },
        // gridsData: [], //需要再computed中定义
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
    mounted() {
      this.getRouteParam();
      // this.setTimer();
      this.roomName = this.$route.query.roomName;
      console.log("roomName: ", this.roomName)
    },
    computed: {
      gridsData () {
        return this.allData[this.$route.query.roomName]
      },
      // specialStatus () {
      //   return this.allData[this.$route.query.roomName][this.deviceid].otherstatus
      // }
    },
    components: {
      CommonHeader
    },
    methods: {
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
      getRouteParam() {
        this.headerTitle = this.$route.query.roomName + "的设备";
      },
      modalControl(deviceid) {
        this.deviceid = deviceid;
        this.specialStatus = this.allData[this.$route.query.roomName][this.deviceid]["otherstatus"]
        // console.log('specialStatus:', this.specialStatus)
        this.equipmentName = this.allData[this.$route.query.roomName][this.deviceid]["equipmentName"];
        this.equipType = this.allData[this.$route.query.roomName][this.deviceid]["equipType"];
        this.equipmentStatus = this.allData[this.$route.query.roomName][this.deviceid]["equipmentStatus"];
        this.online = this.allData[this.$route.query.roomName][this.deviceid]["online"]
        this.addPopupVisible = true
      },
      poweronoff(deviceid) {
      },
      changeStatus(val, key) { 
        // console.log('=======', key,val.getValues())
        // selected_val = val.getValues()
        if(val.getValues()[0] != undefined)
          console.log(val.getValues()[0])
          this.allData[this.$route.query.roomName][this.deviceid]["otherstatus"][key]["value"] = val.getValues()[0]
          // console.log('====', this.allData[this.$route.query.roomName][this.deviceid]["otherstatus"][key])
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
    watch: {
      equipmentStatus: function () {
        let that = this;

        // status = that.allData[that.roomName][that.deviceid]["equipmentStatus"];
        console.log("deviceid: ", that.deviceid);
        console.log("equipmentStatus: ", that.equipmentStatus)
        that.allData[that.roomName][that.deviceid]["equipmentStatus"] = that.equipmentStatus // test lkj
        // console.log("equipmentStatus: ", that.allData[that.roomName][that.deviceid]["equipmentStatus"])

        console.log("that.equipType", that.equipType);
      }
    }

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
