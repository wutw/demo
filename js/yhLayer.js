/**
 * Created by zhan on 2016/11/15.
 */

var yhLayer = {
	confirm: function (msg, opts, yes, no) {
		return layer.confirm(msg, opts, yes, no);
	},//msg是提示信息，opts是配置，yes是确定回调，no是取消回调


	tips:function (msg,id ,opts) {
		layer.tips(msg, id);
	},//msg是提示信息，id是页面元素，opts 是位置及颜色设置
	cancel: function(){
		layer.msg('您已经取消了操作',{
			time: 2000,
			btn: ['知道了']
		});
	},
	yhLoading: function(msg){
		yhLoad_index = -1;
		if('' == msg || null == msg){
			msg = '正在处理中，请稍候...';
		}
		yhLoad_index = layer.msg(msg, {icon: 16, time: 30000});
		return yhLoad_index;
	},
	yhCloseLoading:function(i){
	        if(null==i || typeof i == "undefined") {
	            return layer.close(yhLoad_index);
	        }
	        return layer.close(i);
    },
	yhMsg: function(msgCode, index, time){
			layer.msg(msgCode, {icon: index, time: time}, function(){
				window.location.reload();
			});
			//test
			//test
	}
};