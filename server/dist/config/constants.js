"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
const dotenv = require("dotenv");
dotenv.config();
const { CONNECT_TO_DB, CLIENT_URL } = process.env;
exports.CONSTANTS = {
    CONNECT_TO_DB,
    CLIENT_URL
};
//# sourceMappingURL=constants.js.map