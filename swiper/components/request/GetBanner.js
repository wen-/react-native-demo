import {接口配置} from "./Domain";
import {c_fetch} from "../Utils/Common";

const getbanner = function (fn) {
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

export {getbanner};