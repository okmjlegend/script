const Canvas = require('canvas')
const fs = require("fs")

const output_text_path = './tmp/'

const getImageWidth = (text) => {
    let sum = 0;

    text = text.split('');
    text.forEach(word => {
        if (/[1-9]/g.test(word)) {
            sum += 13;
        } else if (/[a-zA-Z,.]/g.test(word)) {
            sum += 13;
        } else {
            sum += 24;
        }
    });
    return sum
}

const getRandomString = (length = 10) => {
    let key = '';
    let ascTable = '0123456789abcdefghijklmhopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ascTable = ascTable.split('');
    for (let i = 0; i < length; ++i) {
        key += ascTable[parseInt(Math.random() * 62)].toString();
    }
    return key;
}

const saveBase64Image = async(base64, path) => {
    return new Promise((resolve, reject) => {

        base64 = base64.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = new Buffer(base64, 'base64');

        fs.writeFile(path, dataBuffer, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(path)
            }
        });
    }).catch((err) => {
        console.log(err)
    })
}

module.exports.build = async(text, color) => {

    let height = 24;
    let width = getImageWidth(text);
    let canvas = new Canvas(width, height);

    let ctx = canvas.getContext('2d');
    ctx.font = '24px "Microsoft YaHei"'
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 20);
    ctx.restore();

    let output_path = output_text_path + getRandomString(10) + new Date().getTime() + '.png';

    await saveBase64Image(canvas.toDataURL(), output_path)

    return {
        width: width,
        height: height,
        path: output_path
    }
}