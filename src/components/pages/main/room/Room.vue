<template>
    <div class="htmleaf-container">
        <room-Header/>
        <br>
        <section class="container" v-cloak>
            <div class="col-md-4 col-sm-6 col-xs-12" v-for="(room,index) in roomData" :key="index">
                <article class="material-card Deep-Purple">
                    <h2>
                        <span>{{room.room_name}}</span>
                        <strong>
                            <i class="fa fa-fw fa-star"></i>
                            设备：{{ room.online_device_num }}/{{ room.total_device_num }} 在线
                        </strong>
                    </h2>
                    <div class="mc-content">
                        <div class="img-container">
                            <router-link :to="{path:'CustomerEquipment',query:{room_id: room.room_id}}">
                                <img class="img-responsive" :src="imgDict[room.room_type]"/>
                            </router-link>
                        </div>
                        <div class="mc-description">
                            Powered by HA.
                        </div>
                    </div>
                    <a class="mc-btn-action">
                        <i class="fa  fa-plus"></i>
                    </a>
                    <div class="mc-footer">
                        <h4>
                            房间设备操作
                        </h4>
                        <router-link class="fa fa-fw fa-plus"
                                     :to="{path:'equipmentOperation',query:{id: room.roomID,name: 'add'}}"></router-link>
                        <router-link class="fa fa-fw fa-trash"
                                     :to="{path:'equipmentOperation',query:{id: room.roomID,name: 'del'}}"></router-link>
                        <router-link class="fa fa-fw fa-pencil"
                                     :to="{path:'equipmentOperation',query:{id: room.roomID,name: 'edit'}}"></router-link>
                    </div>
                </article>
            </div>
        </section>

    </div>
</template>

<script>
    import roomHeader from './Header';
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                imgDict:{
                    "1": require("../../../../assets/image/room/sitting_room.jpg"),
                    "first_bedroom": require("../../../../assets/image/room/first_bedroom.jpg"),
                    "second_bedroom": require("../../../../assets/image/room/second_bedroom.jpg"),
                    "first_bathroom": require("../../../../assets/image/room/first_bathroom.jpg"),
                    "dining_room": require("../../../../assets/image/room/dining_room.jpg"),
                    "default_room": require("../../../../assets/image/room/default_room.jpg"),
                },
                roomData: [
                    {
                        room_type: 1,
                        room_name: "客厅",
                        total_device_num: 2,
                        online_device_num: 2,
                        room_id: 1
                    },
                ],
            }
        },

        mounted() {
            !function (t) {
                let i = function (i, n) {
                    this.options = n, this.card = t(i), this.button = t(i).children(".mc-btn-action"), this.icon = t(i).children(".mc-btn-action").children("i"), this.card_activator = n.card_activator, this.timing = this.getTransitionTiming();
                    let s = this;
                    "click" === s.card_activator ? (this.icon.hasClass(this.options.icon_open) || this.icon.attr("class", this.icon.attr("class").replace(/\bfa-.*\b/g, "")).addClass(this.options.icon_open), this.button.on("click", function () {
                        s.toggle()
                    })) : this.button.hide(), "hover" === s.card_activator && (this.card.on("mouseenter", function () {
                        s.open()
                    }), this.card.on("mouseleave", function () {
                        s.close()
                    }))
                };
                i.defaults = {
                    icon_close: "fa-arrow-left",
                    icon_open: "fa-bars",
                    icon_spin: "fa-spin-fast",
                    card_activator: "click"
                }, i.prototype.toggle = function () {
                    return this.icon.addClass(this.options.icon_spin), this.isOpen() ? this.close() : this.open()
                }, i.prototype.getTransitionTiming = function () {
                    let i = 0;
                    return this.card.find("*").each(function () {
                        n(t(this).css("transition-duration")) + n(t(this).css("transition-delay")) > i && (i = n(t(this).css("transition-duration")) + n(t(this).css("transition-delay")))
                    }), i
                }, i.prototype.close = function () {
                    let t = this;
                    this.card.trigger("hide.material-card"), this.card.removeClass("mc-active"), window.setTimeout(function () {
                        t.icon.removeClass(t.options.icon_spin).removeClass(t.options.icon_close).addClass(t.options.icon_open), t.card.trigger("hidden.material-card")
                    }, this.timing)
                }, i.prototype.open = function () {
                    let t = this;
                    this.card.trigger("show.material-card"), this.card.addClass("mc-active"), window.setTimeout(function () {
                        t.icon.removeClass(t.options.icon_spin).removeClass(t.options.icon_open).addClass(t.options.icon_close), t.card.trigger("shown.material-card")
                    }, this.timing)
                }, i.prototype.isOpen = function () {
                    return this.card.hasClass("mc-active")
                };
                let n = function (t) {
                    let i, n, s, o = t.match(/^([\d\.]+)(\w+)$/);
                    if (o.length <= 1) return t;
                    switch (i = o[1], n = o[2]) {
                        case"ms":
                            s = 1;
                            break;
                        case"s":
                            s = 1e3
                    }
                    return i * s
                }, s = function (n) {
                    return this.each(function () {
                        let s = t(this), o = s.data("material-card"),
                            a = t.extend({}, i.defaults, "object" == typeof n && n);
                        o || s.data("material-card", o = new i(this, a)), "string" == typeof n && o[n]()
                    })
                };
                t.fn.materialCard = s
            }(jQuery);
            this.indicator1();
            this.displayEffects();

        },

        methods: {
            displayEffects() {
                $(function () {
                    $('.material-card').materialCard({
                        icon_close: 'fa-chevron-left',
                        icon_open: 'fa-plus',
                        icon_spin: 'fa-spin-fast',
                        card_activator: 'click'
                    });
                });
            },
            indicator1 () {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                setTimeout(()=>{
                    Indicator.close();
                },2000)
            }
        },
        components: {
            roomHeader
        }
    }
</script>

<style scoped>
    @import url('https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css');
    @import url('../../../../assets/css/material-cards.css');

    [v-cloak] {
        display: none;
    }

    .img-responsive {
        width: 100%;
        height: 20rem;
    }

    .col-xs-12 {
        margin-bottom: -20px;
    }

    .col-xs-12:last-child {
        margin-bottom: 3rem !important;
    }
</style>
