<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header">
          <img src="~assets/images/logo.jpg" />
          <span>电商后台管理系统</span>
          <el-button type="text" @click="open">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="rgb(50,55,68)"
            text-color="#fff"
            :unique-opened="true"
            router
          >
            <el-submenu :index="index+1+''" v-for="(item,index) in menulist" :key="index">
              <template slot="title">
                <i :class="iconObj[menulist[index].id]"></i>
                <span>{{menulist[index].authName}}</span>
              </template>
              <el-menu-item
                :index="'/'+item.path"
                v-for="(item,childrenindex) in menulist[index].children"
                :key="childrenindex"
                @click="saveActivatedstatus('/'+item.path)"
              >
                <template slot="title">{{menulist[index].children[childrenindex].authName}}</template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenulist } from "network/home/home";

export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      menulist: [],
      iconObj: {
        125: "el-icon-s-custom",
        103: "el-icon-warning",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-marketing",
      },
      activePath: "/users",
    };
  },
  watch: {},
  computed: {},
  methods: {
    saveActivatedstatus(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    open() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.clear("token");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "成功退出!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    MenuList() {
      getMenulist().then((res) => {
        this.menulist = res.data.data;
        console.log(this.menulist);
      });
    },
  },
  created() {
    this.MenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  mounted() {},
};
</script>


<style lang="css" scoped>
.home {
  height: 100%;
}
.el-header {
  height: 80px !important;
  background-color: #b3c0d1;
  color: #333;
  align-items: center;
}
.el-header .header {
  height: 100%;
  align-items: center;
  display: flex;
}
.el-header .header img {
  margin: 5px 0px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.el-header .header span {
  font-size: 24px;
  flex: 1;
  padding-left: 20px;
}

.el-aside {
  user-select: none;
  background-color: rgb(50, 55, 68);
  color: #333;
  text-align: center;
}
.el-menu {
  border-right: 0;
}
.el-menu-item {
  text-align: end;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-container {
  height: 100%;
}
</style>