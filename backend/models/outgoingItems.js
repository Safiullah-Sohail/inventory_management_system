const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { INTEGER, DATE, DECIMAL, BOOLEAN } = DataTypes;
    let _models = {};
    const OutgoingItems = sequelize.$$defineModel(
        'OutgoingItems',
        {
            itemId: {
                type: INTEGER,
                references: {
                    model: 'items',
                    key: 'id',
                },
            },
            quantity: {
                type: DECIMAL,
                allowNull: false,
            },
            /* ================== Virtual Keys ================== */
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */
    OutgoingItems.associate = (models) => {
        _models = models;
        OutgoingItems.belongsTo(models.Orders, {
            foreignKey: 'orderId',
            as: models.Orders.$$name,
        });
    };

    /* ================== Instance Methods ================== */
    
    return OutgoingItems;
};
