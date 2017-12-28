/**
 * 滚动实现
 * @param {Object} obj
 */
function scroll(obj) {
	if(typeof(obj) == "string") {
		//obj = document.getElementById(obj);
		obj = document.getElementsByClassName(obj)[0];
	}
	if(!obj) return;
	if(!obj.temp || (obj.temp.length == obj.innerHTML.length)) {
		obj.temp = obj.innerHTML;
		if(obj.scrollWidth != obj.offsetWidth)
			obj.innerHTML += " " + obj.temp;
		else
			return;
	}
	obj.scrollLeft++;
	//console.log("滚动：" + obj.scrollLeft + " 父窗体：" + obj.offsetWidth + "  内容宽度:" + obj.scrollWidth + " 原内容长度:" + obj.temp.length + " 现内容长度:" + obj.innerHTML.length);
	/*if(obj.scrollLeft>=(obj.scrollWidth-obj.offsetWidth)){
		obj.scrollLeft = 0;
	}*/
	if(obj.scrollLeft >= obj.scrollWidth / 2 + 2)
		obj.scrollLeft = 0;
}
/**
 * 滚动对象
 * @param {Object} id
 */
function MyScroll(id) {
	this.id = id;
	this.tArr = new Array();
	this.speed = 50;
	this.start = function() {
		var t = setInterval("scroll('" + this.id + "')", this.speed);
		this.tArr.push(t);
	}
	this.stop = function() {
		var t = this.tArr.pop();
		clearInterval(t);
	}
}
/**
 * 该对象开始滚动
 * @param {Object} obj
 */
function scrollStart(obj, className) {
	className = className || "myScrollShow";
	//移除滚动对象
	var lastObjArr = document.getElementsByClassName(className);
	for(var i = 0; i < lastObjArr.length; i++) {
		scrollStop(lastObjArr[i], className);
	}

	if(obj) {
		if((typeof obj) == "string") obj = document.getElementById(obj);
		obj.classList.add(className);
		obj.style.overflow = "hidden"; //超出长度隐藏内容
		obj.style.textOverflow = "clip"; //超出部分直接截取
		obj.style.whiteSpace = "nowrap"; //超出部分不能换行
		if(!document.myscroll) document.myscroll = new Array();
		if(!document.myscroll[className]) document.myscroll[className] = new MyScroll(className);
		else document.myscroll[className].stop();
		document.myscroll[className].start();
	}
}
/**
 * 该对象停止滚动
 * @param {Object} obj 滚动的对象
 * @param {Object} real 为true则 删除该对象 默认为false(可以选择不填)
 */
function scrollStop(obj, className, real) {
	className = className || "myScrollShow";
	if(obj) {
		if((typeof obj) == "string") obj = document.getElementById(obj);
		//obj.removeAttribute("id");
		obj.classList.remove(className);
		obj.scrollLeft = 0;
		obj.style.whiteSpace = "normal"; //超出部分能换行
		//obj.style.textOverflow = "ellipsis"; //超出部分用....符号替换
		if(obj.temp && (obj.temp.indexOf(obj.innerHTML) != -1)) obj.innerHTML = obj.temp;
	}
	if(!document.myscroll) document.myscroll = new Array();
	if(document.myscroll[className]) document.myscroll[className].stop();
	if(real) document.myscroll[className] = undefined;
}
//var myscroll =new  MyScroll("show");
//myscroll.start();
//var t = setInterval("scroll('aaa')",40);