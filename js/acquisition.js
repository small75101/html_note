/**
 * 数据采集
 * 
 * 基础数据+拓展数据
 * 01|12201256542|1|1376907433|257|1!1!116!3!0!116!百姓健康
 * 01|12201256542|1|1376907533|257|1!1!118!3!0!118!CCTV13
 */

/** **********************基础数据************************************* */
// var UId = HardwareInfo.STB.serialnumber; //获取接收终端的序列号
 var UTYPE = HardwareInfo.STB.model; //终端类型唯一标识 01;
 var UID = CAManager.cardSerialNumber; //用户唯一标识，如，CAID，STBID 12201256542;
 var AREAID = Ethernet.MACAddress; //区域码 "00-15-F2-63-7A-83";
 // var UTYPE = '01'; // 终端类型唯一标识 01;
 // var UID = '8280202374116016'; // 用户唯一标识，如，CAID，STBID 12201256542;
 // var AREAID; // 区域码 "00-15-F2-63-7A-83";

var EVENTTIME = new Date().getTime(); // 时间戳

var TYPEID = ""; // 业务类型
var baseMsg = ""; // 基础信息
var extendMsg = ""; // 拓展数据
/** **********************基础数据************************************* */
/** 获取时间毫秒数 */
function getTime() {
	return new Date().getTime();
}
/** 基础信息类型 */
function BaseInfo_OBJ(uType, uId, areaId, eventTime, typeId) {
	this.uType = uType;// 终端类型唯一标识
	this.uId = uId;// 用户唯一标识，如，CAID，STBID
	this.areaId = areaId;// 区域码 "00-15-F2-63-7A-83";
	this.eventTime = eventTime; // 时间戳
	this.typeId = typeId;// 业务类型
	this.getInfo = function() {
		return this.uType + "|" + this.uId + "|" + this.areaId + "|"
				+ this.eventTime + "|" + this.typeId + "|";
	}
}
function getBaseInfo(typeid) {
	var a = new BaseInfo_OBJ(UTYPE, UID, AREAID || '', EVENTTIME, typeid
			|| TYPEID);
	return a.getInfo();
}
 function recordAddAjax(data,myurl){
	 var xmlhttp = null;
 	 if (window.XMLHttpRequest) {
 	/** code for IE7+, Firefox, Chrome, Opera, Safari */
 		xmlhttp = new XMLHttpRequest();
	 } else {
 		/** code for IE6, IE5 */
 		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 	}
	 var url = "http://10.102.1.71:8080/spis/asgapi/v1/1/"+UID+"/msg/api/topic/data.stb.report";
	 var up='{"subjectid":"data.stb.report","msgid":"'+UID+'","msgpriority":"0","senderid":"'+UID+'","receiverid":"data","msgtext":"'+data+'"}';
	 xmlhttp.onreadystatechange = function () {
		 //console.log(xmlhttp.readyState);
		 //console.log(xmlhttp.status);
	 	if(xmlhttp.readyState==4){
	 		if(myurl) {
				window.location = myurl;
			}
		}
	 }
	 xmlhttp.open("post", url, true);
	 xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
 	xmlhttp.send(up);
 	console.log(xmlhttp.responseText);
 }
/** *********************************拓展数据******************************************************** */
/** 调用时 只放入参数 */
function getExeInfo() {
	if (arguments.length > 0 && arguments[0] == 'none') {
		return "0";
	}
	var str = "";
	for (var i = 0; i < arguments.length; i++) {
		arguments[i] = arguments[i] || '';
		str += arguments[i] + '!'
	}
	if (str.length == 0)
		return str;
	return str.substr(0, str.length - 1);
}
/** *********************************拓展数据******************************************************** */
function recordAdd(typeid,data,url) {
	var baseMsg = getBaseInfo(typeid);
	var extendMsg;
	if(data) {
		var str = "";
		for (var i = 0; i < data.length - 1; i++) {
			if((typeof data[i]) == 'string') {
				data[i] = data[i].replace(/\|/g, "");
				data[i] = data[i].replace(/\!/g, "");
				data[i] = data[i].replace(/\！/g, "");
			}
			data[i] = data[i] || '';
			str += data[i] + '!'
		}
		extendMsg = str + data[data.length - 1];
	}else{
		extendMsg = "0";
	}
	//console.log("需要采集的数据:" + baseMsg + extendMsg);
	recordAddAjax(baseMsg + extendMsg,url);
	// recordAddAjax(baseMsg + extendMsg);

}

/** ********************************时间转换************************************************** */
/**
 * 转换时间
 * @param date
 * @returns {yyyyMMdd}
 */
function formatDateTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = month < 10 ? ('0' + month) : month;
	var day = date.getDate();
	day = day < 10 ? ('0' + day) : day;
	var hour = date.getHours();
	var minute = date.getMinutes();
	minute = minute < 10 ? ('0' + minute) : minute;
	//return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
	return year+""+month+""+day;
}

/** ******************************获取字符串最后的集数********************************************* */
function getDrama(str) {
	var drama = ""; // 字符串最后的集数
	var fande = ""; // 反的数字
	var str = str.trim();
	var zi = new RegExp("[\u4e00-\u9fa5]");
	if (str == "" || str == null) {
		str = "0";
	}

	for (var i = str.length - 1; i >= 0; i--) {
		no = str.charAt(i);
		if (no == "_" || no == "-" || no == " " || zi.test(no)) {
			break;
		} else {
			fande += no;
		}
	}
	// console.log(fande);

	for (var i = fande.length - 1; i >= 0; i--) {
		drama += fande.charAt(i);
	}
	// console.log(drama);
	return drama;
	// console.log("...............");
};

/** *******************************获取影片名****************************************** */
function getMovieName(str) {
	var drama = getDrama(str);
	var subs = str.substr(0, str.length - drama.length);
	str = subs.trim();
	for (var i = str.length - 1; i >= 0; i--) {
		var no = str.charAt(i);
		if (no == "-") {
			return str.substr(0, i);
		} else if (no == "_") {
			return str.substr(0, i);
		} else {
			return str;
		}
	}
}

/*******************************转换时间*******************************************/
/**
 * 截取年月
 * @returns {yyyymmdd}
 */
function formatDay(str){
	str = str.replace(/\-/g,"");
	return str.substring(0,8);
}
/**
 * 截取时间
 * @returns {hhmmss}
 */
function formatTime(str){
	str = str.replace(/\-/g,"");
	return str.substr(-10, 8);
}


/******************************截取url**********************************/
/**
 *
 * @param url
 * @returns {xxxx.html}
 */
function subStrUrl(url){
	if(url==null || url ==""){
		return "";
	}else{
		var reg = new RegExp(/\?/);
		if(reg.test(url)){
			return url.split("?")[0];
		}else{
			return "";
		}

	}
}

/**********************************获取url中的名字******************************/
/**
 * 获取url中的名字
 * @param url
 * @returns {pName}
 */
function pNameInUrl(url){
	if(url==null || url ==""){
		return "";
	}else{
		var reg = new RegExp(/pName=(\S*)&/);
		if(reg.test(url)){
			return url.match(/pName=(\S*)&/)[1];
		}else{
			return "";
		}

	}

}