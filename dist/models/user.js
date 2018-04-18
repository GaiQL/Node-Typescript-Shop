"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// unique: true  唯一 value;
// 拿到数据后会用定义的类型去存储，但是有些不能转换，boolean
var userSchema = new mongoose_1.default.Schema({
    // email: { type: String, unique: true },
    account: String,
    password: Number
});
userSchema.pre('save', (next) => {
    console.log('i save you');
    next();
});
userSchema.methods.speak = (sth) => {
    console.log(`look ${sth}`);
};
var model = mongoose_1.default.model('user', userSchema);
exports.default = model;
//# sourceMappingURL=user.js.map