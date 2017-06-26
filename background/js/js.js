// JavaScript Document
var bg_img = $('lay_bg_img'),bgArr = [];
for(var i = 0,len = p_bgPic.length;i < len;i++){
	if(p_bgPic[i].length > 0){
		bgArr.push(p_bgPic[i]);
	}
}
var bg_Data = bgArr[Math.floor(Math.random() * (bgArr.length))],bg_type = bg_Data[0],ft_col = bg_Data[2] || 0;

window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
QZFL.dom = {
	getById:function(id){
		return document.getElementById(id);
	},
	getClientHeight:function(doc){
		var _doc = doc || document;
		return _doc.compatMode == "CSS1Compat"?_doc.documentElement.clientHeight:_doc.body.clientHeight;
	},
	getClientWidth:function(doc){
		var _doc = doc || document;
		return _doc.compatMode == "CSS1Compat"?_doc.documentElement.clientWidth:_doc.body.clientWidth;
	}
};
QZFL.css = {
	_reClassToken:/\s+/,
	addClassName:function(elem,names){
		var _s = QZFL.css;
		return names && ((elem && elem.classList && !_s._reClassToken.test(names))?elem.classList.add(names):_s.updateClassName(elem,null,names));
	},
	removeClassName:function(elem,names){
		var _s = QZFL.css;
		return names && ((elem && elem.classList && !_s._reClassToken.test(names))?elem.classList.remove(names):_s.updateClassName(elem,names));
	},
	updateClassName:function(elem,removeNames,addNames){
		if(!elem || elem.nodeType != 1){
			return "";
		}
		var oriName = elem.className,_s = QZFL.css,ar,b;
		if(removeNames && typeof(removeNames) == 'string' || addNames && typeof(addNames) == 'string'){
			if(removeNames == '*'){
				oriName = '';
			}else{
				ar = oriName.split(_s._reClassToken);
				var i = 0,l = ar.length,n;
				oriName = {};
				for(;i < l;++i){
					ar[i] && (oriName[ar[i]] = true);
				}
				if(addNames){
					ar = addNames.split(_s._reClassToken);
					l = ar.length;
					for(i = 0;i < l;++i){
						(n = ar[i]) && !oriName[n] && (b = oriName[n] = true);
					}
				}
				if(removeNames){
					ar = removeNames.split(_s._reClassToken);
					l = ar.length;
					for(i = 0;i < l;i++){
						(n = ar[i]) && oriName[n] && (b = true) && delete oriName[n];
					}
				}
			}
			if(b){
				ar.length = 0;
				for(var k in oriName){
					ar.push(k);
				}
				oriName = ar.join(' ');
				elem.className = oriName;
			}
		}
		return oriName;
	}};

if(!window.$){
	var $ = QZFL.dom.getById;
}
QZONE.LoginPage = {
	bootStrap:function(){
		var lp = QZONE.LoginPage,sl_url = $('small_url');
		if(bg_type == 0){
			QZFL.css.addClassName(document.body,'mode_dark');
		}
		bg_img.onload = function(){
			QZFL.css.addClassName(bg_img,'lay_background_img_fade_out');
			lp.resizeBackground();
		}
		window.onload = function(){
			lp.resizeBackground();
			lp.setLoginDivTop();
		};
		
		TCISD.pv('ihome.qzone.qq.com','login/i');
	},
	resizeBackground:function(){
		var bg = $('lay_bg'),
				bg_img = $('lay_bg_img'),
				cw = QZFL.dom.getClientWidth(),
				ch = QZFL.dom.getClientHeight(),
				iw = bg_img.width,
				ih = bg_img.height;

		bg.style.width = cw + "px";
		bg.style.height = ch + "px";

		if(cw / ch > iw / ih){
			var new_h = cw * ih / iw,
					imgTop = (ch - new_h) / 2;
			bg_img.style.width = cw + "px";
			bg_img.style.height = new_h + "px";
			bg_img.style.top = imgTop + "px";
			bg_img.style.left = "";
		}else{
			var new_w = ch * iw / ih,
					imgLeft = (cw - new_w) / 2;
			bg_img.style.width = new_w + "px";
			bg_img.style.height = ch + "px";
			bg_img.style.left = imgLeft + "px";
			bg_img.style.top = "";
		}
	},
	setLoginDivTop:function(){
		var dom_height = QZFL.dom.getClientHeight();

		if(window.ActiveXObject && (navigator.userAgent.indexOf('MSIE 6.0') > -1) && dom_height < 600){
			$('lay').style.height = '600px';
		}else{
			$('lay').style.height = '';
		}

		if(dom_height < 820){
			var y1 = 820 - dom_height,
					change_top = 100 - y1,
					change_top = change_top > 0?change_top:0;
			$('login_div').style.top = change_top + "px";
		}else{
			$('login_div').style.top = "100px";
		}
	}
};
QZONE.LoginPage.bootStrap();