<template>
  <div>
    <div>
      <div>
        <h3 class="modal-header modal-title" style="display: flex">
          <mt-button icon="back" @click.native="$router.go(-1)"></mt-button>
          <span style="flex-grow: 1; padding-left: 10px">{{
            oneDeviceData.device_name
          }}</span>
          <mt-button
            icon="more"
            @click.native="showSetting(oneDeviceData)"
          ></mt-button>
        </h3>
      </div>
      <div style="height: 4rem"></div>
      <div class="modal-body modal-content modal-content-c">
        <span style="width: 100%">常规状态</span>
        <mt-cell title="在线">{{ oneDeviceData.online ? "是" : "否" }}</mt-cell>
        <mt-cell title="设备开关"
          ><mt-switch v-model="oneDeviceData.power"></mt-switch
        ></mt-cell>
      </div>
      <div style="height: 4rem"></div>
      <div class="modal-body modal-content modal-content-c">
        <span style="width: 100%">附加状态</span>
        <div v-for="(item, index) in oneDeviceData.other_param" :key="index">
          <div v-if="item.type === 'Discreate'">
            <mt-cell :title="nameMap(item.name)">
              <mt-picker
              :valueKey="'text'"
                :slots="computedSlots(item)"
                :visible-item-count="3"
                @change="pickerChange"
              ></mt-picker>
            </mt-cell>
          </div>
          <div v-if="item.type === 'Continuous'">
            <mt-cell :title="item.name">{{ item.value }}</mt-cell>
            <mt-range
              v-model="item.value"
              :min="item.vmin"
              :max="item.vmax"
              :step="item.step"
              :bar-height="5"
            >
            </mt-range>
          </div>
        </div>
      </div>
      <div v-if="editing === true">
        <mt-button size="large" type="primary">确定修改</mt-button>
      </div>
    </div>
    <!-- 修改基本信息 如名称 删除设备等 -->
    <mt-popup
      style="background-color: white"
      v-model="settingVisible"
      position="right"
      class="mint-popup-3"
      :modal="false"
    >
      <div>
        <div>
          <h3 class="modal-header modal-title" style="display: flex">
            <mt-button
              icon="back"
              @click.native="settingVisible = false"
            ></mt-button>
            <span style="flex-grow: 1; padding-left: 10px">设置</span>
            <mt-button icon="back" style="opacity: 0"></mt-button>
          </h3>
        </div>
        <div class="page">
          <mt-cell
            title="设备名称"
            :value="deviceName"
            is-link
            @click.native="changeName(deviceName)"
          ></mt-cell>
        </div>
        <div style="margin: 15px">
          <mt-button
            type="danger"
            size="large"
            @click.native="deleteDevice(deviceId)"
            >删除设备</mt-button
          >
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import CommonHeader from "../../../common/Header";
import { getDeviceDetail } from "../../../../model/index";
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "CustomerEquipment",
  data() {
    return {
      oneDeviceData: {},
      visible: this.popupVisible,
      // 设置界面
      settingVisible: false,
      // 选中需要修改名称的设备
      deviceName: "",
      equipType: 0,
      editing: false,
      // 1. 智能灯
      // 2. 台灯
      // 3. 窗户
      // 4. 空调
      // 5. 温控器
      // 6. 智能插座
      device_name: "",
      power: false,
      online: false,
    };
  },
  props: ["popupVisible"],
  created() {
    getDeviceDetail(this.deviceId).then(
      (data) => (this.oneDeviceData = data.result)
    );
  },
  computed: {
    deviceId() {
      return this.$route.query.device_id;
    },
  },
  components: {
    CommonHeader,
  },
  methods: {
    nameMap(name) {
      const map = {
        light: "亮度",
        temperature: "温度",
      };
      return map[name] || name;
    },
    showSetting(oneDeviceData) {
      this.settingVisible = true;
      this.deviceName = oneDeviceData.device_name;
    },
    deleteDevice(deviceId) {
      MessageBox({
        title: "提示",
        message: "确定执行此操作?",
        showCancelButton: true,
      }).then(({ value, action }) => {});
    },
    changeName(val) {
      MessageBox.prompt(val, "请输入名称").then(({ value, action }) => {
        if (action === "confirm") {
          Indicator.open("加载中...");
          setTimeout(() => {
            this.deviceName = value;
            Indicator.close();
          }, 1500);
        }
      });
    },
    computedSlots(item) {
        const valMap = {
            high: '高',
            middle: '中',
            low: '低',
        }
      return [
        {
          values: item.slots.map(val => ({value: val, text: valMap[val]})),
          defaultIndex: item.slots.indexOf(item.value),
        },
      ];
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
    poweronoff(deviceId) {},
    pickerChange(picker, values) {
      console.log(picker, values);
    },
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
};
</script>

<style scoped>
@import url("../../../../assets/css/equip_style.css");
.modal-content-c {
  margin: 0 20px;
}
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
  background-color: #ff8c00;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}

.container {
  padding: 10px;
}
</style>
