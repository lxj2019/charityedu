<template>
  <div>
    <div class="menu w">
      <div class="menuLeft">
        <nav-bar :list="subjectlist" />
      </div>
      <div class="menuRight">
        <carousel />
      </div>
    </div>
    <div>
      <Recommend />
    </div>
  </div>

</template>

<script>
import NavBar from './nav/NavBar'
import Carousel from '@/components/common/CarouselShow'
import Recommend from './Recommend'
import { getCookie } from '@/utils/auth'
export default {
  name: 'Home',
  components: {
    NavBar,
    Carousel,
    Recommend
  },
  data() {
    return {
      theme2: 'light',
      subjectlist: [
        { title: '上册', list: ['数学', '英语', '语文'] },
        { title: '下册', list: ['数学', '英语', '语文'] }
      ],

      loopimg: [
        { img: 'http://loaclhost:8080/charityedu/source/1.jpg', src: '112', type: 'video' },
        { img: 'http://loaclhost:8080/charityedu/source/2.jpg', src: '113', type: 'article' }
      ],
      videolist: [
        {
          applaudnum: '100',
          username: '阿晨',
          src: '113',
          userimg: 'http://loaclhost:8080/charityedu/source/1.jpg',
          videoimg: 'http://loaclhost:8080/charityedu/source/1.jpg',
          title: '二次函数'
        },
        {
          applaudnum: '100',
          username: '阿晨',
          src: '113',
          userimg: 'http://loaclhost:8080/charityedu/source/1.jpg',
          videoimg: 'http://loaclhost:8080/charityedu/source/1.jpg',
          title: '二次函数'
        }
      ]
    }
  },
  created() {
    this.autoLogin()
  },
  mounted() {

  },
  methods: {
    autoLogin() {
      if (getCookie('phoneNum') !== '') {
        const obj = {}
        obj.phoneNum = getCookie('phoneNum')
        obj.password = getCookie('password')
        this.$store.dispatch('user/login', obj).then(() => {
          this.loading = false
          this.$router.push({ path: '/' })
          this.$store.dispatch('user/getUserImg')
        })
      }
    }
  }
}
</script>

<style scoped>
  .menu{
    height: 400px;
  }
  .menuLeft{
    margin-top: 10px;
    float: left;

  }
  .menuRight{
    float: left;
    width: 700px;
    height: 400px;
    margin-left: 10px;
  }

</style>
