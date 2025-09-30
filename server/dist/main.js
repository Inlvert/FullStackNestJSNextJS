"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
let cachedServer = null;
async function bootstrapServer() {
    if (!cachedServer) {
        const server = (0, express_1.default)();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin || origin.endsWith('.vercel.app') || origin === 'http://localhost:3000') {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
        });
        await app.init();
        cachedServer = server;
    }
    return cachedServer;
}
async function handler(req, res) {
    const server = await bootstrapServer();
    server(req, res);
}
//# sourceMappingURL=main.js.map