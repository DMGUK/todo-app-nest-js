"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'public', 'views'));
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    hbs.registerHelper('add', (a, b) => a + b);
    hbs.registerHelper('subtract', (a, b) => a - b);
    hbs.registerHelper('gt', (a, b) => a > b);
    hbs.registerHelper('lt', (a, b) => a < b);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.enableCors({
        origin: 'http://localhost:4200',
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map