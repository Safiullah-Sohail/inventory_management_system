('use strict');
const { asyncMiddleware } = global;
const { ROLES, STATUS } = global.appEnums;
const { getHashedPassword } = global.commonFunctions;
const { Users, UserBooks, Books } = global.db;
const SendMAil = require(`${global.paths.lib}/email-sender`);
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
const { decodeAPiToken } = global.commonFunctions;
const { Op, Sequelize } = require('sequelize');
const user = require('./user');
const {
    newAndConfirmPasswordValidator,
} = require(`${global.paths.middlewares}/password`);
const BookData = require('../../../BookData.json');
const { upperCase } = require('lodash');

module.exports = (router) => {
    router.post(
        '/login',
        asyncMiddleware(async (req, res) => {
            const { email, password } = req.body;
            const user = await Users.$$findOne({
                query: { where: { email, password: getHashedPassword(password) } },
                error: 'Invalid email or password!',
            });

            res.http200({
                token: user.createToken(),
                user,
            });
        })
    );

    router.post(
        '/signup',
        asyncMiddleware(async (req, res) => {
            const user = await Users.create({ ...req.body, role: ROLES.reader });
            res.http200({ token: user.createToken(), user });
        })
    );

    router.get(
        '/me',
        asyncMiddleware(async (req, res) => {
            res.http200({
                user: req.user,
            });
        })
    );

    router.get(
        '/all-users',
        asyncMiddleware(async (req, res) => {
            const query = {
                where: {},
                order: sequelizeConfig.Order.Desc(),
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'initials',
                    'fullName',
                    'email',
                    'friends',
                ],
            };
            const { rows, count } = await Users.findAndCountAll(query);
            // console.log("===============STart=====================");
            // console.log(rows);
            // console.log("====================================");
            const users = rows.map((obj, index, self) => {
                // let user = obj.dataValues;
                // let user = {
                //   ...obj,
                //   friendsList: [],
                // };
                obj.dataValues = {
                    ...obj.dataValues,
                    friendsList: [],
                };
                self.forEach((e) => {
                    const u = e.dataValues;
                    if (obj.dataValues.friends && obj.dataValues.friends.includes(u.id)) {
                        obj.dataValues.friendsList.push(u);
                    }
                });
                return obj;
            });

            console.log('====================================');
            console.log(users);
            console.log('====================================');

            res.http200(users, { count: count });
        })
    );

    router.post(
        '/verify-token',
        asyncMiddleware(async (req, res) => {
            const { token } = req.body;
            const user = await getUserFromToken(token);
            if (token == user.token) {
                return res.http200('Token verified');
            }
            return res.http500('Token unverified');
        })
    );

    router.put(
        '/reset-password',
        [newAndConfirmPasswordValidator],
        asyncMiddleware(async (req, res) => {
            const { token, confirmPassword } = req.body;
            const user = await getUserFromToken(token);

            const updatedUser = await user.update({
                password: confirmPassword,
                token: '',
            });
            return res.http200(updatedUser);
        })
    );

    router.param(
        'userId',
        asyncMiddleware(async (req, res, next, userId) => {
            const user = await Users.$$findByPk({ id: +userId });
            req.user = user;
            next();
        })
    );

};

async function getUserFromToken(token) {
    const decodedToken = await decodeAPiToken(token);
    const user = await Users.$$findOne({
        query: {
            where: {
                email: decodedToken.email,
            },
        },
    });
    return user;
}
