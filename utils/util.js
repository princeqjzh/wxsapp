function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



//取url参数 var id = request("id")
function request() {
    var query = location.search;
    var paras = arguments[0];
    if (arguments.length == 2) {
        query = arguments[1];
    }
    if (query != "") {
        if (query.indexOf("?") != -1) {
          query = query.split("?")[1];
        }
        query = query.split("&");
        for (var i = 0; i < query.length; i++) {
            var querycoll = query[i].split("=");
            if (querycoll.length == 2) {
                if (querycoll[0].toUpperCase() == paras.toUpperCase()) {
                    return querycoll[1];
                    break;
                }
            }
        }
    }
    return "";
}


module.exports = {
  formatTime: formatTime,
  request: request
}
