<template>
  <div>
    <div class="iframe-wrap" element-loading-text="加载中" v-loading="loading">
      <iframe
        frameborder="0"
        scrolling="yes"
        style="background-color:transparent;width: 100%;height:100%;"
        allowfullscreen
        src="/editor"
        ref="iframe"></iframe>
    </div>
    <Main @close="isShow=false" :params="params" v-if="isShow"></Main>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import { getSummary } from '@/api/index.js'
import Main from '@/views/Main.vue'

export default {
  name: 'Detail',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Main
  },
  data() {
    return {
      loading: true,
      isShow: false,
      env: process.env.BASE_URL,
      params: {}
    }
  },
  created() {
    Object.assign(window, {
      $wechatsync: {
        getSummary,
        articleIds: this.$route.query?.id,
        setModal: this.setModal
      }
    })
  },
  mounted() {
    const { iframe } = this.$refs
    if (iframe.attachEvent) {
      // IE
      iframe.attachEvent('onload', () => {
        this.loading = false
      })
    } else {
      // 非IE
      iframe.onload = () => {
        this.loading = false
      }
    }
  },
  methods: {
    setModal(params) {
      this.isShow = true
      this.params = params
    },
  }
}
</script>

<style lang='less' scoped>
.iframe-wrap{
  width: calc(100vw/* - 250px*/);
  height:calc(100vh - 80px);
}
.editor {
  line-height: normal !important;
  height: 100%;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
