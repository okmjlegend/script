// http://www.ziroom.com/z/nl/z1-r1-u1-a1-d23008614.html
// const query_service = require('./utils/query')
// const html_service = require('./utils/html')
// const utils = require('./utils/utils')
// const fs = require('fs')
// const path = require('path')
// const http_service = require('./utils/http')
const shell = require("shelljs")

// const rename = async(ori, tar) => {
//     return new Promise((a, b) => {
//         fs.rename(ori, tar, err => {
//             a();
//         })
//     })
// }

// const getConfigData = async() => {
//     return await new Promise((resolve, reject) => {
//         fs.readFile('./config/room.csv', 'utf-8', (err, data) => {
//             if (err) {
//                 console.log('read config error');
//                 reject();
//             } else {
//                 resolve(data.split('\n'))
//             }
//         });
//     })
// }

const test = async url => {

    // let list = await getConfigData();


    // list.forEach(async(url, index) => {
    //     if (url && index < 300 && index >= 200) {
    //         await http_service.download(url)
    //     }
    // })

    // let root = path.join(__dirname, '/tmp/')

    // let list = fs.readdirSync(root);

    // list.forEach(async(path, index) => {
    //     await fs.rename('./tmp/' + path, './tmp/ziroom.code.exp' + (index + 1) + '.png')
    // })



    // fs.rename(`./tmp/0A1bYsvbcSx7PSF.png`, `./tmp/asdf.png`)


    // let builder = gm(define.template_path);
    // console.log(path)
    // builder.draw('image Over 0, 0, 300, 30 "' + path + '"')
    // builder.write('test.png', function(err) {
    //     if (!err) {
    //         console.log('done')
    //     } else {
    //         console.log(err.message || "出错了！");
    //     }
    // })
}

// test('http://www.ziroom.com/z/nl/z1.html');
// test('http://www.ziroom.com/z/vr/60160901.html');
// test('http://www.ziroom.com/detail/info?id=60160901&house_id=60027068');
// test('http://static8.ziroom.com/phoenix/pc/images/price/e72ac241b410eac63a652dc1349521fd.png');
// init();
// test();
// tesseract /Users/majian/work/git/script/ziroom_spider/test.png out -l eng

// shell.exec('tesseract /Users/majian/work/git/script/ziroom_spider/test.png -l eng ./tmp/text')