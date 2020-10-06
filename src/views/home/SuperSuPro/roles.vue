<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row
                v-for="(item, index) in props.row.children"
                :key="index"
                :class="['bdbottom', index == 0 ? 'bdtop' : '']"
              >
                <el-col :span="5">
                  <el-tag
                    :closable="true"
                    @close="delpower(props.row, item.id)"
                    >{{ item.authName }}</el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row
                    v-for="(item2, index2) in item.children"
                    :key="index2"
                    :class="['bdbottom', index2 == 0 ? 'bdtop' : '']"
                  >
                    <el-col :span="6">
                      <el-tag
                        type="success"
                        :closable="true"
                        @close="delpower(props.row, item2.id)"
                        >{{ item2.authName }}</el-tag
                      >
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        type="info"
                        v-for="(item3, index3) in item2.children"
                        :key="index3"
                        :closable="true"
                        @close="delpower(props.row, item3.id)"
                        >{{ item3.authName }}</el-tag
                      >
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button class="el-icon-edit" type="primary" size="mini" round
              >编辑</el-button
            >
            <el-button
              class="el-icon-delete"
              type="danger"
              size="mini"
              @click="deleteRoles(scope.row.id)"
              round
              >删除</el-button
            >
            <el-button
              class="el-icon-setting"
              type="info"
              size="mini"
              round
              @click="showPowerdialog(scope.row)"
              >分配权限</el-button
            >
            <el-dialog
              title="分配权限"
              :visible.sync="powerDialog"
              width="30%"
              @close="resetDialog"
            >
              <el-tree
                node-key="id"
                ref="treeref"
                :data="treeData"
                :props="treeProps"
                :default-checked-keys="checkNode"
                show-checkbox
              ></el-tree>
              <span slot="footer" class="dialog-footer">
                <el-button @click="powerDialog = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  getRoles,
  delpower,
  getAllrights,
  roleAuth,
  delroles,
} from "network/home/rights/roles";

export default {
  name: "roles",
  components: {},
  data() {
    return {
      tableData: [],
      powerDialog: false,
      treeData: [],
      treeProps: {
        children: "children",
        label: "authName",
      },
      checkNode: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    roles() {
      getRoles().then((res) => {
        this.tableData = res.data.data;
      });
    },
    delpower(roledata, labelid) {
      delpower(roledata.id, labelid).then((res) => {
        if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          roledata.children = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        }
      });
      console.log(roledata.id, labelid);
    },
    showPowerdialog(role) {
      this.roleId = role.id;
      this.defcheck(role, this.checkNode);
      this.powerDialog = true;
      getAllrights().then((res) => {
        if (res.data.meta.status == 200) {
          this.treeData = res.data.data;
          console.log(res);
        }
      });
    },
    defcheck(role, arr) {
      if (!role.children) {
        return arr.push(role.id);
        console.log(role.id);
      }
      role.children.forEach((item) => {
        this.defcheck(item, arr);
      });
    },
    resetDialog() {
      this.checkNode = [];
    },
    allotRights() {
      const keys = [
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys(),
      ];
      const str = keys.join(",");
      roleAuth(this.roleId, str).then((res) => {
        if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
          this.powerDialog = false;
        } else {
          this.$message({
            type: "error",
            message: "更新失败",
          });
        }
        console.log(res);
      });
      console.log(str);
    },
    deleteRoles(roleid) {
      delroles(roleid).then((res) => {
        if (res.data.meta.status == 200) {
          this.roles();
          this.$message({
            type: "success",
            message: res.data.meta.msg,
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.meta.msg,
          });
        }
        console.log(res);
      });
    },
  },
  created() {
    this.roles();
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
.el-card {
  margin-top: 10px;
}
.el-table /deep/ td:nth-child(1) {
  box-sizing: border-box;
  text-align: left;
}
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
  align-items: center;
  display: flex;
}
</style>