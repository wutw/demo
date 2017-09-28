/**
 * Created by wtw on 2017/7/8.
 */
var queryData = {
    page: {
        currentPage: '',
        pageSize: ''
    },


};

$(function(){



    queryTable();
    select();
    var titleName = $('.chapter.active>a').text();
    $('#titleName').text(titleName);

});

function select(){

    var d=[
        {
            groupName:'高速星展'

        },

    ];
    var dataDetail = new Vue({
        el: '#groupName',
        data:{
            items:d
        }

    });

    var dataDetail1 = new Vue({
        el:'#add-groupName',
        data:{
            items:d
        }
    });
    var dataDetail2 = new Vue({
        el:'#m-groupName',
        data:{
            items:d
        }
    })
}




var queryTable = function(){

    var resultObj ={
        "parameter": {
            "list": [
                {
                    "finalTime": 1486547313000,
                    "monitorName": '陕A0001',
                    "color": "银白",
                    "id": 0,
                    "driver": "张德群",
                    "driveStatus": "正常",
                    "groupName": "高速星展",
                    "carStyle": "前四后八",
                    "application": "道理普通运输",
                    "birthPlace": "陕西省"


                },
                {
                    "finalTime": 1486547313000,
                    "monitorName": '陕A0002',
                    "color": "银白",
                    "id": 1,
                    "driver": "张德群",
                    "driveStatus": "正常",
                    "groupName": "高速星展",
                    "carStyle": "前四后八",
                    "application": "道理普通运输",
                    "birthPlace": "陕西省"


                },
                {
                    "finalTime": 1486547313000,
                    "monitorName": '陕A00011',
                    "color": "银白",
                    "id": 2,
                    "driver": "张德群",
                    "driveStatus": "正常",
                    "groupName": "高速星展",
                    "carStyle": "前四后八",
                    "application": "道理普通运输",
                    "birthPlace": "陕西省"


                },
                {
                    "finalTime": 1486547313000,
                    "monitorName": '陕A00012',
                    "color": "银白",
                    "id": 3,
                    "driver": "张德群",
                    "driveStatus": "正常",
                    "groupName": "高速星展",
                    "carStyle": "前四后八",
                    "application": "道理普通运输",
                    "birthPlace": "陕西省"


                },
                {
                    "finalTime": 1486547313000,
                    "monitorName": '陕A00013',
                    "color": "银白",
                    "id": 4,
                    "driver": "张德群",
                    "driveStatus": "正常",
                    "groupName": "高速星展",
                    "carStyle": "前四后八",
                    "application": "道理普通运输",
                    "birthPlace": "陕西省"


                }
            ],
            "page": {
                "count": 5,
                "currentPage": 1,
                "index": 0,
                "pageSize": 10,
                "pages": 1
            }
        },
        "resultcode": "0000",
        "timestamp": "20170707100710"
    };
    yhLayer.yhLoading();

    if(resultObj != null && resultObj != ''){
        var gridData = resultObj.parameter;
        yhLayer.yhCloseLoading();
        if(gridData.list.length == 0){
            $("#yh-grid").html("暂无数据");
            yhPage.yhPagination(10, 0, 0, [], null);
        }else{
            var page = resultObj.parameter.page;
            var tpl = $('#yh-grid-template').html();
            var htmlContent = juicer(tpl, gridData);
            $("#yh-grid").html("");
            $("#yh-grid").html(htmlContent);

            var listCountArray = [];
            for (var i=0;i<page.count;i++) {
                listCountArray.push(i);
            }
            /* 分页 */
            yhPage.yhPagination(page.pageSize, page.currentPage, page.count, listCountArray, pageEventHandler);


        }

    } else if(resultObj.resultcode != YhHttpConstant.ResultCode.SUCCESS) {
        yhLayer.yhMsg(resultObj.message, 1, 1000);
    } else {
        yhLayer.yhMsg(tips.queryMsg, 0, 1000);
    }

};
/*分页查询*/
var pageEventHandler = function (pageSizes, pageNum) {


    if (pageSizes == null || pageSizes == "") {
        queryData.page.pageSize = 10;
    } else {
        queryData.page.pageSize = pageSizes;
    }

    if (pageNum == null || pageNum == "") {
        queryData.page.currentPage = 1;
    } else {
        queryData.page.currentPage = pageNum;
    }

    //        yhPage.queryTable(queryData, YhHttpConstant.ServiceKey.LIST_MONITOR_INFO_BY_PAGE);
    queryTable();
};

$('#search').on('click',function(){
    if($('#queryForm').valid()){
        queryData.page.currentPage = 1;
        queryData.page.pageSize = 10;

        /* yhPage.queryTable(queryData, YhHttpConstant.ServiceKey.LIST_MONITOR_INFO_BY_PAGE);
         */
        queryTable();
    }

});
/*新增*/
$("#add").on('click',function(){
    $('#addForm input').val('');
    $('#addForm select').each(function(){
        $(this).find('option:first').prop('selected',true);
    });

    yhPage.modifyLayer('新增传感器', '','#addLayer','#addForm',null,null);
});

//修改

$("#yh-grid").on('click','.modify',function(){
    $('#m-monitorName').val($(this).attr('data-monitorName'));
    $('#m-birthPlace').val($(this).attr('data-birthPlace'));
    $('#m-color').val($(this).attr('data-color'));
    $('#m-driver').val($(this).attr('data-driver'));
    $('#m-driveStatus').val($(this).attr('data-driveStatus'));
    $('#m-carStyle').val($(this).attr('data-carStyle'));
    $("#m-application").val($(this).attr("data-application"));
    $("#m-finalTime").val($(this).attr("data-finalTime"));

    var groupName = $(this).attr('data-groupName');
    selectedOption('m-groupName',groupName);

    yhPage.modifyLayer('修改车辆信息', '', '#modifyLayer','#modifyForm',null,null);
});

var deleteData = {
    sensorId:''
};
$("#yh-grid").on('click','.delete',function(){
    deleteData.sensorId = $(this).attr("data-id");
    yhPage.modifyLayer('删除传感器','','#deleteLayer','',deleteData,null);
});