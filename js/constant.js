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
/**
 * 自动关闭型对话框
 * @param {Object} content 内容
 * @param {Object} title 标题
 * @param {Object} type 显示类型（error，success，warning，info-默认）
 * @param {Object} ot 1：在标题前加入统一的一个字符串
 */
function showDialog(content, title, type, ot1) {
	var ob = document.getElementById("showDialog");
	var c = content || "提示内容";
	var t = title || "";
	var ty = type || "info";
	var ot = ot1 || false;
	this.init = function() {
		ob = document.createElement("div");
		ob.setAttribute("id", "showDialog");
		this.addStyle();
		this.createTitle();
		this.createContent();
		document.body.appendChild(ob);
	}
	this.showView = function() { //存在对话标签侧改变其内容
		document.getElementById("showDialog").style.display = "block";
		document.getElementById("sd_title").innerHTML = t;
		document.getElementById("sd_content").innerHTML = c;
	}
	this.addStyle = function() { //添加Css给对话框
		switch(ty.toLocaleLowerCase()) {
			case "error":
			case "danger":
				ob.style.backgroundColor = "#ffdddd";
				ob.style.border = "6px solid #f44336";
				ob.title = "错误:";
				break;
			case "success":
				ob.style.backgroundColor = "#ddffdd";
				ob.style.border = "6px solid #4CAF50";
				ob.title = "成功:";
				break;
			case "warning":
				ob.style.backgroundColor = "#ffffcc";
				ob.style.border = "6px solid #ffeb3b";
				ob.title = "警告:";
				break;
			default:
				ob.style.backgroundColor = "#e7f3fe";
				ob.style.border = "6px solid #2196F3";
				ob.title = "信息:";
				break;
		}
		if(!ot) ob.title = "";
		ob.style.borderRadius = "15px";
		ob.style.padding = "8px 20px";
		ob.style.width = "500px";
		ob.style.position = "absolute";
		var sWidth = window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
		var sHeight = window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		ob.style.left = (sWidth / 2 - parseInt(ob.style.width) / 2) + "px";
		ob.style.top = (sHeight / 2 - 100) + "px";
	}
	this.createTitle = function() { //创建标题
		var d2 = document.createElement("div");
		var h3 = document.createElement("h3");
		h3.style.textAlign = "center";
		h3.style.margin = "0";
		h3.style.padding = "0";
		h3.innerHTML = "<span>" + ob.title + "</span>";
		h3.innerHTML += "<span id='sd_title'>" + t + "</span>";
		d2.appendChild(h3);
		ob.appendChild(d2);
	}
	this.createContent = function() { //创建内容
		var d3 = document.createElement("div");
		d3.style.wordWrap = "break-word";
		d3.innerHTML = "<span id='sd_content'>" + c + "</span>";
		ob.appendChild(d3);
	}
	this.close = function() { //关闭对话框
		var ob = document.getElementById("showDialog");
		if(ob) {
			ob.style.display = "none";
		}
	}

	if(ob) {
		this.showView();
	} else {
		this.init();
	}
	setTimeout("this.close()", 3000);
}