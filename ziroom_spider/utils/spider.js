const http_service = require('./http')
const Room = require('../models/room')
const utils = require('./utils')
const shell = require("shelljs")

const tesseractImage = async price => {
    let url = 'http:' + price[0];
    let array = price[1];

    let price_img_path = await http_service.download(url)
    let price_result_path = price_img_path.replace('.png', '');

    let exec = 'tesseract ' + price_img_path + ' -l eng ' + price_result_path;
    shell.exec(exec)

    let price_data = await http_service.readFile(price_result_path + '.txt')

    price_data = utils.formatHTML(price_data).split('')

    let result = '';
    array.forEach(entry => {
        result += price_data[entry];
    })

    return parseInt(result)
}

const getPageList = async(list, url, page) => {

    url += '&page=' + page;

    let room_list = [];
    try {
        room_list = await http_service.getQueryList(url)
    } catch (e) {
        console.log(e)
        return [];
    }

    if (room_list.length > 0) {
        //获取房屋列表地址
        list = list.concat(room_list);
        return getPageList(list, url, page + 1);
    } else {
        return list;
    }
}

module.exports.getDetailList = async url => {

    let list = await getPageList([], url, 1);

    return list;
}

module.exports.getDetail = async(query_text, room) => {

    let detail;
    try {
        detail = await http_service.getDetailInfo(room.id, true);
    } catch (e) {
        console.log(e)
        return;
    }

    if (!detail) {
        console.log(room.name + ' 爬取失败，room id 为 ' + room.id)
        return;
    }

    //价格
    let price = await tesseractImage(detail.price);
    //标签
    detail.tags = detail.tags.map(tag => {
        return tag.title
    });
    //房屋空间
    detail.space = detail.space.map(entry => {
        entry.photos_big = entry.photos_big.map(photo => {
            return 'http:' + photo;
        })
        entry.tags = entry.tags.map(tag => {
            return tag.title;
        })
        entry.config = entry.config.map(config => {
            return config.name;
        })
        return {
            name: entry.name,
            config: entry.config,
            config_desc: entry.config_desc,
            photo: entry.photos_big,
            tags: entry.tags,
            face: entry.face
        }
    });
    //室友
    detail.roommates = detail.roommates.map(roommate => {
        return {
            gender: roommate.roommate_gender,
            status: roommate.status_text,
            title: roommate.title,
            is_current: roommate.id == detail.id
        }
    });
    //配置
    detail.config = detail.config.map(config => {
        return config.name;
    });
    //查询条件
    query_text = query_text ? query_text.split('|') : ['', '', ''];

    //管家信息
    let keeper_info = await http_service.getKeeperInfo(detail.id, detail.house_id, detail.resblock.id, detail.house_type)

    //保存数据
    return await Room.Add({
        house_id: detail.house_id,
        house_code: detail.house_code,
        room_id: detail.id,
        room_name: detail.name,
        room_code: detail.code,
        room_version: detail.version_name,
        room_area: parseFloat(detail.area),
        room_introduction: detail.introduction,
        room_floor: parseInt(detail.floor),
        room_floor_total: parseInt(detail.floor_total),
        price: price,
        price_unit: detail.price_unit.replace('/', ''),
        price_desc: detail.price_desc,
        tags: JSON.stringify(detail.tags),
        space: JSON.stringify(detail.space),
        roommates: JSON.stringify(detail.roommates),
        config: JSON.stringify(detail.config),
        house_subway: JSON.stringify(detail.resblock.subway),
        house_build_year: parseInt(detail.resblock.build_year),
        house_build_type: detail.resblock.build_type,
        house_name: detail.resblock.name,
        house_heating_type: detail.resblock.heating_type,
        house_around: detail.resblock.around,
        house_traffic: detail.resblock.traffic,
        query_price: query_text[0],
        query_region: query_text[1],
        query_area: query_text[2],
        keeper_avatar: keeper_info.headCorn,
        keeper_name: keeper_info.keeperName,
        keeper_phone: keeper_info.keeperPhone,
        create_time: new Date().getTime()
    })
}