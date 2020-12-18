<template>
  <div class="box">
    <!-- <div class="wrap">
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
    <a class="next" @click="nextMark()"></a> -->

     <Carousel  autoplay v-model="value"
     class="carousel"
     :title="list ||list[value].imgName"
     :autoplay-speed="setting.autoplaySpeed"
     :dots="setting.dots"
     :trigger="setting.trigger"
     :arrow="setting.arrow"
     :radius-dot="setting.radiusDot"
     loop :height="380"
     @on-click="jumpUrl">
        <CarouselItem v-for="img in list" :key="img.imgName">
              <img class="image" :src="img.imgRealName" :alt="img.imgName">
        </CarouselItem>
        <!-- <CarouselItem>
            <div class="demo-carousel">2</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem> -->
    </Carousel>
  </div>
</template>

<script>
import {loopList} from '@/api/loop'
  export default {
    name: "CarouselShow",
    data(){
      return{
        mark:0,
        value: 0,
        list:[],
        setting: {
            autoplay: false,          //自动播放
            autoplaySpeed: 3000,      //播放速度
            dots: 'inside',       //指示器位置
            radiusDot: false,    //原型指示器
            trigger: 'click',   //指示器触发方式，hover
            arrow: 'hover' //切换箭头，hover,never,always
        },
      }
    },
    methods:{
      jumpUrl(val){
        window.location.assign(this.list[val].jumpUrl)
        // window.push(this.list[val].jumpUrl)
      },
      loopList(){
        loopList().then(res=>{
          // console.log(res)
          if(res.data.code==200){
            this.list = res.data.data
            // console.log(this.list)
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
      // this.autoplay()
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
  .carousel{
    cursor: pointer;
  }
  ul{
    list-style: none;
    padding: 0px;
  }
  .image{
    /* position: absolute; */
    width: 100%;
    height:100%;
    /* text-align: center; */
    /* transition: 5s; */
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
