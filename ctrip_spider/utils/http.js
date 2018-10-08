const superagent = require('superagent')
const define = require('./../config/define')

const getDetail = async(url, count) => {
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .timeout({
                deadline: 30000,
            })
            .end(async function(err, res) {
                // 抛错拦截
                if (err) {
                    reject(err);
                    return;
                }

                if (res.body.error_code == 0 && count > 0) {
                    if (!res.body.data.toString()) {
                        return await getDetail(url, --count)
                    } else {
                        resolve(res.body.data);
                    }
                } else {
                    resolve([]);
                }
            });
    })
}

module.exports.getQueryList = async url => {
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .timeout({
                deadline: 30000,
            })
            .end(function(err, res) {
                // 抛错拦截
                if (err) {
                    reject(err);
                    return;
                }

                if (res.body.data && res.body.data.length > 0) {
                    resolve(res.body.data)
                } else {
                    resolve([])
                }
            });
    })
}