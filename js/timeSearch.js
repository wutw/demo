
//时间插件:日，月，年，最近几天，自定义时间段:yyyy-mm-dd ; yyyy-mm-dd hh-mm;yyyy-mm-dd hh-00  可查询，导出，新增
/**
 * 时间控件
 *
 * @param id
 * @param d
 * @param m
 * @param y
 * @param s
 * @param list 最近几天
 * @param callback
 * @param jeType
 */
var initDate = function(id, d, m, y, s,list, callback, jeType, exportFlag, exportCallback, addFlag, addEvent,customTime){/* id: 父元素的id；d: 日数据；m: 月数据；y: 年数据；s:自定义时段；callback：数据点击回调函数；jeType：时间控件类型 */

    $(id).html('');

    var sid = id.substring(1);
    var search = '<div class="form-group"><div class="col-md-4">时间选择:</div><div class="col-md-8"><select  id= "'+sid+'searchOption"></select></div></div>';
    var day='<option  data-type="day" name="'+ sid +'option" id="'+sid+'_day" >日数据</option>';
    var month='<option  data-type="month" name="'+ sid +'option" id="'+sid+'_month" >月数据</option>';
    var year='<option data-type="year" name="'+ sid +'option" id="'+sid+ '_year" >年数据</option>';
    var self='<option data-type="Self"  name="'+ sid +'option" id="'+sid+'_Self" >自定义时间段</option>';
    $(id).append(search);
    var searchContent = sid+'searchOption';
    var searchId = '#'+searchContent;

    //最近几天
    if (list.length > 0 ){
      for(var p in list) {
         var auto='<option class="auto" data-num = "'+list[p]+'" data-type = "Auto'+list[p]+'"  name="'+ sid +'option '+ list[p] +'"  id="'+sid+'_Auto'+list[p]+'" >最近'+list[p]+ '天</option>';
       $(searchId).append(auto);
      }
        console.log( $(searchId).html());


   }
    if(s == true){
        $(searchId ).prepend(self);
    }
    if(y == true){
        $(searchId).prepend(year);
    }
    if(m == true){
        $(searchId).prepend(month);
    }
    if(d == true){
        $(searchId).prepend(day);
    }


    $(searchId).children('#'+ sid + '_'+ jeType).prop('selected','true');


    var je = '';

    if(jeType == 'year'){
        je = '<label class="form-group"><div class="col-xs-4 inline-label">年度:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="year" type="text" readonly=""></div></label>';

        $(id).append(je);

        $(id+' #year').jeDate({
          /*  trigger:false,*/
            isinitVal: true,
            festival: false,
            ishmsVal: false,
            minDate: '',
            maxDate: $.nowDate(0),
            format: "YYYY",
            zIndex: 3000
        });
    }

    if(jeType == 'month'){
        je = '<label class="form-group"><div class="col-xs-4 inline-label">月份:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="month" type="text" readonly=""></div></label>';

        $(id).append(je);

        $(id+' #month').jeDate({
            isinitVal: true,
            festival: false,
            ishmsVal: false,
            minDate: '',
            maxDate: $.nowDate(0),
            format: "YYYY-MM",
            zIndex: 3000
        });
    }

    if(jeType == 'day'){
        je = '<label class="form-group"><div class="col-xs-4 inline-label">日期:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="day" type="text" readonly=""></div></label>';

        $(id).append(je);

        $(id+ ' #day').jeDate({
            isinitVal: true,
            festival: false,
            ishmsVal: false,
            minDate: '',
            maxDate: $.nowDate(0),
            format: "YYYY-MM-DD",
            zIndex: 3000
        });
    }
     //最近几天
    if(jeType.indexOf('Auto')!= -1){
    $('.auto').each(function(){

        var dataNum = $(this).attr("data-num");
        var dataNum1 = $(searchId +' #'+sid+'_'+jeType).attr('data-num');

        je = '<label class="selfTime form-group"><div class="col-xs-4 inline-label">开始时间:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="startInputAuto'+dataNum+'" type="text" readonly=""></div></label>'+
            '<label class="selfTime form-group"><div class="col-xs-4 inline-label">结束时间:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="endInputAuto'+dataNum+'" type="text" readonly=""></div></label>';

        if(dataNum == dataNum1){
             $(id).append(je);
                $(id+' #startInputAuto'+dataNum).jeDate({
                    isinitVal:true,
                    initAddVal:{DD:"-"+dataNum},
                    festival:false,
                    inhmsVal:false,
                    minDate: $.nowDate({DD:"-"+dataNum}),
                    maxDate: $.nowDate({DD:"-"+dataNum}),
                    format:'YYYY-MM-DD',
                    zIndex:3000
                 });
                 $(id+' #endInputAuto'+dataNum).jeDate({
                     isinitVal:true,
                     festival:false,
                     inhmsVal:false,
                     minDate: $.nowDate(0),
                     maxDate: $.nowDate(0),
                     format:'YYYY-MM-DD',
                     zIndex:3000
                  });

         }
    });
        /*var startDate = getStartDate("#timeSearch");
        console.log(startDate);
        var endDate = getEndDate("#timeSearch");
        console.log(endDate);*/
    }


    if(jeType == 'Self'){
        je = '<label class="selfTime form-group"><div class="col-xs-4 inline-label">开始时间:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="startInputSelf" type="text" readonly=""></div></label>'+
            '<label class="selfTime form-group"><div class="col-xs-4 inline-label">结束时间:</div><div class="col-xs-8"><input class="form-control input-sm wicon" id="endInputSelf" type="text" readonly=""></div></label>';

        $(id).append(je);
        var dateNow = new Date();
        var dateNowStr ='';
        var startValue = {
            format: 'YYYY-MM-DD',
            minDate: '', //设定最小日期为当前日期
            isinitVal:true,
            festival:false,
            ishmsVal:false,
            maxDate: $.nowDate(0), //最大日期
            choosefun: function(elem,datas){
                endValue.minDate = datas; //开始日选好后，重置结束日的最小日期
                endValue.trigger = false;

            }
        };
        var endValue = {
            format: 'YYYY-MM-DD',
            minDate: '', //设定最小日期为当前日期
            isinitVal: true,
            festival: false,
            ishmsVal: false,
            maxDate: $.nowDate(0), //最大日期
            choosefun: function (elem, datas) {
                startValue.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
            }
        };
        if(customTime == 'correctDay'){


             dateNowStr = dateNow.format("yyyy-MM-dd");


        }else if(customTime == 'correctMinute'){

            startValue.format = 'YYYY-MM-DD hh:mm';
            endValue.format = 'YYYY-MM-DD hh:mm';
            dateNowStr = dateNow.format("yyyy-MM-dd hh:mm");

        } else {

                startValue.format = 'YYYY-MM-DD hh:mm';

            endValue.format = 'YYYY-MM-DD hh:mm';

             dateNowStr = dateNow.format("yyyy-MM-dd hh:mm");
            dateNowStr = dateNowStr.substring(0,13);

            dateNowStr = dateNowStr+":00";

        }
        $(id+' #startInputSelf').jeDate(startValue);
        $(id+' #startInputSelf').val(dateNowStr);
        $(id+' #endInputSelf').jeDate(endValue);
        $(id+' #endInputSelf').val(dateNowStr);


    }


    var se ='<div class="searchBtn"><a href="javascript:;" id="'+ sid +'search" class="btn">查询</a></div>';
    $(id).append(se);

    $('#'+ sid +'search').on('click', function(){
        if(typeof(callback) != 'undefined'){
            callback();
        } else {

        }
    });

    if (exportFlag) {
         var ser = '<a href="javascript:;" id="'+ sid +'export" class="btn">导出</a>';

        $('.searchBtn').append(ser);


        $('#'+ sid +'export').on('click', function(){
            if(exportCallback != null && exportCallback != '' ){
                exportCallback();
            } else {

            }
        });
    }
    if (addFlag) {
        var serc = '<a href="javascript:;" id="'+ sid +'_add" class="btn">新增</a>';

        $('.searchBtn').append(serc);



        $('#'+ sid +'_add').on('click', function(){
            if(addEvent != null && addEvent != ''){
                addEvent();
            } else {

            }
        });
    }



    /**
     * 单选框点击事件
     */
    $(searchId).on('change', function() {

        var dataType = $(searchId+' option:selected').attr("data-type");

        initDate(id, d, m, y, s, list,callback, dataType, exportFlag, exportCallback, addFlag, addEvent,customTime);


    });

};

/**
 * 获取选中
 */

function getSelected(id){
    var sid = id.substring(1);
    var searchContent = sid+'searchOption';
    var searchId = '#'+searchContent;
    var dataType = '';
    var selected =  $(searchId+' option:selected').attr('id');

    dataType = $("#"+selected).attr('data-type');

    return dataType;
}

/**
 * 获取时间
 */
function getDate(id){

    var dataType = getSelected(id);

    if (undefined == id || null == id) {
        return $('#'+dataType).val();
    }
    return $(id+' #'+dataType).val();
}

/**
 * 获取开始时间
 */
function getStartDate(id) {
    var dataType = getSelected(id);
    if (undefined == id || null == id) {
        return $('#startInput'+dataType).val();
    } else {

        return $(id + ' #startInput'+dataType).val();

    }
}

/**
 * 获取结束时间
 */
function getEndDate(id) {
    var dataType = getSelected(id);
    if (undefined == id || null == id) {
        return $('#endInput'+dataType).val();
    } else {

        return $(id + ' #endInput'+dataType).val();
    }
}
