const superagent = require('superagent')
const define = require('./../config/define')
const utils = require('./utils')
const request = require('request')
const fs = require('fs')
const path = require('path')

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

/**
 * 获取房屋信息
 * @param {*} room_id 
 */
module.exports.getDetailInfo = async(room_id) => {
    let url = define.detail_url
        .replace('{room_id}', room_id)

    let count = 4;

    return await getDetail(url, count);
}

/**
 * 下载文件到本地
 * @param {*} url 
 */
module.exports.download = async url => {
    return new Promise((resolve, reject) => {
        let img_path = path.resolve(__dirname, define.tmp_path + utils.getRandomString(15) + '.png')

        let writeStream = fs.createWriteStream(img_path);

        let readStream = request(url)
        readStream.pipe(writeStream);
        readStream.on('error', function() {
            reject();
        })
        writeStream.on("finish", function() {
            writeStream.end();
            resolve(img_path);
        });
    })
}

/**
 * 读取本地文件
 * @param {*} path 
 */
module.exports.readFile = async path => {
    return await new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                console.log('read file error');
                // reject();
                resolve('')
            } else {
                resolve(data)
            }
        });
    })
}

/**
 * 获取查询房源列表
 * @param {*} url 
 */
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

                if (res.body.error_code == 0) {
                    resolve(res.body.data.rooms)
                } else {
                    resolve([])
                }
            });
    })
}

/**
 * 获取管家信息
 * @param {*} room_id 
 * @param {*} house_id 
 * @param {*} resblock_id 
 * @param {*} house_type 
 */
module.exports.getKeeperInfo = async(room_id, house_id, resblock_id, house_type) => {
    let url = define.keeper_url
        .replace('{room_id}', room_id)
        .replace('{house_id}', house_id)
        .replace('{resblock_id}', resblock_id)
        .replace('{house_type}', house_type)
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

                if (res.body.error_code == 0) {
                    resolve(res.body.data)
                } else {
                    resolve({
                        headCorn: '',
                        keeperName: '',
                        keeperPhone: ''
                    })
                }
            });
    })
}