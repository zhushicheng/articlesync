<template>
  <quill-editor
    ref="myQuillEditor"
    class='editor'
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />
</template>
<script>
// @ is an alias to /src
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.core.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// eslint-disable-next-line import/extensions
import { getSummary } from '@/api/index.js'
import toolbarOptions from './toolbarOptions'

export default {
  name: 'Detail',
  data() {
    return {
      // 富文本编辑器默认内容
      content: '',
      // 富文本编辑器配置
      editorOption: {
        // Some Quill options...
        //  富文本编辑器配置
        modules: {
          // 工具栏定义的
          toolbar: toolbarOptions
        },
        // 主题
        theme: 'snow',
        placeholder: '请输入正文'
      }
    }
  },
  components: {
    quillEditor
  },
  mounted() {
    this.getSummary()
  },
  methods: {
    async getSummary() {
      // eslint-disable-next-line camelcase
      // const article_id = this.$route.query?.id
      const res = await getSummary({ article_id: '' })
      if (res.ret === 200 && res?.data) {
        console.log(111111, res?.data)
        this.content = res.data.content
      }
    },
    // 失去焦点事件
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    // 获得焦点事件
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    // 准备富文本编辑器
    // eslint-disable-next-line no-unused-vars
    onEditorReady(quill) {
      // console.log('editor ready!', quill)
    },
    // 内容改变事件
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  }
}
</script>
<style lang='less' >
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
