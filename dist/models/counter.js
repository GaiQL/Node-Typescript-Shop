"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var userKey = new mongoose_1.default.Schema({
    userLastKey: Number
});
var userKeyMD = mongoose_1.default.model('counter', userKey);
//userkey自增
exports.getNextUserSequenceValue = (id, next) => {
    //在这里放弃了promise,需要做一个返回值，但是primise貌似做不到...
    /*
        promise 不能返回值
        只能返回promise，因为它是异步的，外部要用就得 fn1().then(value => console.log(value)) 的方式拿到值
    */
    let lastId;
    userKeyMD.findById(id, (err, data) => {
        if (err)
            return next(err);
        console.log();
        lastId = data.userLastKey;
    });
    return ++lastId;
};
//# sourceMappingURL=counter.js.map