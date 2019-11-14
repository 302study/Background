<template>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="用户名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
            <el-input type="number" v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit2">立即创建</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
    </el-form>



</template>

<script>
    import {updateUser,selectUserById} from '../../api/api'
    import Editor from "@/components/Editor";
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        components: {
            Editor,
            Treeselect ,
        },
        data() {
            return {
                form: {
                    id:'',
                    name: '',
                    telephone:'',
                    email:'',
                },
            }
        },
        computed: {//实时计算
            loading() {
                return this.$store.state.loading;
            },
        },


        methods: {
            submit2: function (res) {
                let parm=this.qs.stringify({
                    id:this.form.id,
                    name:this.form.name,
                    telephone:this.form.telephone,
                    email:this.form.email,
                });
                updateUser(parm).then(res => {
                    if(res.status===51){
                        alert(res.msg)
                        this.$router.push({
                            path: '/user',
                        })
                    }
                });
            },
            getParams(){
                let id=this.qs.stringify({
                    id : sessionStorage.getItem("userId"),
                });
                selectUserById(id).then((res) => {
                        this.form=res.data;
                });
            },

        },
        mounted() {
            this.getParams();
        },
    }

</script>
