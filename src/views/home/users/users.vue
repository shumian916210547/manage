<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div style="margin-top: 15px">
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
            <el-button type="primary" @click="dialogVisible = true"
              >添加用户</el-button
            >
            <el-dialog
              title="添加用户"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
              @close="formClose"
            >
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="addform"
                :rules="rules"
                ref="addformmsg"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="addform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="addform.password"
                    type="password"
                    auto-complete="new-password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="addform.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                  <el-input v-model="addform.tel"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
      <el-table :data="users" style="width: 100%" border stripe>
        <el-table-column
          type="index"
          style="text-align: center"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="180"
          prop="username"
        ></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showAlterUser(scope.row.id)"
              circle
            ></el-button>
            <el-dialog
              title="修改用户信息"
              :visible.sync="alterdialogVisible"
              width="30%"
              :before-close="handleClose"
              @close="alterformClose"
            >
              <el-form
                :label-position="labelPosition"
                ref="alterform"
                label-width="80px"
                :model="alterform"
                :rules="alterUserRules"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model="alterform.username"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="alterform.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                  <el-input v-model="alterform.tel"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="alterdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterconfirm"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-tooltip content="删除" placement="top-end" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="(deluserform = true), (userid = scope.row.id)"
                circle
              ></el-button>
            </el-tooltip>
            <el-dialog
              title="警告"
              :visible.sync="deluserform"
              width="30%"
              :before-close="handleClose"
              :show-close="false"
            >
              <span>确定删除用户？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="deluserform = false">取 消</el-button>
                <el-button type="primary" @click="deluser">确 定</el-button>
              </span>
            </el-dialog>
            <el-tooltip
              content="分配角色"
              placement="top-end"
              :enterable="false"
            >
              <el-button
                type="info"
                icon="el-icon-setting"
                @click="allotRole(scope.row)"
                circle
              ></el-button>
            </el-tooltip>
            <el-dialog
              title="分配角色"
              :visible.sync="allotRoledialog"
              width="30%"
              :before-close="handleClose"
            >
              <div class="allotUserInfo">
                <p>用户名：{{ userInfo.username }}</p>
                <p>角色：{{ userInfo.role_name }}</p>
                <p>
                  分配角色：<el-select
                    v-model="selectRoleid"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in rolelist"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </p>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="allotRoledialog = false">取 消</el-button>
                <el-button type="primary" @click="submitNewroles(userInfo.id)"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
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
import {
  getUsers,
  addUsers,
  queryUserinfo,
  alterUserinfo,
  changeUserstate,
  deleteUser,
  getRoles,
  newRoles,
} from "network/home/users/users";

export default {
  name: "users",
  components: {},
  props: {},
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的邮箱"));
      }
    };
    var checkTel = (rule, value, callback) => {
      const regTel = /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
      if (regTel.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的手机号"));
      }
    };
    return {
      selectRoleid: "",
      userInfo: [],
      rolelist: [],
      allotRoledialog: false,
      users: [],
      total: 0,
      query: "",
      pagenum: 1,
      pagesize: 5,
      dialogVisible: false,
      labelPosition: "right",
      alterdialogVisible: false,
      deluserform: false,
      userid: "",
      addform: {
        username: "",
        password: "",
        email: "",
        tel: "",
      },
      alterform: {
        username: "",
        email: "",
        tel: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 - 10 字符",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 - 12 位",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            validator: checkTel,
            trigger: "blur",
          },
        ],
      },
      alterUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 - 10 字符",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            validator: checkTel,
            trigger: "blur",
          },
        ],
      },
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
    userStateChange(userInfo) {
      changeUserstate(userInfo.id, userInfo.mg_state).then((res) => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "设置成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "设置失败",
          });
        }
      });
      console.log(userInfo);
    },
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.getUsersList(this.query, this.pagenum, this.pagesize);
    },
    handleCurrentChange(newcurrentsize) {
      this.pagenum = newcurrentsize;
      this.getUsersList(this.query, this.pagenum, this.pagesize);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    formClose() {
      this.$refs.addformmsg.resetFields();
    },
    alterformClose() {
      this.$refs.alterform.resetFields();
    },
    adduser() {
      /* this.dialogVisible = fasle; */
      this.$refs.addformmsg.validate((verify) => {
        if (verify == false) {
          this.$message({
            type: "error",
            message: "添加失败",
          });
        } else {
          addUsers(
            this.addform.username,
            this.addform.password,
            this.addform.email,
            this.addform.tel
          ).then((res) => {
            if (res.data.meta.status == 201) {
              this.dialogVisible = false;
              this.getUsersList(this.query, this.pagenum, this.pagesize);
              this.$message({
                type: "success",
                message: "添加成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "添加失败",
              });
            }
            console.log(res);
          });
        }
      });
    },
    showAlterUser(userid) {
      this.userid = userid;
      this.alterdialogVisible = true;
      queryUserinfo(userid).then((res) => {
        this.alterform.username = res.data.data.username;
        this.alterform.email = res.data.data.email;
        this.alterform.tel = res.data.data.mobile;
        console.log(res);
      });
    },
    alterconfirm() {
      console.log(this.userid);
      /* this.alterdialogVisible = false; */
      this.$refs.alterform.validate((verify) => {
        if (verify == false) {
          this.$message({
            type: "error",
            message: "修改失败",
          });
        } else {
          alterUserinfo(
            this.userid,
            this.alterform.email,
            this.alterform.tel
          ).then((res) => {
            if (res.data.meta.status == 200) {
              this.alterdialogVisible = false;
              this.getUsersList(this.query, this.pagenum, this.pagesize);
              this.$message({
                type: "success",
                message: "修改成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "修改失败",
              });
            }
          });
        }
      });
    },
    deluser() {
      this.deluserform = false;
      deleteUser(this.userid).then((res) => {
        if (res.data.meta.status == 200) {
          this.getUsersList(this.query, this.pagenum, this.pagesize);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    allotRole(Info) {
      this.selectRoleid = "";
      this.allotRoledialog = true;
      this.userInfo = Info;
      getRoles().then((res) => {
        this.rolelist = res.data.data;
      });
    },
    submitNewroles(userid) {
      if (!this.selectRoleid) {
        this.$message({
          type: "error",
          message: "请分配新角色",
        });
      }
      newRoles(userid, this.selectRoleid).then((res) => {
        if (res.data.meta.status == 200) {
          this.allotRoledialog = false;
          this.$message({
            type: "success",
            message: "角色设置成功",
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
.el-button.is-circle {
  border-radius: 50%;
  padding: 12px;
  margin-left: 10px;
}
.allotUserInfo {
  text-align: left !important;
}
</style>