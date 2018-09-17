const fs = require('fs');
const define = require('./../config/define')
const Room = require('./../models/room')

const getConfigData = async() => {
    return await new Promise((resolve, reject) => {
        fs.readFile(define.config_file_path, 'utf-8', (err, data) => {
            if (err) {
                console.log('read config error');
                reject();
            } else {
                resolve(JSON.parse(data))
            }
        });
    })
}

module.exports.getQueryUrlList = async() => {

    //清除原有数据
    await Room.ClearTable();

    let list = [];

    let query_data = await getConfigData();

    let base_url = define.base_url;

    //加入价格查询条件
    let price_query_data = query_data.price;
    let price_query_list = [];
    for (let i = 0; i < price_query_data.length; i++) {
        price_query_list.push({
            query: '&price=' + price_query_data[i].query,
            text: price_query_data[i].text
        })
    }

    //加入地区查询条件
    let region_query_data = query_data.region;
    let region_query_list = [];
    for (let i = 0; i < region_query_data.length; i++) {
        for (let j = 0; j < price_query_list.length; j++) {
            region_query_list.push({
                query: price_query_list[j].query + '&district_code=' + region_query_data[i].query,
                text: price_query_list[j].text + '|' + region_query_data[i].text
            });
        }
    }

    //加入面积查询条件
    let area_query_data = query_data.area;
    let area_query_list = [];
    for (let i = 0; i < area_query_data.length; i++) {
        for (let j = 0; j < region_query_list.length; j++) {
            area_query_list.push({
                query: region_query_list[j].query + '&area=' + area_query_data[i].query,
                text: region_query_list[j].text + '|' + area_query_data[i].text
            });
        }
    }

    //拼接最终结果地址
    area_query_list.forEach(query => {
        list.push({
            url: define.base_url.replace('{query}', query.query),
            query: query.query,
            text: query.text
        });
    })

    return list;
}