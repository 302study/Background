

export default {
    mounted() {

        this.getForumData();

    },
    methods: {


        /**
         * 删除论坛分类数据
         */

        deleteForum() {

            this.delete_loading = true;

            var url = this.ServerIp + this.API.forumDeleteCategory;
            var that = this;

            var params = {};
            params.fc_id = this.$route.query.fc_id;

            this.$http({
                method: 'post',
                url: url,
                data: params
            }).then((res) => {

                this.delete_loading = false;
                this.deleteModel = false;

                if (res.data.success) {
                    that.$router.go(-1);
                } else {
                    that.$Message.error(res.data.result);
                }

            });
        },

        /**
         * 图片上传
         */
        doUpload(files) {
            var that = this;
            this.uploadOneImage(files, function (err, data) {
                if (err) {
                    that.formItem.fc_icon = data.url;
                    that.organizationLogoIsShow = true;
                } else {
                    alert("图片上传失败");
                }

            });
        },
        handleDelete() {

            this.deleteModel = true;

        },

        /**
         * 提交数据
         */
        submit(name) {

            this.$refs[name].validate((valid) => {

                if (valid) {

                    var url = this.ServerIp + this.API.forumUpdateCategory;
                    var that = this;

                    var params = {};
                    params.fc_id = this.$route.query.fc_id;
                    params.fc_name = this.formItem.fc_name;
                    params.fc_desc = this.formItem.fc_desc;
                    params.fc_icon = this.formItem.fc_icon;

                    this.submit_loading = true;
                    this.$http({
                        method: 'post',
                        url: url,
                        data: params
                    }).then((res) => {

                        this.submit_loading = false;

                        if (res.data.success) {
                            that.$Message.success('标签更新成功');
                            that.$router.go(-1);

                        } else {
                            that.$Message.error(res.data.result);
                        }

                    });


                }

            });


        },

        /**
         * 获取数据
         */
        getForumData() {

            var url = this.ServerIp + this.API.forumsSearchCategory + "/fc_id/" + this.$route.query.fc_id;
            var that = this;

            this.$Spin.show();
            this.$http({
                method: 'get',
                url: url
            }).then((res) => {


                this.$Spin.hide();
                if (res.data.success) {

                    var forumData = res.data.result.data[0];
                    that.formItem.fc_name = forumData.fc_name;
                    that.formItem.fc_desc = forumData.fc_desc;
                    that.formItem.fc_icon = forumData.fc_icon;
                    if (that.formItem.fc_name != null && that.formItem.fc_name) {
                        that.categoryLogoIsShow = true
                    } else {
                        that.categoryLogoIsShow = false

                    }
                }

            });


        }

    },
    data() {
        return {
            deleteModel: false,
            submit_loading: false,
            delete_loading: false,
            formItem: {
                fc_name: "",
                fc_icon: "",
                fc_order: "",
                fc_desc: "",
                fc_article_count: "",
                fc_concern_count: "",
            },
            data: [],
            categoryLogoIsShow: false,
            ruleInline: {
                fc_name: [
                    {required: true, message: '论坛分类标题不能为空', trigger: 'blur'},
                ],
                fc_icon: [
                    {required: true, message: '论坛分类logo不能为空', trigger: 'blur'},
                ],
                fc_desc: [
                    {required: true, message: '论坛分类描述不能为空', trigger: 'blur'},
                ]
            }
        }
    }
}


