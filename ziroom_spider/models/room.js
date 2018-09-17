const db = require('./../utils/db')
const Room = db.import('./../schema/room.js')
const define = require('./../config/define')

module.exports = {
    async Add(room) {
        try {
            return await Room.create(room)
        } catch (e) {
            console.log(e)
            return null
        }
    },

    async CreateTable() {
        try {
            return await db.query(define.create_table_sql)
        } catch (e) {
            console.log(e)
            return null
        }
    },

    async ClearTable() {
        try {
            return await db.query(define.clear_table_sql)
        } catch (e) {
            console.log(e)
            return null
        }
    }
}