(function (win) {
    var teacher = {
        init: function () {
            this.initEvent();
            this.initTeacherTable();
            this.initchart()
        },
        initEvent: function () {
            var _this = this;
            var params = {

            };
            //文件上传初始化
            $('#lifephoto').fileupload({
                dataType: 'json',
                done: function (e, data) {
                    var url = data.result.url;
                    params.lifephoto = url;

                    //做一个照片预览效果
                    $(".img-area-file div").append("<img src='"+url+"' width='100px' height='100px'>");
                    $(".img-area-file div").animate({"marginLeft":100},1000);
                }
            });
            $(".btn-addTeacher").on("click",function () {
                var arrs = $("#teacherForm").serializeArray();
                console.log(arrs);

                for (var i=0;i<arrs.length;i++){
                    params[arrs[i].name] = arrs[i].value;
                }
                // console.log(params);
                $.ajax({
                   type: "POST",
                    url: "../api/addTeacher.php",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        // console.log(data);
                        if(data.status=='ok'){
                            $(".close").click();
                            _this.refresh();
                        }
                    }
                });
            });
        },
        refresh: function(){
            $("#teacherTableId").bootstrapTable("refresh");
        },
        initTeacherTable: function () {
            var _this = this;
            //画表格
            $("#teacherTableId").bootstrapTable({
                url: "../api/queryTeacher.php",
                pagination: true,// 分页

                //数据在解析之前都会调用rowStyle回调函数
                rowStyle: function(row,index){
                    // console.log(row);
                    // console.log(index);
                    row.lifephoto = "<img width='100' height='100' src='"+row.lifephoto+"'>";
                    row.operation = "<a class='btn btn-danger teacherDelete' data-tid='"+row.id+"'>删除</a>"
                    //每次调一行，在这里处理函数性能变差
                    return row;
                },

                //数据加载完成触发
                onLoadSuccess: function(){
                    //获取页面元素，添加时间(事件代理)
                    $("#teacherTableId").on("click",".teacherDelete",function () {
                        //删除 根据id进行删除
                        var id = this.dataset['tid'];
                        $.ajax({
                            type: "get",
                            url: "../api/delTeacher.php",
                            data: {
                                tid: id
                            },
                            dataType: "json",
                            success: function(data) {
                                if(data.code==200){
                                    _this.refresh();
                                }
                            }
                        })
                    })
                },

                sidePagination: "server",
                // 通过parmas向服务器设置参数
                queryParams: function(params){
                    params.pageSize = 10;
                    params.page = params.offset/params.pageSize + 1;
                    return params;
                },

                columns: [{
                    checkbox: true
                },{
                    field: 'username',
                    title: '讲师姓名'
                },{
                    field: 'age',
                    title: '年龄',
                },{
                    field: 'lesson',
                    title: '所属学科',
                },{
                    field: 'lifephoto',
                    title: '讲师照片',
                },{
                    field: 'other',
                    title: '描述',
                },{
                    field: 'operation',
                    title: '操作',
                }],
            });
        },
        initchart: function () {
            //通过ajax获取数据后进行填充
            $.ajax({
                url: "../api/queryTeacher.php?page=1&pageSize=10",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    // console.log(data);

                    var name = [];
                    var ages = [];
                    for(var i=0;i<data.rows.length;i++){
                        ages.push(data.rows[i].age);
                        name.push(data.rows[i].username);
                    }
                    //画柱状图报表
                    var myChar = echarts.init(document.getElementById("main"));
                    var option = {
                        title: {
                            text: '讲师介绍'
                        },
                        tooltip: {},
                        legend: {
                            data: ["介绍"]
                        },
                        xAxis: {
                            data: name
                        },
                        yAxis: {},
                        series: [{
                            name: '介绍1',
                            type: 'bar',
                            data: ages
                        }]
                    };
                    myChar.setOption(option);

                    //画饼图报表
                    echarts.init(document.getElementById('piechart')).setOption({
                        series: {
                            type: 'pie',
                            data: [
                                {name: 'A', value: 1212},
                                {name: 'B', value: 2323},
                                {name: 'C', value: 1919}
                            ]
                        }
                    });
                }
            });
        }
    };
    teacher.init();
})(window);
