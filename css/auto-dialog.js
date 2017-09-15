function showMessage(con, title) {
	showDialog(con, title, "info", 1);
}
/**
 * 自动关闭型对话框
 * @param {Object} content 内容
 * @param {Object} type 显示类型（error，success，warning，info-默认）
 * @param {Object} title 标题
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