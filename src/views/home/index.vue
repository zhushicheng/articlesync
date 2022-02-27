<template>
  <div class="article-home">
    <div class="article-home-header">
      <p class="header-wrap">
        <span class="title">一级分类</span>
        <span class="father">
          <span :class="['name', oneLevel===item.id?'active':'']" @click="categoryHandleOne(item)"
                v-for="item in oneLevelArr" :key="item.id">{{item.cate_name}}</span>
        </span>
      </p>
      <p class="header-wrap" v-if="twoLevelArr.length">
        <span class="title">二级分类</span>
        <span class="father">
          <span :class="['name', twoLevel.includes(item.id)?'active':'']"
                @click="categoryHandleTwo(1, item)"
                v-for="item in twoLevelArr" :key="item.id">{{item.cate_name}}</span>
        </span>
      </p>
      <p class="header-wrap" v-if="keywordsArr.length">
        <span class="title">热点关键词</span>
        <span class="father">
          <span :class="['name', keywords.includes(item.id)?'active':'']"
                @click="categoryHandleTwo(2, item)"
                v-for="item in keywordsArr" :key="item.id">{{item.word}}</span>
        </span>
      </p>
    </div>
    <div class="article-home-content">
      <el-button type="primary" size="small" style="margin: 10px" @click="jumpTo">摘要生成</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="light"
        border
        style="width: 100%"
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="title" align="center" label="标题">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.location">{{scope.row.title}}</a>
          </template>
        </el-table-column>
<!--        <el-table-column prop="keywords" align="center" label="关键词"></el-table-column>-->
        <el-table-column prop="authors" align="center" label="作者" width="100"></el-table-column>
        <el-table-column prop="queryt" align="center" label="搜索条件"></el-table-column>
        <el-table-column prop="cate_name" align="center" label="父分类" width="80"></el-table-column>
        <el-table-column prop="son_cate_name" align="center" label="子分类" width="80">
        </el-table-column>
<!--        <el-table-column prop="type" align="center" label="文档类型" width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{ scope.row.type === 1 ? '无头图' : '有头图' }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="click" align="center" label="点击数" width="70">-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="exposure" align="center" label="曝光数" width="70">-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="comments" align="center" label="评论数" width="70">-->
<!--        </el-table-column>-->
        <el-table-column prop="publish_date" align="center" label="更新时间" width="120">
        </el-table-column>
<!--        <el-table-column align="center" label="操作" fixed="right" width="120">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button @click="handleClick(scope.row)"-->
<!--                       type="text" size="small">查看</el-button>-->
<!--            <el-button type="text" size="small">-->
<!--              <a target="_blank" :href="scope.row.location">来源</a></el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <el-pagination
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// eslint-disable-next-line import/extensions
import { getArticle, getCategory, getKeyword } from '@/api/index.js'

export default {
  name: 'Home',
  data() {
    return {
      oneLevel: '',
      twoLevel: [],
      keywords: [],
      oneLevelArr: [],
      twoLevelArr: [],
      keywordsArr: [],
      queryPage: {
        page: 1,
        perpage: 10,
        cate_name: '',
        son_cate_name: '',
        word: '',
      },
      loading: false,
      keywordParam: {
        page: 1,
        perpage: 300,
        cate_name: '',
        son_cate_name: '',
      },
      total: 0,
      tableData: [],
      multipleSelection: [],
    };
  },
  mounted() {
    this.getArticle()
    this.getCategory()
  },
  methods: {
    async getCategory() {
      const res = await getCategory()
      if (res.ret === 200 && res?.data?.items) {
        this.oneLevelArr = res.data.items
      }
    },
    async getKeyword() {
      const { cateName, sonCateName } = this.idTransformNames()
      this.keywordParam.cate_name = cateName
      this.keywordParam.son_cate_name = sonCateName?.join(',')
      const res = await getKeyword(this.keywordParam)
      if (res.ret === 200 && res?.data?.items) {
        this.keywordsArr = res.data.items
      }
    },
    async getArticle() {
      this.loading = true
      const { cateName, sonCateName, word } = this.idTransformNames()
      this.queryPage.cate_name = cateName
      this.queryPage.son_cate_name = sonCateName?.join(',')
      this.queryPage.word = word?.join(',')
      const res = await getArticle(this.queryPage)
      this.loading = false
      if (res.ret === 200 && res?.data?.items) {
        this.tableData = res.data.items
        this.total = res.data.total
      }
    },
    idTransformNames() {
      const cateName = this.oneLevelArr
        .find((item) => item.id === this.oneLevel)?.cate_name
      const sonCateName = this.twoLevelArr
        .filter((item) => this.twoLevel.includes(item.id)).map((item) => item.cate_name)
      const word = this.keywordsArr
        .filter((item) => this.keywords.includes(item.id)).map((item) => item.word)
      return {
        cateName,
        sonCateName,
        word
      }
    },
    handleSizeChange(val) {
      this.queryPage.page = 1
      this.queryPage.perpage = val
      this.getArticle()
    },
    handleCurrentChange(val) {
      this.queryPage.page = val
      this.getArticle()
    },
    categoryHandleOne(item) {
      this.oneLevel = item.id
      this.twoLevelArr = item.items
      this.twoLevel = []
      this.keywords = []
      this.clickHandle()
    },
    categoryHandleTwo(type, item) {
      const query = type === 1 ? 'twoLevel' : 'keywords'
      // eslint-disable-next-line max-len,no-unused-expressions
      this[query].includes(item.id) ? (this[query] = this[query].filter((id) => id !== item.id)) : this[query].push(item.id)
      if (type === 1) this.keywords = []
      this.clickHandle(type)
    },
    clickHandle(type) {
      this.queryPage.page = 1
      this.$nextTick(() => {
        // 热点关键词时不需要加载
        // eslint-disable-next-line no-unused-expressions
        (type !== 2) && this.getKeyword()
        this.getArticle()
      })
    },
    categoryHandle(level, name) {
      this[level === 1 ? 'oneLevel' : 'twoLevel'] = name;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    jumpTo() {
      console.log(1, this.multipleSelection)
      const arr = this.multipleSelection.map((item) => item.id)
      if (Array.isArray(this.multipleSelection) && this.multipleSelection.length) {
        this.$router.push({ name: 'Detail', query: { id: arr.join(',') } })
      } else {
        this.$message.error('请选择文章！！！');
      }
    }
  },
};
</script>
<style lang="less" scoped>
.article-home{
  .article-home-header{
    background: white;
    padding: 16px;
    .header-wrap{
      &:not(:last-child){
        margin-bottom: 16px;
      }
      font-size: 15px;
      display: flex;
      //align-items: center;
      flex-wrap: wrap;
      .title{
        padding: 3px 8px;
        font-weight: bold;
        width: 80px;
        text-align: right;
      }
      .father{
        flex: 1;
      }
      .name{
        margin-left: 8px;
        padding: 3px 6px;
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap;
        float: left;
        margin-bottom: 8px;
        &.active{
          background: #bcc6d5;
        }
      }
    }
  }
  .article-home-content{
    background: white;
    margin-top: 24px;
  }
}
</style>
