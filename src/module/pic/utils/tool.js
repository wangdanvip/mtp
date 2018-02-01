export default {
	/**
	 * 转换文件大小格式
	 */
	formatSize :(sizeOfByte) => {
		if(sizeOfByte < 1024) {
			//B
			return sizeOfByte + 'B';
		} else if(sizeOfByte >= 1024 && sizeOfByte < 1024 * 1024) {
			//KB
			return(sizeOfByte / 1024).toFixed(2) + 'KB';
		} else if(sizeOfByte >= 1024 * 1024 && sizeOfByte < 1024 * 1024 * 1024) {
			//MB
			return(sizeOfByte / (1024 * 1024)).toFixed(2) + 'MB';
		} else if(sizeOfByte >= 1024 * 1024 * 1024) {
			//GB
			return(sizeOfByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
		}
	},
	/**
	 * 转换时间格式,单位(s)
	 */
	formatTime : (val) => {
		return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
	}
}
