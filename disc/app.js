"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const register_routes_1 = __importDefault(require("./routes/register.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// user routes
app.use('/nagriexpress/user/v1/account', register_routes_1.default);
app.use('/nagriexpress/user/v1/account', login_routes_1.default);
// product routes
app.use('/nagriexpress/v2/', product_routes_1.default);
// admin routes
app.use('/nagriexpress/v3/admin/', admin_routes_1.default);
exports.default = app;
