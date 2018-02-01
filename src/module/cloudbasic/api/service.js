import axios from 'utils/http.js';
import * as api from "./api.js";


// 获取服务权限
export const requestSubsystemAuth = () => {
	let params = {
		serverId : '8'
	}
	return axios.post(api.subsystemAuth, params).then(res => res.data);
}