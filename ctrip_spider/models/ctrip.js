const db = require('../utils/db')
const Ctrip = db.import('./../schema/ctrip.js')
const define = require('../config/define')

module.exports = {
    async Add(ctrip) {
        try {
            return await Ctrip.create(ctrip)
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

    async DeleteTable() {
        try {
            return await db.query(define.delete_table_sql)
        } catch (e) {
            console.log(e)
            return null
        }
    }
}