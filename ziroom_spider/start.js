const query_service = require('./utils/query')
const spider_service = require('./utils/spider')
const utils = require('./utils/utils')

const init = async url => {
    let cache = [];
    let start_time = new Date().getTime();
    let end_time = new Date().getTime();

    //获取数据查询地址
    let query_list = await query_service.getQueryUrlList();

    console.log('-------------共需要查询' + query_list.length + '次-------------');

    for (let i = 0, sum = query_list.length; i < sum; i++) {
        let room_list = await spider_service.getDetailList(query_list[i].url)

        console.log(query_list[i].url)
        console.log('-------------第' + (i + 1) + '次查询(共' + sum + '次)，此查询条件下共有' + room_list.length + '个出租房屋-------------')
        console.log('\n')

        for (let j = 0, sum_j = room_list.length; j < sum_j; j++) {
            if (cache.indexOf(room_list[j].id) == -1) {
                try {
                    await spider_service.getDetail(query_list[i].text, room_list[j]);
                } catch (e) {
                    console.error(room_list[j].name + ' 爬取失败，room id 为 ' + room_list[j].id)
                    continue;
                }

                cache.push(room_list[j].id)

                end_time = new Date().getTime();
                console.log(room_list[j].name)
                console.log('-------------已爬取' + cache.length + '个出租房屋，目前耗时' + utils.getTimeRange(end_time - start_time) + '-------------')
                console.log('-------------本次查询还剩' + (room_list.length - j) + '个房屋-------------')
                console.log('\n')
            }
        }
    }
    // await spider_service.getDetail('', {
    //     id: 60019693,
    //     name: '自如友家·京城仁合·3居室-02卧'
    // });

    end_time = new Date().getTime();
    console.log('\n\n\n')
    console.log('-------------共爬取' + cache.length + '个出租房屋，耗时' + utils.getTimeRange(end_time - start_time) + '-------------')
    console.log('\n')

    process.exit();
}

init();