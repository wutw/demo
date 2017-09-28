/**
 * Created by zhangsc on 2016/11/17.
 */
YhContent = {
	parameter : '',
	serviceCode : '',
	timestamp : '',
	uuid : ''
};
YhHttp = {
	url : '',
	init : function(code) {
		YhContent.serviceCode = code;
		YhContent.parameter = '';
		YhContent.timestamp = '';
		YhContent.uuid = '';
	},
	send : function(msg, method) {
		var msgStr = JSON.stringify(msg);
		YhContent.parameter = msgStr;
		var msgInfo = JSON.stringify(YhContent);
		var sendString = 'appMsg=' + msgInfo;
		var httpUrl = YhHttpConstant.URL;
		$.ajax({
			type : "POST",
			url : httpUrl,
			data : sendString,
			success : function(result) {
				var resultObj = JSON.parse(result);
				if (result != null && result != '') {
					if (resultObj.resultcode == '0000'||resultObj.resultcode == '0003') {
						method(result);

					} else if (resultObj.resultcode == 'Login-Reset-0000') {
						layer.open({
							title : '用户状态已失效，请重新登录！',
							content : '点击确定跳转到登录页面。',
							yes : function(index, layero) {
								window.location.href = 'login.html';
							}
						});

					} else {
						//layer.closeAll();
						if (resultObj.hasOwnProperty('message')) {
							layer.msg(resultObj.message, {
								icon : 2,
								time : 1000
							});// icon 第几个动画，time 1s后关闭
						} else if (typeof (resultObj.parameter) != 'undefined'
								&& resultObj.parameter.hasOwnProperty('message')) {
							layer.msg(resultObj.parameter.message, {
								icon : 2,
								time : 1000
							});
						} else {
							yhLayer.yhMsg('连接服务器超时，请稍后再试...', 2, 2000);
						}

					}

				} else {
					layer.msg('连接服务器失败...请稍后再试...', {
						icon : 2,
						time : 1000
					});
				}

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

					layer.msg(XMLHttpRequest.status+":"+XMLHttpRequest.statusText, {
						icon : 2,
						time : 1000
					});

			}

		})

	},
	sendLongConnect : function(msg, method) {
		var paramString = JSON.stringify(msg);
		YhContent.parameter = paramString;
		var sendString = "appMsg=" + JSON.stringify(YhContent);
		var httpUrl = YhHttpConstant.URL_LONG_CONNECT;
		$.ajax({
			type : "post",
			url : httpUrl,
			data : sendString,

			success : function(result) {
				var resultObj = JSON.parse(result);
				if (resultObj.resultcode == '0000') {
					method(result);

				} else if (resultObj.resultcode == 'Login-Reset-0000') {
					layer.open({
						title : '用户状态已失效，请重新登录！',
						content : '点击确定跳转到登录页面。',
						yes : function(index, layero) {
							window.location.href = 'login.html';
						}
					});
				} else if (resultObj.resultcode == '0001') {
					yhLayer.yhMsg(resultObj.message, 2, 1000);
				} else {
					return false;
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				layer.msg(XMLHttpRequest.status+":"+XMLHttpRequest.statusText, {
					icon : 2,
					time : 1000
				});


			}
		});

	},

	send_get : function(actionCode, params, callback) {

		var Yh_Interface_Request = {};

		Yh_Interface_Request.action_code = actionCode;
		Yh_Interface_Request.params = params;
		Yh_Interface_Request.callback = callback;

		var url = Yh_Config.INTERFACE_URL + Yh_Interface_Request.action_code;

		// 若没有参数,则url不需要拼接参数
		if ("undefined" == typeof (Yh_Interface_Request.params)) {
			url = url;
		} else {
			// 若存在参数,则循环参数,进行key=value参数拼接
			var paramStr = '';

			for ( var key in Yh_Interface_Request.params) {
				paramStr = paramStr + key + '='
						+ Yh_Interface_Request.params[key] + '&';
			}

			url = url + '?' + paramStr;
		}

		$.get(url, function(result, textstatus, xhr) {

			if (result == 'logout') {
				location.href = 'login.html';
				return;
			}

			if (result.result == true) {

				// 将value值为null的值统一设置为--
				deleteEmptyProperty(result);

				if ("undefined" == typeof (Yh_Interface_Request.callback)) {
					return;
				}
				Yh_Interface_Request.callback(result);
			} else {

				if (actionCode == Yh_Interface_Constants.Action_Url.LOGIN) {
					loadCaptcha();
				}

				layer.alert(result.message);
			}

		});
	}

};
