var requestUrl = "http://192.6.6.127:4096/api/dapps/a527060caf846dbaa4a4332ff3e4fa22c7532d68527adfb613fdb1384a07c39d"

function getParams(name, decode) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null)
		return decode && decode(r[2]) || unescape(r[2]);
	return null;
}