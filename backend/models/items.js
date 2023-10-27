const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { STRING, INTEGER, DECIMAL, BOOLEAN } = DataTypes;
    let _models = {};
    const Items = sequelize.$$defineModel(
        'Items',
        {
            categoryId: {
                type: INTEGER,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            name: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'name'),
            },
            description: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'description'),
            },
            price: {
                type: DECIMAL,
                allowNull: false,
            },
            imageUrl: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'imageURL'),
            },
            /* ================== Virtual Keys ================== */
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */
    Items.associate = (models) => {
        _models = models;
        Items.belongsTo(models.Categories, {
            foreignKey: 'categoryId',
            as: models.Categories.$$name,
        });
        Items.hasMany(models.IncomingItems, {
            foreignKey: 'itemId',
            as: models.IncomingItems.$$name,
        });
    };

    /* ================== Instance Methods ================== */
    
    return Items;
};
