"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const goodItem_1 = require("../goodItem/goodItem");
let doctorS = new mongoose_1.default.Schema({
    key: Number,
    doctorName: String,
    doctorSex: Number,
    doctorCountry: String,
    doctorJob: String,
    doctorZizhi: String,
    jobStartTime: Date,
    doctorEducation: String,
    bdId: Number,
    doctorGoodat: String,
    doctorInfo: String,
    hospitalId: Number,
    doctorPhoto: JSON,
    doctorZizhiList: JSON,
    actionTime: { type: Date, default: Date.now() },
    doctorUpshelf: { type: Number, default: 1 },
    isTop: { type: Number, default: 0 },
    topTime: Date,
    doctorCheckState: { type: Number, default: 0 },
    goodat: String
}, { timestamps: true });
doctorS.pre('save', function (next) {
    let data = this;
    const findArr = [];
    data.doctorGoodat.split(',').forEach((e, i) => {
        findArr.push({ key: e });
    });
    let goodatArr = [];
    let promise = goodItem_1.model_goodItem.find({ $or: findArr }).exec();
    promise.then((typedata) => {
        typedata.forEach((e, i) => {
            goodatArr.push(e.typeName);
        });
        data.goodat = goodatArr.join(',');
        console.log(data);
        next();
    });
});
exports.modle_doctor = mongoose_1.default.model('doctor', doctorS);
//# sourceMappingURL=doctor.js.map