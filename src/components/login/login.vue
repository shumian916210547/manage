<template>
	<div class="login">
		<el-form
			:label-position="labelPosition"
			label-width="80px"
			:model="formLabelAlign"
			class="login_form"
			ref="formLabelAlign"
		>
			<h2 class="form_title">用户登录</h2>
			<el-form-item
				label="用户名"
				prop="username"
				:rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min:3,max:10, message: '用户名长度在 3 - 10 字符', trigger: ['blur', 'change'] }
    ]"
			>
				<el-input v-model="formLabelAlign.username"></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				prop="password"
				:rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min:6,max:12, message: '密码长度在 6 - 12 位', trigger: ['blur', 'change'] }
    ]"
			>
				<el-input
					v-model="formLabelAlign.password"
					autocomplete="off"
					type="password"
					@keydown.enter.native="handlelogin(formLabelAlign.username,formLabelAlign.password)"
				></el-input>
			</el-form-item>
			<el-button @click="resetForm('formLabelAlign')" class="reset_btn">重置</el-button>
			<el-button
				type="primary"
				class="form_btn"
				@click="handlelogin(formLabelAlign.username,formLabelAlign.password)"
			>登录</el-button>
		</el-form>
	</div>
</template>

<script>
	import { login } from "network/login/login";

	export default {
		name: "login",
		components: {},
		props: {},
		data() {
			return {
				labelPosition: "left",
				formLabelAlign: {
					username: "",
					password: "",
				},
			};
		},
		watch: {},
		computed: {},
		methods: {
			handlelogin(username, password) {
				login(username, password).then((res) => {
					if (res.data.meta.status == 200) {
						window.sessionStorage.setItem("token", res.data.data.token);
						this.$router.push("home");
						this.$message({
							type: "success",
							duration: "2000",
							message: "登录成功",
						});
					} else {
						this.$message({
							type: "error",
							message: "登录失败",
						});
					}
				});
			},
			resetForm(resetFrom) {
				this.$refs[resetFrom].resetFields();
			},
		},
		created() {},
		mounted() {},
	};
</script>
<style lang="css" scoped>
	.login {
		height: 100%;
		background: rgb(49, 65, 85);
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.login_form {
		background: white;
		width: 450px;
		border-radius: 10px;
		padding: 20px;
	}
	.form_title {
		text-align: center;
	}
	.reset_btn {
		float: right;
	}
	.form_btn {
		float: right;
		margin-right: 15px;
	}
</style>