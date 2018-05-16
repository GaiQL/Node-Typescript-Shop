"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const listType_1 = require("../models/listType");
const baseProList_1 = require("../models/baseProList");
const user_1 = __importDefault(require("../models/user"));
const doctor_1 = require("../models/doctor/doctor");
exports.find = (req, res, next) => {
    let promiseP = user_1.default.findOne({ key: req.signedCookies.key }, { promiseList: 1 }).exec();
    let promiseD = doctor_1.modle_doctor.find({ hospitalId: req.signedCookies.key }, { doctorName: 1, key: 1, _id: 0 }).lean().exec();
    let promiseALL = Promise.all([promiseP, promiseD]);
    promiseALL.then((dataArr) => {
        dataArr[1].forEach((e, i) => {
            e.doctorId = e.key;
            delete e.key;
        });
        res.send({ status: 200, message: '获取成功', data: { promiseList: dataArr[0].promiseList, doctorList: dataArr[1] } });
        res.end();
    })
        .catch((err) => { next(err); });
};
exports.listTypeFind = (req, res, next) => {
    let promise = listType_1.model_listType.find().exec();
    promise.then((data) => {
        res.send({ status: 200, message: '获取成功', data });
    })
        .catch((err) => { next(err); });
};
exports.projectListFind = (req, res, next) => {
    let promise = baseProList_1.model_baseProList.find({ STId: req.body.key }, { key: 1, proName: 1 }).lean().exec();
    promise.then((data) => {
        data.forEach((e, i) => {
            for (let key in e) {
                e.projectId = e.key;
                e.projectName = e.proName;
                delete e.key;
                delete e.proName;
            }
        });
        res.send({ status: 200, message: '获取成功', data });
    })
        .catch((err) => { next(err); });
};
//# sourceMappingURL=product.js.map