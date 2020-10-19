<template>
  <div class="box">
    <div class="wrap">
      <ul class="special">
        <li class="image" v-for="(item,index) in list" :class="{active:index==mark}" >
          <img :src="item.imgRealName" :alt="item.imgName">
          <a :href="item.jumpUrl"/>
        </li>
      </ul>
        <ul class="pointList">
        <li class="point" v-for="(item,index) in list" :class="{active:index==mark}" @click="select(index)"></li>
      </ul>
    </div>
    <a class="prev" @click="prevMark()"></a>
    <a class="next" @click="nextMark()"></a>
  </div>
</template>

<script>
import {loopList} from '@/api/loop'
  export default {
    name: "Carousel",
    data(){
      return{
        mark:0,
        list:[
          {
            src: 'https://edu-image.nosdn.127.net/52b9100bd0274850884a8a4ecaa287f2.jpg?imageView&quality=100&thumbnail=776y360'
          },
          {
            src:'https://edu-image.nosdn.127.net/a17f2cffbdcb4f04b7b57f6cf046ffb2.png?imageView&quality=100'
          },
          {
            src:'http://edu-image.nosdn.127.net/dcf383020c4a4bad9ed0b8d06d16eac2.png?imageView&quality=100&thumbnail=776y360'
          },
          {
            src:'https://edu-image.nosdn.127.net/d5e4a32296ce4ef9aa1debd1e16c967a.png?imageView&quality=100&thumbnail=776y360'
          },
          {
            src:'https://edu-image.nosdn.127.net/57ab100433d945a99a9948ee38284594.png?imageView&quality=100'
          }
      ]
      }
    },
    methods:{
      loopList(){
        loopList().then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.list = res.data.data
          }
        })
      },
      nextMark(){
        if(this.mark<this.list.length-1) this.mark++;
        else this.mark=0;
      },
      prevMark(){
        if (this.mark==0) this.mark=4;
        else this.mark--;
      },
      select(index){
        this.mark = index
      },
      autoplay(){
        setInterval(this.nextMark,3000)
      },
    },
    created() {
      this.loopList()
      this.autoplay()
    }
  }

</script>

<style scoped>
  .box{
    position: relative;
    /*width: 520px;*/
    /*height: 280px;*/
    width: 100%;
    height: 100%;
    margin: 10px auto;
  }
  ul{
    list-style: none;
    padding: 0px;
  }
  .image{
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: 5s;
  }
  ul li img{
    width: 100%;
    height: 100%;
  }
  .prev,
  .next {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    width: 30px;
    height: 60px;
    background-color: rgba(0, 0, 0, .3);
    text-align: center;
    line-height: 60px;
    color: #fff;
    text-decoration: none;
    z-index: 100;
    font-family:"icomoon";
  }
  .prev:hover,
  .next:hover{
    background-color: rgba(0,0,0,.6)
  }

  .next{
    right: 0;
    border-radius: 15px 0 0 15px;
  }
  .prev{
    left: 0;
    border-radius: 0 15px 15px 0;
  }
  .image.active{
    z-index: 10;

  }
  .pointList{
    position: absolute;
    bottom: 20px;
    left: 360px;
    z-index: 1000;
  }

  .pointList {
    position: absolute;
    bottom: 15px;
    left: 50%;
    margin-left: -35px;
    width: 70px;
    height: 13px;
    background: rgba(255, 255, 255, .3);
    border-radius: 7px;
  }
  .point {
    float: left;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
    margin: 3px;
    cursor: pointer;
  }
  .point.active{
    background-color: #ff5000;
  }
</style>
