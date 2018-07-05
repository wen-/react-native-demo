import {接口配置} from "./domain";
import {c_fetch} from "../utils/common";

const getBanner = function (fn) {
	let url = global.配置.域名 + 接口配置.banner;
	c_fetch(url,{
		method:"GET",
		success: function (json) {
			console.log(json);
			fn(json);
		},
		error:function (e) {
			console.log(e);
			fn(null);
		}
	});
}

export {getBanner};