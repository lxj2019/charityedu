<template>
  <div>
  <Button @click="modal = true">注销</Button>
  <Modal :visible.sync="modal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>注销确认</span>
    </p>
    <div style="text-align:center">
      <p>注销后，将无法使用该账号。</p>
      <p>是否继续注销？</p>
    </div>
    <div slot="footer">
      <i-button type="error" size="large" long :loading="modal_loading" @click="logout">注销</i-button>
    </div>
  </Modal>
  </div>
</template>

<script>
  import {request} from "../../network/request";
  import {Modal,Icon,Button} from "view-design"
  export default {
    name: "ComfileBox",
    data() {
      return {
        modal:false,
        modal_loading:false
      }

    },
    methods: {
      logout() {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal = false;
          request({
            method: get,
            url: '/charityedu/logout',
          }).then(res => {
              console.log(res);
              this.$Message.success('注销成功');
            }
          )
        }, 2000)
      },
      components: {
        Modal,
        Icon,
        Button
      }
    }
  }
</script>

<style scoped>

</style>
