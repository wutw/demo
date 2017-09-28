/**
 * Created by zhangsc on 2016/12/14.
 */
    /*调用统一的接口*/
var yhSelect = {
    init:function(id,type){
        var queryParam = {
            type:''
        };
        queryParam.type = type;
        YhHttp.init(YhHttpConstant.ServiceKey.QUERY_SELECT);
        YhHttp.send(queryParam,function(result){
            var resultObj = JSON.parse(result);
            if(resultObj.parameter.list!=null&&resultObj.parameter.list!='undefined'){
                var d = resultObj.parameter.list;
                var selectList = new Vue({
                    el: id,
                    data:{
                        items:d
                    }
                })
            }else {
                if(resultObj.hasOwnProperty('message')){
                    layer.msg(resultObj.message,{icon:1,time:1000})
                }else if(resultObj.parameter.hasOwnProperty('message')){
                    layer.msg(resultObj.parameter.message,{icon:1,time:1000})
                }

            }

        });


    }
};

var selectedOption = function(id,data){
    var a = true;
    $('#'+id+'>option').each(function(){
        if($(this).val()==data){
            $(this).prop('selected',true);
            a= false;
        }
        if(a){
            $('#'+id+' option：first').prop('selected',true);
        }
    })

};