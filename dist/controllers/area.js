"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("../models/area");
exports.find = (req, res, next) => {
    let promise = area_1.model_area.find().exec();
    promise.then((data) => {
        res.send({ status: 200, message: '获取成功', data });
        res.end();
    })
        .catch((err) => {
        next(err);
    });
};
exports.save = (req, res, next) => {
    let newDate = new area_1.model_area({
        appShowState: 0
    });
    newDate.save((err) => {
        if (err)
            next(err);
        res.send('ok');
        res.end();
    });
};
//# sourceMappingURL=area.js.map