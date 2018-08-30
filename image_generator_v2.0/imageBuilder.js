const gm = require('gm')
const define = require('./define')

function GM() {
    this.builder = gm(define.template_file)

    this.drawText = (x, y, config) => {
        this.builder.draw('image Over ' + x + ', ' + y + ', ' + config.width + ', ' + config.height + ' "' + config.path + '"')
    }

    this.drawImage = (x, y, width, height, path) => {
        this.builder.draw('image Over ' + x + ', ' + y + ', ' + width + ', ' + height + ' "' + path + '"')
    }

    this.write = async(path) => {
        return await this.builder.write(path, function(err) {
            if (!err) {
                console.log('done')
            } else {
                console.log("出错了！");
            }
        })
    }
}

module.exports.createInstance = () => {
    return new GM();
}