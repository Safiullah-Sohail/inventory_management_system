const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { Errors } = global.appTranslations;

module.exports = function (sequelize, DataTypes) {
    const { STRING, VIRTUAL, INTEGER, BOOLEAN } = DataTypes;
    let _models = {};
    const Suppliers = sequelize.$$defineModel(
        'Suppliers',
        {
            firstName: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'firstName'),
            },
            lastName: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'lastName'),
            },
            email: {
                type: STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Invalid Email!',
                    },
                    isUnique(value) {
                        return Suppliers.$$findOne({
                            query: { where: { email: value } },
                            throwError: false,
                        }).then((user) => {
                            if (user) throw 'Email must be unique!';
                        });
                    },
                },
            },
            phoneNumber: {
                type: STRING,
                validate: {
                    len: {
                        args: [11],
                        msg: Errors.Users.PhoneNumber.len,
                    },
                },
            },
            /* ================== Virtual Keys ================== */
            fullName: {
                type: VIRTUAL,
                get: function () {
                    const lastName = this.getDataValue('lastName');
                    return startCase(
                        `${this.getDataValue('firstName')}${lastName ? ` ${lastName}` : ''}`
                    );
                },
            },
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */
    Suppliers.associate = (models) => {
        _models = models;
        Suppliers.hasMany(models.IncomingItems, {
            foreignKey: 'supplierId',
            as: models.IncomingItems.$$name,
        });
    };


    /* ================== Instance Methods ================== */

    return Suppliers;
};
