/** 创建http对象 */
function createAjax() {
	var xmlhttp = null;
	if(window.XMLHttpRequest) {
		/** code for IE7+, Firefox, Chrome, Opera, Safari */
		xmlhttp = new XMLHttpRequest();
	} else {
		/** code for IE6, IE5 */
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}
/** Ajax Object */
function AjaxObject(async, type, url, data, dataType, contentType, successFuc, faultFuc) {
	this.async = async; // 异步
	this.type = type; // 提交类型 post get
	this.url = url; // 请求地址
	this.data = data; // 提交数据
	this.dataType = dataType; // 返回数据类型
	this.contentType = contentType; // 提交数据类型
	this.successFuc = successFuc; // 成功回调函数
	this.faultFuc = faultFuc; // 失败回调函数
}
var Req = new Object();
Req.ajax = function req_ajax(ajax) {
	Ajax(ajax);
};
Req.post = function req_post(ajax) {
	ajax.type = "post";
	Ajax(ajax);
};
Req.get = function req_get(ajax) {
	ajax.type = "get";
	Ajax(ajax);
};
/** Use of ajax */
function Ajax(ajax) {
	var xmlhttp = xmlhttp || createAjax();
	if(xmlhttp) {
		var ao = new AjaxObject( //
			ajax.async,
			ajax.type || "post", // 默认值post
			ajax.url, //
			ajax.data || "text", //
			ajax.dataType || "text", //
			ajax.contentType || "text", //
			ajax.success, //
			ajax.faultFuc);
		if(typeof(ao.async) != "boolean") {
			ao.async = true;
		}
		xmlhttp.onreadystatechange = function() {
			console.log("aaa  :" + xmlhttp.readyState + "   bbb:" + xmlhttp.status);
			/**
			 * 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
			 */
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if(ao.successFuc && typeof(ao.successFuc) == "function") {
					switch((String(ao.dataType)).toLowerCase()) {
						case "json":
							ao.successFuc(JSON.parse(xmlhttp.responseText));
							break;
						default:
							ao.successFuc(xmlhttp.responseText);
							break;
					}
				}
			} else {
				if(ao.faultFuc && typeof(ao.faultFuc) == "function")
					ao.faultFuc(xmlhttp.responseText);
			}
		}
		xmlhttp.open(ao.type, ao.url, ao.async);
		// 有数据 POST请求
		if(ao.data && (String(ao.type)).toLowerCase() == "post") { // 提交数据不为空
			switch((String(ao.contentType)).toLowerCase()) {
				case "json":
					if(typeof(ao.data) == "object") { // 数据类型为对象
						ao.data = JSON.stringify(ao.data);
					}
					xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
					break;
				default:
					if(typeof(ao.data) == "object") { // 数据类型为对象
						ao.data = allParams(ao.data);
					}
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					break;
			}
			xmlhttp.send(ao.data);
		} else {
			xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
			xmlhttp.send(JSON.stringify(ao.data));
		}

	}
}
/** 将对象转化成url参数模型 */
function allParams(obj) {
	// 用来保存所有的属性名称和值
	var props = "";
	// 开始遍历
	for(var p in obj) { // 方法
		if(typeof(obj[p]) == " function ") { >>>
			obj[p]();
		} else { // p 为属性名称，obj[p]为对应属性的值
			props += p + "=" + obj[p] + "&";
		}
	} // 最后显示所有的属性
	props = props.substr(0, props.length - 1);
	return props;
}