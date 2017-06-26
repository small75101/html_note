/*lang.js 包*/
/*
    JavaScript函数重载模拟
    fn_objs : 键值对函数对象，键位以逗号隔开的类型(number,string,object,undefined,boolean,array,*)字符串,其中*为万能类型，值为对应的函数,
   	 如:{"string,string":function(x,y){},"string,number":functioin(x,y){}}
*/
Bind = function(name, bind, fn_objs) {
	var dict_name = "_" + name + "_dict",
		dict;
	dict = bind[dict_name] = bind[dict_name] || {};

	for(var i in fn_objs) {
		dict[i] = fn_objs[i];
	}

	var is_match = function(x, y) {
		if(x == y) return true;
		if(x.indexOf("*") == -1) return false;

		var x_arr = x.split(","),
			y_arr = y.split(",");
		if(x_arr.length != y_arr.length) return false;

		while(x_arr.length) {
			var x_first = x_arr.shift(),
				y_first = y_arr.shift();
			if(x_first != "*" && x_first != y_first) return false;
		}
		return true;
	};

	bind[name] = function() {
		var args = arguments,
			args_len = args.length,
			args_types = [],
			args_type, match_fn = function() {};
		for(var i = 0; i < args_len; i++) {
			var type = typeof args[i];
			type == "object" && (args[i] instanceof Array) && (type = "array");
			args_types.push(type);
		}
		args_type = args_types.join(",");
		for(var k in dict) {
			if(is_match(k, args_type)) {
				match_fn = dict[k];
				break;
			}
		}
		return match_fn.apply(this, args);
	};
};
Overload = function(fn_objs) {
	var is_match = function(x, y) {
		if(x == y) return true;
		if(x.indexOf("*") == -1) return false;

		var x_arr = x.split(","),
			y_arr = y.split(",");
		if(x_arr.length != y_arr.length) return false;

		while(x_arr.length) {
			var x_first = x_arr.shift(),
				y_first = y_arr.shift();
			if(x_first != "*" && x_first != y_first) return false;
		}
		return true;
	};
	var ret = function() {
		var args = arguments,
			args_len = args.length,
			args_types = [],
			args_type, fn_objs = args.callee._fn_objs,
			match_fn = function() {};
		for(var i = 0; i < args_len; i++) {
			var type = typeof args[i];
			type == "object" && (args[i].length > -1) && (type = "array");
			args_types.push(type);
		}
		args_type = args_types.join(",");
		for(var k in fn_objs) {
			if(is_match(k, args_type)) {
				match_fn = fn_objs[k];
				break;
			}
		}
		return match_fn.apply(this, args);
	};
	ret._fn_objs = fn_objs;
	return ret;
};
/**格式化字符串
 * //两种调用方式
	var template1="我是{0}，今年{1}了";
	var result1=template1.format(["loogn",22]);
	
	var template2="我是{name}，今年{age}了";
	var result2=template2.format({name:"loogn",age:22});
 */
String.prototype.format = Overload({
	"array": function(params) {
		var reg = /{(\d+)}/gm;
		return this.replace(reg, function(match, name) {
			return params[~~name];
		});
	},
	"object": function(param) {
		var reg = /{([^{}]+)}/gm;
		return this.replace(reg, function(match, name) {
			return param[name];
		});
	}
});

/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function(exp, newStr) {
	return this.replace(new RegExp(exp, "gm"), newStr);
};
/**
 *css(hi,"color","red")
 *css([hi,hello],"color","red")
 *css(hi,{"border":"1px solid #000","width":"200px"})
 *var color = css(hi,"border");
 */
Bind("css", window, {
	"object,string,string": function(el, key, val) {
		el.style[key] = val;
	},
	"array,string,string": function(els, key, val) {
		for(var i = 0; i < els.length; i++) {
			els[i].style[key] = val;
		}
	},
	"object,object": function(el, kv) {
		for(var i in kv) {
			el.style[i] = kv[i];
		}
	},
	"object,string": function(el, key) {
		return el.style[key];
	}
});
var is = (function() {
	var obj = new Object(); //创建对象 
	obj.types = ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String",
		"Window", "HTMLDocument"
	];
	for(var i = obj.types.length; i--;) {
		obj[obj.types[i]] = (function(type) {
			return function(obj) {
				return Object.prototype.toString.call(obj) == "[object " + type +
					"]";
			}
		})(obj.types[i])
	}
	return obj;
})();