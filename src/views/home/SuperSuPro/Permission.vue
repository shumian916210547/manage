<template>
  <div class="Permission">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="text item">
        <el-table :data="rightsList" style="width: 100%" stripe border>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level==0">一级</el-tag>
              <el-tag v-else-if="scope.row.level==1" type="success">二级</el-tag>
              <el-tag v-else type="danger">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getRights } from "network/home/rights/rights";

export default {
  name: "Permission",
  components: {},
  data() {
    return {
      rightsList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getRightlist() {
      const { data: res } = await getRights();
      this.rightsList = res.data;
    },
  },
  created() {
    this.getRightlist();
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='css' scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 10px;
}
.el-table /deep/ th > .cell {
  position: static;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}
</style>