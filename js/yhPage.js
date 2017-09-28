/**
 * Created by zhan on 2016/11/15.
 */

var tips = {
	queryMsg: '查询失败，请稍后再试...',
    msg:'操作失败，请稍后再试...'
};

var yhPage = {
    queryTable : function(queryParam, code) {
        YhHttp.init(code);
        YhHttp.send(queryParam, queryCallback);
    },
   //增删改弹出层
    /*
     * title:弹出层标题
     * code：路径
     * elements:"#id"   弹出层id
     * formId:"#id"    form表单id
     * preModifyLayer:  向后台发送的数据    删除操作发对象，新增/修改操作发函数/null
     * additionAddLayer  新增/修改操作可向后台发函数/null
     * */
 modifyLayer : function(title, code, elements,formId,preModifyLayer,additionAddLayer) {

        layer.open({
            type: 1,
            title:  title,
            area: 'auto',
            maxWidth:'750px',
            shadeClose: false,
            content: $(elements),
            btn: ['确定','取消'],
            yes: function(index, layero){

                if(formId != ''){
                    if(! $(formId).valid()) {
                        return 0;
                    }
                }//校验表单，删除时传''

                var modifyFromData = {};

                if(preModifyLayer != null){
                    if (typeof(preModifyLayer) == 'function') {

                        //若发送后台数据不是{"name1":"value1","name2":"value2"}形式，
                        // 函数preModifyLayer，返回所需数据
                        modifyFromData = preModifyLayer(modifyFromData);



                    } else if(typeof(preModifyLayer) == 'object'){
                    //删除时传对象
                        modifyFromData = preModifyLayer;

                    }
                }

                else {
                // 循环页面form list，组装{"name1":"value1","name2":"value2"...}
                    // [每个表单标签上自定义一个data-key，获取data-key的值。]
                $('.yh-input').each(function(){
                    var key = $(this).attr('data-key');
                    modifyFromData[key] =$(this).val();
                });

                    //modifyFromData{"name1":"value1","name2":"value2",list:[]}
                    // 调用函数additionAddLayer，返回modifyFromData.list

                    if (typeof(additionAddLayer) == "function") {
                        modifyFromData = additionAddLayer(modifyFromData);
                    }
                        console.log(modifyFromData);

               }
                // 发送ajax到后台
               /* YhHttp.init(code);
                YhHttp.send(modifyFromData,layerCallback);
         */
                yhLayer.yhMsg('操作成功', 1, 1000);


            },btn2: function(index, layero){
                layer.msg('您已取消操作', {
                    time: 2000, //1s后自动关闭
                    btn: ['知道了']
                })
            }
        });
    },


    detailLayer : function(title) {
        layer.open({
            type: 1,
            title: title + '详情',
            area: 'auto',
            maxWidth: '400px',
            shadeClose: false,
            content: $('#showDetails'),
            btn: ['确定'],
            yes: function(index, layero){
                layer.close(index);
            }
        });
    },

    yhPagination : function(pageSize, pageNum, totalCount, listCountArray, pageEventHandler){
        $('#pagination-container').pagination({
            dataSource: listCountArray,
            totalNumber: totalCount,
            pageSize: pageSize,
            pageNumber: pageNum,
            autoHidePrevious: true,
            autoHideNext: true,
            showNavigator: true,
            formatNavigator: '第 <span style="color: #7EB23A;"><%= currentPage %></span> 页，共 <%= totalPage %> 页，共 <%= totalNumber %> 条数据',
            alias: {
                pageNumber: 'pageNum',
                pageSize: 'pageSize'
            },
            callback: function(){

            }
        });

        $(".paginationjs-page").click(function () {
            var pageSizes = $('#pages').find('option:selected').val();
            var pageNum = $(this).attr("data-num");
            pageEventHandler(pageSizes, pageNum);
        });

        $(".paginationjs-prev").click(function () {
            var pageSizes = $('#pages').find('option:selected').val();
            var pageNum = $(this).attr("data-num");
            pageEventHandler(pageSizes, pageNum);
        });

        $(".paginationjs-next").click(function () {
            var pageSizes = $('#pages').find('option:selected').val();
            var pageNum = $(this).attr("data-num");
            pageEventHandler(pageSizes, pageNum);
        });
    }
};

var queryCallback = function(result){
	yhLayer.yhLoading();
	var resultObj = JSON.parse(result);
	if(result != null && result != ''){
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

            yhPage.formatter();
		}
		
	} else if(resultObj.resultcode != YhHttpConstant.ResultCode.SUCCESS) {
		yhLayer.yhMsg(resultObj.message, 1, 1000);
	} else {
		yhLayer.yhMsg(tips.queryMsg, 0, 1000);
	}	
};

//系统管理中新增,修改功能后回调
var layerCallback = function(result){
	yhLayer.yhLoading();
	var resultObj = JSON.parse(result);
	if(null != result && '' != result){/*不要强刷页面*/
        yhLayer.yhCloseLoading();

        yhLayer.yhMsg(resultObj.parameter.message, 1, 1000);

    } else if(resultObj.resultcode != YhHttpConstant.ResultCode.SUCCESS){
		yhLayer.yhMsg(resultObj.message, 2, 1000);
	} else {
		yhLayer.yhMsg(tips.msg, 0 ,1000);
	}
};



$('#pages').change(function () {
    var pageSizes = $('#pages').find('option:selected').val();
    pageEventHandler(pageSizes, 1);
});



$("body").keydown(function() {
    if (event.keyCode == "13") {//keyCode=13是回车键
        $('#search').trigger('click');
    }
});