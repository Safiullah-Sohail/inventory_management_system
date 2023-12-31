const fs = require('fs');
const path = require('path');

// Global Path Variables
global.appRoot = __dirname;
global.paths = {};

function defineNodeFoldersPathsOnGlobalObject() {
    fs.readdirSync(
        path.resolve(`${__dirname}`)
    ).filter(str => !str.includes('.')).forEach(dir => global.paths[dir] = `${global.appRoot}/${dir}`);
}

defineNodeFoldersPathsOnGlobalObject();

// Global Functions
global.appEnums = require(`${global.appRoot}/enums`);
global.appConstants = require(`${global.appRoot}/config/config.json`).app;
global.appTranslations = require(`${global.appRoot}/en`);
global.log = require(`${global.paths.lib}/logger`);
global.asyncMiddleware = require(`${global.paths.middlewares}/response/async-middleware`);

// Global Objects
global.commonFunctions = require(`${global.paths.lib}/common`);
global.sequelizeFunctions = require(`${global.paths.lib}/sequelize`);
global.db = require(`${global.paths.models}/index`);

