<template>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="社团名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>


        <el-form-item label="社团人数">
            <el-input type="number" v-model="form.number"></el-input>
        </el-form-item>

        <el-form-item label="优先级">
            <el-input type="number" v-model="form.priority"></el-input>
        </el-form-item>

        <el-form-item label="社团照片">
            <el-upload
                    action="/api/MassController/upload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleAvatarSuccess"

                    :auto-upload="true"
                    :http-request="myUpload"
                    :file-list="fileList"
                    ref="upload"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>

        <el-form-item label="团长">
            <treeselect
                    name="demo"
                    :multiple="false"
                    :searchable="true"
                    :open-on-click="true"
                    :disable-branch-nodes="true"
                    :options="options"
                    :limit="3"
                    :max-height="200"
                    v-model="form.leader_userId"
            />
        </el-form-item>
        <el-form-item label="社团介绍">
            <Editor v-bind:vvalue="form.introduction" @input="handelIncrease"></Editor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit2">立即创建</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
    </el-form>



</template>

<script>
    import {getMassUser, uploadImage} from '../../api/api'
    import {editMass} from '../../api/api'
    import Editor from "@/components/Editor";
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import {getProductDetail} from '../../api/api'
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
                    introduction:'',
                    number:'',
                    leader:null,
                    priority:'',
                    leader_userId:null,
                },
                fileList:[],
                // define options
                options: [ {
                    id: '',
                    label: '',
                }, ],
                dialogImageUrl: '',
                textd:'',
                dialogVisible: false
            }
        },
        computed: {//实时计算
            loading() {
                return this.$store.state.loading;
            },
        },


        methods: {
            handleRemove(file, fileList) {
                for(var i = 0;i<this.form.subImages.length;i=i+1){
                    if(this.form.subImages[i]==file.name){
                        this.$delete(this.form.subImages,i)
                    }
                }
                if(this.form.mainImage==file.name){
                    this.form.mainImage="";

                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            submit2: function (res) {
                let parm=this.qs.stringify({
                    id:this.form.id,
                    name:this.form.name,
                    introduction:this.form.introduction,
                    number:this.form.number,
                    leader:this.form.leader,
                    priority:this.form.priority,
                    leader_userId:this.form.leader_userId
                });

                editMass(parm).then(res => {
                    if(res.status===51){
                        alert(res.msg)
                    }
                });
            },
            // 图片上传成功后，后台返回图片的路径
            onSuccess: function (res) {

                if (res.status == 200) {
                    this.imgUrl = res.data.imgUrl;
                }
            },
            handleAvatarSuccess(res) {
                this.form.subImages.push(res.data.url);

            },
            handelIncrease(step) {
                this.form.introduction=step
                console.log(this.form.introduction)
            },
            getParams(){
                let id=this.qs.stringify({
                    id : sessionStorage.getItem("massId"),
                    });
                getProductDetail(id).then((res) => {
                    this.form=res.data;
                });


            },
            getalltype() {
                let parm=this.qs.stringify({
                    mass_id:1
                });
                getMassUser(parm).then(res => {
                    let data=[];
                    data=res.data;
                    data.forEach((item) => {
                        let temp= {
                            id: '',
                            name: '',
                            parentid:'0',
                            children: [],
                        };
                        temp.id=item.id;
                        temp.name=item.name;
                        temp=this.normalizer(temp);
                        this.options.push(temp);
                        });


                });
            },
            normalizer(node){
                //去掉children=[]的children属性
                if(node.children && !node.children.length){
                    delete node.children;
                }
                return {
                    id: node.id,
                    label:node.name,
                    children:node.children
                }
            },
        },
        mounted() {

            this.getalltype();
            this.getParams();
        },
    }

</script>
