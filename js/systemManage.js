    /**
     * Created by wtw on 2017/7/19.
     */

    $(function() {

        initTree();
    });
    var initTree = function(){
        var resultObj ={
            parameter:{
                list:[{
                    id: '0',
                    groupName: '系统管理',
                    list: [{
                        id:' 00',
                        monitorType: '00',
                        monitorName: '车辆信息管理',
                        list:[{
                            id: '000',
                            sensorType: '000',
                            sensorName: '车辆管理',
                            href:'carManage.html'
                        }]

                    }, {
                        id:' 01',
                        monitorType: '01',
                        monitorName: '系统信息管理',
                        list:[{
                            id: '001',
                            sensorType: '001',
                            sensorName: '系统信息绑定管理',
                            href:'page.html'
                        }]
                    },
                        {
                            id:' 02',
                            monitorType: '02',
                            monitorName: '信息管理',
                            list:[{
                                id: '002',
                                sensorType: '002',
                                sensorName: '车辆订单管理',
                                href:'page3.html'
                            }]

                        } ]
                }]



            },
            resultcode:'0000',
            message:''

        };
        if(null != resultObj && '' != resultObj) {
            var data = resultObj.parameter;
            //树
            var tpl = $('#nav-tpl').html();
            var content = juicer(tpl, data);
            $('#side-menu').html(content);

            $('.monitor,.menu-3').css('display','none');

        }
        else if(resultObj.resultcode != YhHttpConstant.ResultCode.SUCCESS) {
        yhLayer.yhMsg(resultObj.message, 1, 1000);
    } else {
        yhLayer.yhMsg('查询数据失败，请稍后再试...', 0, 1000);
    }



    };



     $('#side-menu').on('click','.menu-1,.menu-2',function(){

        $(this).toggleClass('show').next('ul').slideToggle(300).parent('li').siblings('li').children('a').removeClass('show').next('ul').slideUp(300);



     });
    $('#side-menu').on('click','.sensorJs',function() {

        var title = $(this).text();
        $('#titleName').text(title);

        $(this).addClass('visited').find('input').prop('checked', 'true').parents('.menuChapter').siblings('li').children('ul').find('.sensorJs').removeClass('visited').children('input').removeAttr('checked');
        //menuItem();
        var dataUrl = $(this).attr('href'),
            dataIndex = $(this).find('input').attr('id');

        if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;



            // 添加选项卡对应的iframe
            var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
            $('.container ').append(str1).show();
            $('.container .J_iframe:eq(0)').remove();

            var loading = layer.load();

            $('.container iframe:visible').load(function () {
                //iframe加载完成后隐藏loading提示
                layer.close(loading);

            });
            return false;//不return false就会跳转到子页面

    });

    //子导航栏与导航栏切换
    $(window).bind('resize',function(){
        var page = {
            w:'',
            h:''
        };
        page.w = $(window).width();
         page.h = $(window).height();
        if(page.w < 769){
            $('.tree-navbar').hide(100);
            setTimeout(function(){$('.navbarSide').fadeIn(300)},100);

        }
        else{

            $('.navbarSide').hide(100);

            setTimeout( function(){$('.tree-navbar').fadeIn(300)}, 100);

        }
        $('.tree-navbar,.navbarSide').css('height',page.h  + 'px');
    });

    $('.navbarSide').on('click',function(){

        $('.navbarSide').hide(100);
        setTimeout( function(){$('.tree-navbar').fadeIn(300)}, 100);



    });





