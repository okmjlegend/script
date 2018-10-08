module.exports.formatHTML = html => {
    return html.replace(/ /g, '').replace(/\n/g, '');
}

module.exports.formatDate = (date = new Date(), format = 'yyyy-MM-dd', is12System = false) => {
    if (typeof date == 'number') {
        date = new Date(date);
    }

    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": is12System && date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    if (is12System) {
        format += date.getHours() > 12 ? ' PM' : ' AM';
    }

    return format;
}

module.exports.getRandomString = (length = 10) => {
    let key = '';
    let ascTable = '0123456789abcdefghijklmhopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ascTable = ascTable.split('');
    for (let i = 0; i < length; ++i) {
        key += ascTable[parseInt(Math.random() * 62)].toString();
    }
    return key;
}

module.exports.sleep = timespan => {
    return new Promise(resolve => setTimeout(resolve, timespan))
}

module.exports.getTimeRange = range => {
    range = Math.floor(range / 1000)

    if (range <= 60) {
        return range + '秒'
    }

    if (range <= 3600) {
        return Math.floor(range / 60) + '分' + (range % 60) + '秒'
    }

    if (range <= 216000) {
        let hour = Math.floor(range / 3600);
        let minitus = Math.floor((range - hour * 3600) / 60)
        return hour + '小时' + minitus + '分' + (range % 60) + '秒'
    }
}