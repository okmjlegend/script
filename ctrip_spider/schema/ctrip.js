module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ctrip', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'Id'
        },
        type: {
            type: DataTypes.STRING,
            field: 'Type'
        },
        code: {
            type: DataTypes.STRING,
            field: 'Code'
        },
        name: {
            type: DataTypes.STRING,
            field: 'Name'
        },
        price: {
            type: DataTypes.INTEGER(10),
            field: 'Price'
        },
        commentScore: {
            type: DataTypes.FLOAT,
            field: 'CommentScore'
        },
        commentCount: {
            type: DataTypes.INTEGER(10),
            field: 'CommentCount'
        },
        sales: {
            type: DataTypes.INTEGER(10),
            field: 'Sales'
        },
        isHot: {
            type: DataTypes.BOOLEAN,
            field: 'IsHot'
        },
        create_time: {
            type: DataTypes.DATE,
            field: 'CreateTime'
        }
    }, {
        tableName: 'ctrip'
    })
}