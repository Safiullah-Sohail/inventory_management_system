const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { STRING, VIRTUAL, BOOLEAN } = DataTypes;
    let _models = {};
    const Notifications = sequelize.$$defineModel(
        'Notifications',
        {
            notificationType: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'notificationType'),
            },
            notificationMessage: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'notificationMessage'),
            },
            /* ================== Virtual Keys ================== */
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */

    /* ================== Instance Methods ================== */

    return Notifications;
};
