/**
 * Created by wtw on 2017/8/3.
 */

//时间插件:日，月，年，周，最近几天，自定义时间段:yyyy-mm-dd ; yyyy-mm-dd hh-mm;yyyy-mm-dd hh-00  可查询，导出，新增,获得时间框内值

var initDate = function(id,selective,y,m,d, w,s,list, searchCallback, jeType, exportFlag, exportsearchCallback, addFlag, addEvent,customTime) {/* id: 父元素的id；d: 日数据；m: 月数据；y: 年数据；s:自定义时段；searchCallback：数据点击回调函数；jeType：时间控件类型 */
    $(id).html('');
    var sid = id.substring(1);
    var searchId = "#"+sid+"searchOption";
    //选择框内容
    var search = '<div class="form-group"><div class="col-md-4">时间选择:</div><div class="col-md-8"><select  id= "'+sid+'searchOption"></select></div></div>';
    var day='<option  data-type="day" name="'+ sid +'option" id="'+sid+'_day" >日数据</option>';
    var month='<option  data-type="month" name="'+ sid +'option" id="'+sid+'_month" >月数据</option>';
    var year='<option data-type="year" name="'+ sid +'option" id="'+sid+ '_year" >年数据</option>';
    var week='<option data-type="week" name="'+ sid +'option" id="'+sid+ '_week" >周数据</option>';
    var self='<option data-type="Self"  name="'+ sid +'option" id="'+sid+'_Self" >自定义时间段</option>';

    if(selective == true){
        $(id).append(search);

        if(y == true){
            $(searchId).append(year);
        }
        if(m == true){
            $(searchId).append(month);
        }
        if(d == true){
            $(searchId).append(day);
        }
        if(w == true){
            $(searchId).append(week);
        }
        if(s == true){
            $(searchId).append(self);
        }
        if(list.length != 0 && list !=''&& list !=null){

            for(var p in list) {
                var auto='<option class="auto" data-num = "'+list[p]+'" data-type = "Auto'+list[p]+'"  name="'+ sid +'option '+ list[p] +'"  id="'+sid+'_Auto'+list[p]+'" >最近'+list[p]+ '天</option>';
                $(searchId).append(auto);
            }
        }
        $(searchId).children('option[data-type='+jeType+']').prop('selected','true');

    }
    //右侧时间框展示
    var je  = '';

    if(jeType == 'year'){
        je = "<label class='form-group'><div class='col-xs-4 inline-label'>年度:</div><div class='col-xs-8'><input class='form-control Wdate ' id='year' type='text' placeholder='请选择时间' onClick='WdatePicker({skin:\"whyGreen\", dateFmt:\"yyyy\", maxDate:\"%y\"})'></div></label>";

        $(id).append(je);

    }
    if(jeType == 'month'){
        je = '<label class="form-group"><div class="col-xs-4 inline-label">月份:</div><div class="col-xs-8"><input class="form-control Wdate " id="month" type="text"  placeholder="请选择时间" onClick="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM\', maxDate:\'%y-%M \'})"></div></label>';

        $(id).append(je);

    }
    if(jeType == 'day'){
        je = '<label class="form-group"><div class="col-xs-4 inline-label">日期:</div><div class="col-xs-8"><input class="form-control Wdate " id="day" type="text" placeholder="请选择时间" onClick="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd\', maxDate:\'%y-%M-%d \'})"></div></label>';
        $(id).append(je);

    }
    //开始时间，结束时间
    if(jeType == 'Self'){
        if(customTime =="correctDay"){

            je = '<label class="form-group"><div class="col-xs-4 inline-label">开始时间:</div><div class="col-xs-8"><input class="form-control Wdate " id="startInputSelf" type="text" placeholder="请选择开始时间" onfocus="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd\', maxDate:$(\'#endInputSelf\').val() ,onpicked:function(){$dp.$(\'endInputSelf\').focus();}})"></div></label>' +
                '<label class="form-group"><div class="col-xs-4 inline-label">结束时间:</div><div class="col-xs-8"><input class="form-control Wdate " id="endInputSelf" type="text" placeholder="请选择结束时间" onfocus="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd\', minDate:$(\'#startInputSelf\').val()})"></div></label>';




        } else if(customTime =="correctMinute"){

            je = '<label class="form-group"><div class="col-xs-4 inline-label">开始时间:</div><div class="col-xs-8"><input class="form-control Wdate " id="startInputSelf" type="text" placeholder="请选择开始时间" onfocus="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd HH:mm\', maxDate:$(\'#endInputSelf\').val() ,onpicked:function(){$dp.$(\'endInputSelf\').focus();}})"></div></label>' +
                '<label class="form-group"><div class="col-xs-4 inline-label">结束时间:</div><div class="col-xs-8"><input class="form-control Wdate " id="endInputSelf" type="text" placeholder="请选择结束时间" onfocus="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd HH:mm\', minDate:$(\'#startInputSelf\').val()})"></div></label>';




        }else{

            je = '<label class="form-group"><div class="col-xs-4 inline-label">开始时间:</div><div class="col-xs-8"><input class="form-control Wdate " id="startInputSelf" type="text" placeholder="请选择开始时间" onfocus="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd HH:00\', maxDate:$(\'#endInputSelf\').val() ,onpicked:function(){$dp.$(\'endInputSelf\').focus();}})"></div></label>' +
                '<label class="form-group"><div class="col-xs-4 inline-label">结束时间:</div><div class="col-xs-8"><input class="form-control Wdate " id="endInputSelf" type="text" placeholder="请选择结束时间" onfocus="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd HH:00\', minDate:$(\'#startInputSelf\').val()})"></div></label>';


        }
        $(id).append(je);


    }
    if(jeType == 'week'){

        je = '<label class="form-group"><div class="col-xs-4 inline-label">周数:' +
            '</div><div class="col-xs-8"><input class="form-control Wdate "  value=" " style="opacity:0" id="week1" type="text" placeholder="请选择时间" onClick="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd\', maxDate:\'%y-%M-%d \',isShowWeek:true , onpicked:function() ' +
            '{$dp.$(\'week\').value=$dp.cal.getP(\'y\')+\'年 第\'+$dp.cal.getP(\'W\',\'W\')+\'周\';} ' +
            '})" >' +
            '<input class="form-control Wdate " id="week" type="text" value=" "  placeholder="请选择时间"></div></label>';

        $(id).append(je);

    }
    //最近几天
    if(jeType.indexOf('Auto') != -1){
        var content = $(searchId).children('option:selected').attr('id');
        var dataNum = $('#'+content).attr('data-num');//天

        je = '<label class="selfTime form-group"><div class="col-xs-4 inline-label">开始时间:</div><div class="col-xs-8"><input class="form-control Wdate" id="startInputAuto'+dataNum+'" type="text" onClick="WdatePicker({skin:\'whyGreen\', dateFmt:\'yyyy-MM-dd\', maxDate:\'%y-%M-%d \'})"></div></label>'+
            '<label class="selfTime form-group"><div class="col-xs-4 inline-label">结束时间:</div><div class="col-xs-8"><input class="form-control Wdate" id="endInputAuto'+dataNum+'" type="text"   onClick="WdatePicker({skin:\'whyGreen\',dateFmt:\'yyyy-MM-dd\', maxDate:\'%y-%M-%d \'})"></div></label>';
        $(id).append(je);

        var dateCurrent = new Date();
        dateCurrent =  dateCurrent.format('yyyy-MM-dd');
        var dateCurrent1 = (new Date()).getTime();
        var dateStart1 = dateCurrent1 - dataNum * 24 * 3600 * 1000;//时间戳
        var dateStart = new Date(dateStart1);
        dateStart =  dateStart.format('yyyy-MM-dd');



        $("#startInputAuto"+dataNum).val(dateStart);
        $("#endInputAuto"+dataNum).val(dateCurrent);


    }


    //查询，新增，导出
    var se ='<div class="searchBtn"><a href="javascript:;" id="'+ sid +'search" class="btn">查询</a></div>';
    $(id).append(se);

    $('#'+ sid +'search').on('click', function(){
        if(searchCallback != null && searchCallback !=''){
            searchCallback();
        } else {

        }
    });

    if (exportFlag) {
        var ser = '<a href="javascript:;" id="'+ sid +'export" class="btn">导出</a>';

        $('.searchBtn').append(ser);


        $('#'+ sid +'export').on('click', function(){
            if(exportsearchCallback != null && exportsearchCallback != '' ){
                exportsearchCallback();
            } else {

            }
        });
    }
    if (addFlag) {
        var serc = '<a href="javascript:;" id="' + sid + '_add" class="btn">新增</a>';

        $('.searchBtn').append(serc);


        $('#' + sid + '_add').on('click', function () {
            if (addEvent != null && addEvent != '') {
                addEvent();
            } else {

            }
        });
    }


    $(searchId).on('change',function(){

        var dataType = $(searchId+' option:selected').attr("data-type");
        initDate(id,selective, y,m,d, w,s,list, searchCallback, dataType, exportFlag, exportsearchCallback, addFlag, addEvent,customTime);

    });


};



/**
 * 获取选中 id与前相同
 */

function getSelected(id){
    var sid = id.substring(1);
    var searchContent = sid+'searchOption';
    var searchId = '#'+searchContent;
    var dataType ='';
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
//hello




