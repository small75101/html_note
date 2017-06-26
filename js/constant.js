//写Session它跟浏览器当前会话相关，当会话结束后，数据会自动清除，跟未设置过期时间的Cookie类似
function setSession(key, value) {
	//添加key-value 数据到 sessionStorage
	if(sessionStorage)
		sessionStorage.setItem(key, value);
}
//获取Sessions
function getSession(key) {
	if(sessionStorage)
		return sessionStorage.getItem(key);
	else
		return undefined;
}
//清空所有的key-value数据。
function clearSession() {
	if(sessionStorage)
		sessionStorage.clear();
}
//用户存储永久存储的Web端的数据
function setLocal(key, value) {
	//添加key-value 数据到 sessionStorage
	if(localStorage)
		localStorage.setItem(key, value);
}
//获取Local
function getLocal(key) {
	if(localStorage)
		return localStorage.getItem(key);
	else
		return undefined;
}
//清空Local
function clearLocal() {
	if(localStorage)
		localStorage.clear();
}
//获取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//写cookies 默认一天
//如果需要设定自定义过期时间
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
function setCookie(name, value, time) {
	time = time || "d1";
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//时间换算
function getsec(str) {
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}

/**
 * 判断图片格式
 * @param {Object} id
 */
function checkImg(id) {
	var img_id = document.getElementById(id).value; //根据id得到值
	var index = img_id.indexOf("."); //得到"."在第几位
	img_id = img_id.substring(index); //截断"."之前的，得到后缀
	if(img_id != ".bmp" && img_id != ".png" && img_id != ".gif" && img_id != ".jpg" && img_id != ".jpeg") { //根据后缀，判断是否符合图片格式
		alert("不是指定图片格式,重新选择");
		document.getElementById(id).value = ""; // 不符合，就清除，重新选择
	}
}
/**
 * 判断视频文件格式
 * @param {Object} id
 */
function checkTv(id) {
	var tv_id = document.getElementById(id).value; //根据id得到值
	var index = tv_id.indexOf("."); //得到"."在第几位
	tv_id = tv_id.substring(index); //截断"."之前的，得到后缀
	if(tv_id != ".mp4" && tv_id != ".rmvb" && tv_id != ".avi" && tv_id != ".ts") { //根据后缀，判断是否符合视频格式
		alert("不是指定视频格式,重新选择");
		document.getElementById(id).value = ""; // 不符合，就清除，重新选择
	}
}

/** 
 * 从 file 域获取 本地图片 url 
 */
function getFileUrl(sourceId) {
	var url;
	if(navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
		url = document.getElementById(sourceId).value;
	} else if(navigator.userAgent.indexOf("Firefox") > 0) { // Firefox 
		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
	} else if(navigator.userAgent.indexOf("Chrome") > 0) { // Chrome 
		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
	}
	return url;
}

function projectName() {
	//获取当前网址，如： http://localhost:8080/Tmall/index.jsp 
	//var curWwwPath=window.document.location.href; 

	//获取主机地址之后的目录如：/Tmall/index.jsp 
	var pathName = window.document.location.pathname;
	//var pos=curWwwPath.indexOf(pathName); 

	//获取主机地址，如： http://localhost:8080 
	//var localhostPaht=curWwwPath.substring(0,pos); 

	//获取带"/"的项目名，如：/Tmall 
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return projectName;
}
/* 
 * 用来遍历指定对象所有的属性名称和值 
 * obj 需要遍历的对象 
 * author: Jet Mah 
 */
function allPrpos(obj) {
	// 用来保存所有的属性名称和值 
	var props = "";
	// 开始遍历 
	for(var p in obj) {
		// 方法 
		if(typeof(obj[p]) == " function ") {
			obj[p]();
		} else {
			// p 为属性名称，obj[p]为对应属性的值 
			props += p + " = " + obj[p] + " \t ";
		}
	}
	// 最后显示所有的属性 
	//alert(props);
	return props;
}