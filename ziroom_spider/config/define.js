module.exports.config_file_path = './config/query_define.json';

module.exports.tmp_path = '../tmp/'

module.exports.base_url = 'http://m.ziroom.com/v7/room/list.json?city_code=110000&face=&type=&rface=&hface=&feature=&around=&leasetype=&tag=&version=&subway_code=&subway_station_code=&bizcircle_code=&suggestion_type=&suggestion_value=&keywords=&sort={query}';

module.exports.detail_url = 'http://m.ziroom.com/v7/room/detail.json?city_code=110000&id={room_id}'

module.exports.keeper_url = 'http://m.ziroom.com/v7/room/detail-steward.json?id={room_id}&house_id={house_id}&resblock_id={resblock_id}&house_type={house_type}'

module.exports.clear_table_sql = 'delete from room20181003;'

module.exports.delete_table_sql = 'DROP TABLE IF EXISTS `room20181003`;'

module.exports.create_table_sql =
    'CREATE TABLE `room20181003` (' +
    '   `Id` int(11) unsigned NOT NULL AUTO_INCREMENT,' +
    '   `HouseId` int(20) DEFAULT NULL,' +
    '   `HouseCode` varchar(50) DEFAULT NULL,' +
    '   `RoomId` int(20) DEFAULT NULL,' +
    '   `RoomName` varchar(100) DEFAULT NULL,' +
    '   `RoomCode` varchar(50) DEFAULT NULL,' +
    '   `RoomVersion` varchar(50) DEFAULT NULL,' +
    '   `RoomArea` float(10,2) DEFAULT NULL,' +
    '   `RoomIntroduction` text,' +
    '   `RoomFloor` int(5) DEFAULT NULL,' +
    '   `RoomFloorTotal` int(5) DEFAULT NULL,' +
    '   `Price` int(7) DEFAULT NULL,' +
    '   `PriceUnit` varchar(10) DEFAULT NULL,' +
    '   `PriceDesc` varchar(255) DEFAULT NULL,' +
    '   `Tags` text,' +
    '   `Space` text,' +
    '   `Roommates` text,' +
    '   `Config` text,' +
    '   `HouseSubway` text,' +
    '   `HouseBuildYear` int(5) DEFAULT NULL,' +
    '   `HouseBuildType` varchar(50) DEFAULT NULL,' +
    '   `HouseName` varchar(50) DEFAULT NULL,' +
    '   `HouseHeatingType` varchar(50) DEFAULT NULL,' +
    '   `HouseAround` varchar(255) DEFAULT NULL,' +
    '   `HouseTraffic` varchar(255) DEFAULT NULL,' +
    '   `QueryPrice` varchar(20) DEFAULT NULL,' +
    '   `QueryRegion` varchar(20) DEFAULT NULL,' +
    '   `QueryArea` varchar(20) DEFAULT NULL,' +
    '   `KeeperAvatar` varchar(255) DEFAULT NULL,' +
    '   `KeeperName` varchar(10) DEFAULT NULL,' +
    '   `KeeperPhone` varchar(30) DEFAULT NULL,' +
    '   `CreateTime` datetime DEFAULT NULL,' +
    '   PRIMARY KEY (`Id`)' +
    ') ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;'

module.exports.db_config = {
    username: 'root',
    password: 'Legend1qaz@wsx',
    host: '39.105.89.237',
    port: 3306,
    database: 'ziroom',
    dialectOptions: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    }
}