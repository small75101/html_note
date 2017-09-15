function reloadJS(newJS) {
	document.jsid = document.jsid || 0;
	document.jsid++;
	var oldjs = null;
	var t = null;
	var oldjs = document.getElementById(document.jsid);
	if(oldjs) oldjs.parentNode.removeChild(oldjs);
	var scriptObj = document.createElement("script");
	scriptObj.src = newJS;
	scriptObj.type = "text/javascript";
	scriptObj.id = "js_" + document.jsid;
	document.getElementsByTagName("head")[0].appendChild(scriptObj);
}

function reloadCss(newCss) {
	document.cssid = document.cssid || 0;
	document.cssid++;
	var oldjs = null;
	var t = null;
	var oldjs = document.getElementById(document.jsid);
	if(oldjs) oldjs.parentNode.removeChild(oldjs);
	var cssObj = document.createElement("link");
	cssObj.href = newCss;
	cssObj.rel = "stylesheet";
	cssObj.id = "css_" + document.cssid;
	document.getElementsByTagName("head")[0].appendChild(cssObj);
}

(function init() {
	reloadCss("../js/bootstrap/css/bootstrap.min.css");
	reloadJS("../js/jquery.min.js");
	reloadJS("../js/bootstrap/js/bootstrap.min.js");
})();