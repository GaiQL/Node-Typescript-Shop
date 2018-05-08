"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var userKey = new mongoose_1.default.Schema({
    userLastKey: Number,
    type: { type: String, unique: true }
});
var userKeyMD = mongoose_1.default.model('counter', userKey);
//userkey自增
exports.getNextUserSequenceValue = (type, next, callback) => {
    //在这里放弃了promise,需要做一个返回值，但是promise貌似做不到...
    /*
        promise 不能返回值
        只能返回promise，因为它是异步的，外部要用就得 fn1().then(value => console.log(value)) 的方式拿到值
    */
    // 5ad9a85917dbc324205b6481  userlastKey
    let primise = userKeyMD.findOne({ type }).exec();
    primise
        .then((data) => {
        let lastId = ++data.userLastKey;
        data.userLastKey = lastId;
        return data.save();
    })
        .catch((err) => { if (err)
        return next(err); });
    return primise;
};
//# sourceMappingURL=counter.js.map