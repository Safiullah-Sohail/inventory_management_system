const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { STRING, BOOLEAN } = DataTypes;
    let _models = {};
    const Categories = sequelize.$$defineModel(
        'Categories',
        {
            name: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'name'),
            },
            /* ================== Virtual Keys ================== */
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */
    Categories.associate = (models) => {
        _models = models;
        Categories.hasMany(models.Items, {
            foreignKey: 'categoryId',
            as: models.Items.$$name,
        });
    };

    /* ================== Instance Methods ================== */

    return Categories;
};
