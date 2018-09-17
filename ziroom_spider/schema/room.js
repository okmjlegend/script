module.exports = (sequelize, DataTypes) => {
    return sequelize.define('room', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'Id'
        },
        house_id: {
            type: DataTypes.INTEGER(20),
            field: 'HouseId'
        },
        house_code: {
            type: DataTypes.STRING,
            field: 'HouseCode'
        },
        room_id: {
            type: DataTypes.INTEGER(20),
            field: 'RoomId'
        },
        room_name: {
            type: DataTypes.STRING,
            field: 'RoomName'
        },
        room_code: {
            type: DataTypes.STRING,
            field: 'RoomCode'
        },
        room_version: {
            type: DataTypes.STRING,
            field: 'RoomVersion'
        },
        room_area: {
            type: DataTypes.FLOAT,
            field: 'RoomArea'
        },
        room_introduction: {
            type: DataTypes.STRING,
            field: 'RoomIntroduction'
        },
        room_floor: {
            type: DataTypes.INTEGER(5),
            field: 'RoomFloor'
        },
        room_floor_total: {
            type: DataTypes.INTEGER(5),
            field: 'RoomFloorTotal'
        },
        price: {
            type: DataTypes.INTEGER(7),
            field: 'Price'
        },
        price_unit: {
            type: DataTypes.STRING,
            field: 'PriceUnit'
        },
        price_desc: {
            type: DataTypes.STRING,
            field: 'PriceDesc'
        },
        tags: {
            type: DataTypes.STRING,
            field: 'Tags'
        },
        space: {
            type: DataTypes.STRING,
            field: 'Space'
        },
        roommates: {
            type: DataTypes.STRING,
            field: 'Roommates'
        },
        config: {
            type: DataTypes.STRING,
            field: 'Config'
        },
        house_subway: {
            type: DataTypes.STRING,
            field: 'HouseSubway'
        },
        house_build_year: {
            type: DataTypes.INTEGER(5),
            field: 'HouseBuildYear'
        },
        house_build_type: {
            type: DataTypes.STRING,
            field: 'HouseBuildType'
        },
        house_name: {
            type: DataTypes.STRING,
            field: 'HouseName'
        },
        house_heating_type: {
            type: DataTypes.STRING,
            field: 'HouseHeatingType'
        },
        house_around: {
            type: DataTypes.STRING,
            field: 'HouseAround'
        },
        house_traffic: {
            type: DataTypes.STRING,
            field: 'HouseTraffic'
        },
        query_price: {
            type: DataTypes.STRING,
            field: 'QueryPrice'
        },
        query_region: {
            type: DataTypes.STRING,
            field: 'QueryRegion'
        },
        query_area: {
            type: DataTypes.STRING,
            field: 'QueryArea'
        },
        keeper_avatar: {
            type: DataTypes.STRING,
            field: 'KeeperAvatar'
        },
        keeper_name: {
            type: DataTypes.STRING,
            field: 'KeeperName'
        },
        keeper_phone: {
            type: DataTypes.STRING,
            field: 'KeeperPhone'
        },
        create_time: {
            type: DataTypes.DATE,
            field: 'CreateTime'
        }
    }, {
        tableName: 'room'
    })
}