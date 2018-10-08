const spider_service = require('./utils/spider')
const utils = require('./utils/utils')
const Ctrip = require('./models/ctrip')

const init = async url => {

    console.log('-------------清除原有数据-------------')
    await Ctrip.CreateTable();

    console.log('-------------开始爬取自由行-------------')
    await flighthotel_spider();

    console.log('-------------开始爬取跟团游-------------')
    await gentuanyou_spider();

    process.exit();
}

const flighthotel_spider = async() => {
    let cache = [];
    let start_time = new Date().getTime();
    let end_time = new Date().getTime();

    //获取数据查询地址
    let query_list = await spider_service.getFlightHotelQueryList();

    console.log(query_list.length)

    console.log('-------------共需要查询' + query_list.length + '次-------------');

    for (let i = 0, sum = query_list.length; i < sum; i++) {
        if (query_list[i].word.indexOf('塞班岛') > -1 ||
            query_list[i].word.indexOf('夏威夷') > -1 ||
            query_list[i].word.indexOf('关岛') > -1) {
            continue;
        }

        if (cache.indexOf(query_list[i].code) == -1) {
            try {
                await spider_service.getFlightHotelDetail(query_list[i]);
            } catch (e) {
                console.error(query_list[i].word + ' 爬取失败，code 为 ' + query_list[i].code)
                continue;
            }

            cache.push(query_list[i].code)

            end_time = new Date().getTime();
            console.log(query_list[i].word)
            console.log('-------------已爬取' + cache.length + '个自由行，目前耗时' + utils.getTimeRange(end_time - start_time) + '-------------')
            console.log('-------------本次查询还剩' + (sum - i) + '个房屋-------------')
            console.log('\n')
        }
    }

    end_time = new Date().getTime();
    console.log('\n\n\n')
    console.log('-------------共爬取' + cache.length + '个自由行，一共耗时' + utils.getTimeRange(end_time - start_time) + '-------------')
    console.log('\n')
}

const gentuanyou_spider = async() => {

}

init();