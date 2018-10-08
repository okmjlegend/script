module.exports.flighthotel_query_list_url = 'https://m.ctrip.com/restapi/h5api/globalsearch/search?action=commonsearchlist&osid=I&pageindex={pageindex}&pagesize=50&client-system=ios&userid=11&clientid=12001090210118460434&source=globalapp715&pageindex=1&datatype=flighthotel&keyword=%E7%BE%8E%E5%9B%BD&lon=116.308769&lat=39.953147&cityid=1&star=0&score=0&price=0&sort=0&startcityid=1&categoryid=0&traveldays=&foodlable=&foodstat=&poidistrictid=&appVersion=7.15.2&firsttagname=&secondtagnames=&destinationCityIds=';

module.exports.clear_table_sql = 'delete from ctrip;'

module.exports.delete_table_sql = 'DROP TABLE IF EXISTS `ctrip`;'

module.exports.create_table_sql =
    'CREATE TABLE `ctrip` (' +
    '   `Id` int(11) unsigned NOT NULL AUTO_INCREMENT,' +
    '   `Code` varchar(50) DEFAULT NULL,' +
    '   `Type` varchar(10) DEFAULT NULL,' +
    '   `Name` text,' +
    '   `Price` int(10) DEFAULT NULL,' +
    '   `CommentCount` int(10) DEFAULT NULL,' +
    '   `CommentScore` float(10,1) DEFAULT NULL,' +
    '   `Sales` int(10) DEFAULT NULL,' +
    '   `IsHot` bit DEFAULT NULL,' +
    '   `CreateTime` datetime DEFAULT NULL,' +
    '   PRIMARY KEY (`Id`)' +
    ') ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;'

module.exports.db_config = {

    port: 3306,
    database: 'ziroom',
    dialectOptions: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    }
}