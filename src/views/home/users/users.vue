<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="query"
              class="input-with-select"
              @clear="getUsersList(query, pagenum, pagesize)"
              @keydown.enter.native="getUsersList(query, pagenum, pagesize)"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUsersList(query, pagenum, pagesize)"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="users" style="width: 100%" border stripe>
        <el-table-column type="index" style="text-align:center"></el-table-column>
        <el-table-column label="姓名" width="180" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
            <el-tooltip content="设置" placement="top-end" :enterable="false">
              <el-button type="info" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUsers } from "network/home/users/users";

export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      users: [],
      total: "",
      query: "",
      pagenum: 1,
      pagesize: 5,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getUsersList(query, pagenum, pagesize) {
      const { data: res } = await getUsers(query, pagenum, pagesize);
      if (res.meta.status == 200) {
        this.users = res.data.users;
        this.total = res.data.total;
      }
    },
    userStateChange(userinfo) {},
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.getUsersList(this.query, this.pagenum, this.pagesize);
    },
    handleCurrentChange(newcurrentsize) {
      this.pagenum = newcurrentsize;
      this.getUsersList(this.query, this.pagenum, this.pagesize);
    },
  },
  created() {
    this.getUsersList(this.query, this.pagenum, this.pagesize);
  },
  mounted() {},
};
</script>
<style lang="css" scoped>
.el-card {
  margin: 10px;
}
.el-table td div:nth-child(1) {
  box-sizing: border-box;
  text-align: center;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.el-table {
  margin-top: 15px;
}
</style>