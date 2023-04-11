<template>
    <div class="hospital_room-detail">
        <div class="hospital_room-leftDetail">

        </div>
        <div class="hospital_room-rightDetail">
            <div class="hospital_room-generalInfo">
                <div class="hospital_room-name"><span>科室名称: </span>{{ $route.query.room }}</div>
                <div class="hospital_room-image">
                    <img :src="roomDetail.image" alt="">
                </div>
                <div class="hospital_room-introduction">
                    <p>{{ roomDetail.desc }}</p>
                </div>
            </div>
            <div class="hospital_room-detailInfo">
                <div v-for="(obj, index) in roomObjs" :key="index" class="detail">
                    <div class="title">{{ obj.title }}</div>
                    <div class="item" v-for="(item, index) in obj.arr" :key="index">
                        <span class="item-image">
                            <img :src="item.image" alt="">
                        </span>
                        <span class="item-name">
                            {{ item.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rooms } from './data';
    export default {
        name: "RoomDetail",
        data() {
            return {
                roomDetail: null,
                roomObjs: []
            }
        },
        created() {
            let room = this.$route.query.room;
            this.roomDetail = rooms[room];
            for(let key in this.roomDetail) {
                if(Array.isArray(this.roomDetail[key])) {
                    let obj = {
                        title: key,
                        arr: this.roomDetail[key]
                    }
                    this.roomObjs.push(obj)
                }
            }
            console.log(this.roomObjs)
        }
        
    }
</script>

<style lang="less" scoped>
.hospital_room-detail {
    display: flex;

    flex-direction: row;
    .hospital_room-leftDetail {
        width: 66.6%;
        height: 400px;
        background: gray;
    }
    .hospital_room-rightDetail {
        flex-grow: 1;
        margin-left: 20px;
        padding: 10px 10px 0 0;
        .hospital_room-generalInfo {
            background: #EBEEF5;
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            .hospital_room-introduction {
                p {
                    text-indent: 2em;
                }
            }
            * {
                margin-bottom: 10px;
            }
            img {
                width: 100%;
                height: 300px;
            }
        }  
        .hospital_room-detailInfo {
            width: 100%;
            .detail {
                width: 100%;
                padding: 10px;
                background: #EBEEF5;
                border-radius: 10px;
                margin-top: 10px;
                box-sizing: border-box;
                .title {
                    margin-bottom: 10px;
                    border-bottom: 1px solid #DCDFE6;
                    padding: 10px;
                }
                .item {
                    padding: 10px;
                    border-radius: 10px;
                    cursor: pointer;
                    &:hover {
                        background: #fff;
                    }
                    .item-image {
                        vertical-align: text-top;
                        margin-right: 20px;
                        display: inline-block;
                        img {
                            width: 80px;
                            height: 60px;
                        }
                    }
                }
            }
        } 
        
    }
}
</style>