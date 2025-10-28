"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_route_1.default);
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
