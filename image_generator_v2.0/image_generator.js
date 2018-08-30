const fs = require("fs")
const define = require('./define')
const textBuilder = require('./textBuilder')
const imageBuilder = require('./imageBuilder')

const getConfigData = async() => {
    return await new Promise((resolve, reject) => {
        fs.readFile(define.config_file, 'utf-8', (err, data) => {
            if (err) {
                console.log('read config error');
                reject();
            } else {
                resolve(JSON.parse(data))
            }
        });
    })
}

async function init() {
    //获取配置数据列表
    let config_data = await getConfigData();

    let config;
    for (let i = 0, sum = config_data.length; i < sum; i++) {
        //获取单条配置数据
        config = config_data[i];

        //创建builder实例
        let builder = imageBuilder.createInstance();

        for (let j = 0; j < config.character.length; j++) {

            //添加文字
            let text_info = await textBuilder.build(config.character[j], 'blue');
            builder.drawText(55, text_info.height + j * 45, text_info)
        }

        //添加二维码
        builder.drawImage(306, 979, 138, 138, define.qr_file)

        //导出最终图片
        await builder.write(define.export_path + 'result_' + i + '.jpg');
    }
}

init();