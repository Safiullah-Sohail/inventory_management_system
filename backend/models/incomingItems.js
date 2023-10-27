const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { STRING, INTEGER, DECIMAL, BOOLEAN } = DataTypes;
    let _models = {};
    const IncomingItems = sequelize.$$defineModel(
        'IncomingItems',
        {
            itemId: {
                type: INTEGER,
                references: {
                    model: 'items',
                    key: 'id',
                },
            },
            supplierId: {
                type: INTEGER,
                references: {
                    model: 'suppliers',
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
    IncomingItems.associate = (models) => {
        _models = models;
        IncomingItems.belongsTo(models.Items, {
            foreignKey: 'itemId',
            as: models.Items.$$name,
        });
        IncomingItems.belongsTo(models.Suppliers, {
            foreignKey: 'supplierId',
            as: models.Suppliers.$$name,
        });
    };

    /* ================== Instance Methods ================== */
    
    return IncomingItems;
};
