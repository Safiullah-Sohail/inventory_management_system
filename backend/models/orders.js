const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { INTEGER, DATE, DECIMAL, BOOLEAN } = DataTypes;
    let _models = {};
    const Orders = sequelize.$$defineModel(
        'Orders',
        {
            orderDate: {
                type: DATE,
                allowNull: false,
            },
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */
    Orders.associate = (models) => {
        _models = models;
        Orders.hasMany(models.OutgoingItems, {
            foreignKey: 'outgoingItemsId',
            as: models.OutgoingItems.$$name,
        });
    };

    /* ================== Instance Methods ================== */

    return Orders;
};
