<template>
  <div class="container">
    <Header :header-title="title"/>
    <div style="height: 4rem"></div>
    <!---------------------------->
    <div class="addEquipment" v-if="handleName ==='add'">
      <div class="aui-grids-box" v-cloak>
        <div class="aui-grids-item" v-for="(item,index) in gridsData" :key="index">
          <div class="aui-grids-item-hd" @click="addPopupVisible = true">
            <img :src="imgDict[item.imgName]" alt="Kepai">
          </div>
          <br/>
          <div class="aui-grids-item-bd">
            {{item.equipmentName}}
          </div>
        </div>
      </div>
    </div>
    <!---------------------------->
    <div v-else-if="handleName ==='del'">
      <div class="aui-grids-box" v-cloak>
        <div v-if="Object.keys(roomEquipments).length === 1 " class="noData-style">
          您还没有添加设备哦 :)
        </div>

        <div v-else class="aui-grids-item" v-for="(item,index) in roomEquipments" :key="index">
          <div class="aui-grids-item-hd">
            <img :src="imgDict[item.imgName]" alt="Kepai">
          </div>
          <br/>
          <div class="aui-grids-item-bd">
            {{item.equipmentName}}
          </div>
        </div>
      </div>
    </div>
    <!---------------------------->
    <div v-else="handleName ==='edit'">
      <div class="aui-grids-box" v-cloak>
        <div v-if="Object.keys(roomEquipments).length === 1 " class="noData-style">
          您还没有添加设备哦 :)
        </div>

        <div v-else class="aui-grids-item" v-for="(item,index) in roomEquipments" :key="index">
          <div class="aui-grids-item-hd">
            <img :src="imgDict[item.imgName]" alt="Kepai">
          </div>

          <br/>
          <div class="aui-grids-item-bd">
            {{item.equipmentName}}
          </div>
        </div>
      </div>
    </div>
    <!---------------------------->
    <!--<connect-wifi :popupVisible="addPopupVisible"></connect-wifi>-->
    <mt-popup style="background-color: white" v-model="addPopupVisible" position="right" class="mint-popup-3" :modal="false">
      <mt-button @click.native="addPopupVisible = false" size="large" type="primary">确认</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import Header from '../../../../components/common/Header';
  import {MessageBox} from 'mint-ui';

  export default {
    name: "EquipmentOperation",
    components: {
      Header
    },
    data() {
      return {
        handleId: -1,
        title: '',
        handleName: '',
        // 模态层
        addPopupVisible: false,
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
          "icon_switch": require('../../../../assets/image/equipmentImages/icon_airCheack.png'), // 面板开关
          "icon_mirror": require('../../../../assets/image/equipmentImages/icon_mirror.png'), // 智能魔镜
          "icon_colorLight": require('../../../../assets/image/equipmentImages/icon_colorLight.png'), // 彩灯
          "icon_light": require('../../../../assets/image/equipmentImages/icon_light.png'), // 色温灯
          "icon_lights": require('../../../../assets/image/equipmentImages/icon_lights.png'), // 灯带
          "icon_smokeAlarm": require('../../../../assets/image/equipmentImages/icon_smokeAlarm.png'), // 烟雾报警器
          "icon_circle": require('../../../../assets/image/icon_circle.png'), // 窗帘
        },
        gridsData: [
          {
            imgName: "icon_airCheack",
            equipmentName: '空气检测仪',
          }, {
            imgName: "icon_waterClean",
            equipmentName: '净水器',
          }, {
            imgName: "icon_security",
            equipmentName: '安防',
          }, {
            imgName: "icon_socket",
            equipmentName: '智能插座',
          }, {
            imgName: "icon_gateway",
            equipmentName: '智能网关',
          }, {
            imgName: "icon_dry",
            equipmentName: '除湿器',
          }, {
            imgName: "icon_temp",
            equipmentName: '温控器',
          }, {
            imgName: "icon_heatPump",
            equipmentName: '热泵',
          }, {
            imgName: "icon_pressureCooker",
            equipmentName: '电压力锅',
          }, {
            imgName: "icon_doorLock",
            equipmentName: '智能门锁',
          }, {
            imgName: "icon_switch",
            equipmentName: '面板开关',
          }, {
            imgName: "icon_mirror",
            equipmentName: '智能魔镜',
          },
          {
            imgName: "icon_colorLight",
            equipmentName: '彩灯',
          }, {
            imgName: "icon_light",
            equipmentName: '色温灯',
          }, {
            imgName: "icon_lights",
            equipmentName: '灯带',
          }, {
            imgName: "icon_smokeAlarm",
            equipmentName: '烟雾报警器',
          }
        ],
        roomEquipments: [{}]
      }
    },
    mounted() {
      this.getRouteParam();
      this.test();

    },
    methods: {
      getRouteParam() {
        this.handleId = this.$route.query.id;
        this.handleName = this.$route.query.name;
        /*
        动态更新 title 的值
        */
        let name = this.handleName;
        if (name === 'add') {
          this.title = '选择设备类型';
        } else if (name === 'del') {
          this.title = '删除设备'
        } else {
          this.title = '更改设备信息'
        }
      },
      /*
      给房间添加设备
       */
      addEquipment(id) {
        // console.log(id);
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        });
        this.addPopupVisible = false
      },
      /*
      删除房间的设备
       */
      delEqipment(id) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          MessageBox('提示', '操作成功');
        });
        this.$router.go(-1)
      },
      /*
      更改房间的设备信息
       */
      editEquiment(id) {
        alert('该房间还没有添加设备哦~');
        this.$router.go(-1);
      },
      test(){
        /*
        this.roomEquipments).length === 1 时该对象为空
        当对象为 {} 时也会存在一个 ["0"] 的值
         */
      }
    }
  }
</script>

<style scoped>
  @import url("../../../../assets/css/equip_style.css");

  [v-cloak] {
    display: none;
  }

  .container {
    background-color: #FFFFF0;
  }

  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .mint-popup-3 .mint-button {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 5%;

  }
  .noData-style{
    text-align: center;
    font-size: 24px;
    background-color: #FFFFF0;
  }
</style>
