const fs = require("fs");
const gm = require('gm')
const images = require('images')

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const TextToSVG = require('text-to-svg')
const textToSVG = TextToSVG.loadSync('./font/PingFang Regular.ttf');

const template_file = './input/template.jpg'
const qr_file = './input/qr.png'
const config_file = './input/config.json'
const export_path = './output/'

//  文字大小
const font_size = 28;
//  文字宽度比例
const text_per = 32.5;
//  数字宽度比例
const number_per = 24;
//  生成文字图片高度
const font_height = 45;
//  关键字起始高度
const keyword_height_begin = 430;
//  爱情性格起始高度
const character_height_begin = 650;
//  随机颜色池
const color_list = ['#c463ff', '#ff54d4', '#ffd925', '#5ec5ff', '#4bffbb', '#ffbd4e', '#ff4d82', '#ffabab', '#847bff', '#9b4979'];

const getConfigData = async() => {
    return await new Promise((resolve, reject) => {
        fs.readFile(config_file, 'utf-8', (err, data) => {
            if (err) {
                console.log('read config error');
                reject();
            } else {
                resolve(JSON.parse(data))
            }
        });
    })
}

const getTextSvg = async(svg, svg_path, text) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(svg_path, svg, err => {
            if (!err) {
                console.log(text + '.svg生成成功！');
                resolve()
            } else {
                reject();
            }
        })
    })
}

const addBackground = (svg) => {
    svg = new JSDOM('<!DOCTYPE html>' + svg);
    svg = svg.window.document.querySelector('svg')
    svg.style.background = '#401051';
    svg = svg.outerHTML

    return svg
}

const getTextImage = async(text, svg_options) => {
    let svg_path = export_path + 'text/' + text + '.svg';
    let png_path = export_path + 'text/' + text + '.png';

    let svg = await textToSVG.getSVG(text, svg_options);
    svg = addBackground(svg)

    await getTextSvg(svg, svg_path, text);

    return new Promise((resolve, reject) => {
        gm(svg_path).write(png_path, err => {
            if (!err) {
                console.log(text + '.png生成成功！');
                resolve(png_path)
            } else {
                reject();
            }
        })
    })
}

const getRadamColor = () => {
    return color_list[Math.floor(Math.random() * color_list.length)];
}

async function init() {
    let config_data = await getConfigData();


    config_data.forEach(async(config, index) => {
        let text_options = { x: 0, y: 0, fontSize: font_size, anchor: 'left top', attributes: { fill: '#bfcbff' } };

        let builder = gm(template_file);

        builder.draw('image Over 270, 156, ' + config.percent.length * number_per + ', ' + font_height + ' "' + await getTextImage(config.percent, text_options) + '"')
        builder.draw('image Over 240, 216, ' + config.name.length * text_per + ', ' + font_height + ' "' + await getTextImage(config.name, text_options) + '"')
        builder.draw('image Over 240, 276, ' + config.slogan.length * text_per + ', ' + font_height + ' "' + await getTextImage(config.slogan, text_options) + '"')

        for (let i = 0; i < config.character.length; i++) {
            builder.draw('image Over 30, ' + (character_height_begin + i * 50) + ', ' + config.character[i].length * text_per + ', ' + font_height + ' "' + await getTextImage(config.character[i], text_options) + '"')
        }

        let x = 30;
        for (let i = 0; i < config.keywords.length; i++) {

            if (i == 6) {
                x = 30;
            }

            text_options.attributes.fill = getRadamColor();

            builder.draw('image Over ' + x + ', ' + (i < 6 ? keyword_height_begin : keyword_height_begin + 70) + ', ' + config.keywords[i].length * text_per + ', ' + font_height + ' "' + await getTextImage(config.keywords[i], text_options) + '"')

            x += config.keywords[i].length * text_per + 50;
        }

        //qr
        builder.draw('image Over 322, 1022, 108, 108 "' + qr_file + '"')

        //导出图片
        builder.write(export_path + 'result_' + index + '.jpg', function(err) {
            if (!err) {
                console.log('done')
            } else {
                console.log(err.message || "出错了！");
            }
        })
    })
}

init();