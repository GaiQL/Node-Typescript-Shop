"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../models/db/db");
const counter_1 = require("../models/counter");
exports.save = (req, res, next) => {
    counter_1.getNextUserSequenceValue('key_db', next)
        .then((data) => {
        let newData = new db_1.model_db({
            bdAddr: "北京市",
            bdPhone: "18800151083",
            bdName: "林谟阳",
            key: data.last_key
        });
        newData.save((err) => {
            if (err) {
                return next(err);
            }
            console.log('添加成功');
            res.send('添加成功');
            res.end();
        });
    });
};
exports.find = (req, res, next) => {
    let promise = db_1.model_db.find().exec();
    promise.then((data) => {
        res.send({
            message: '获取DB信息成功',
            status: 200,
            data
        });
    })
        .catch((err) => {
        if (err) {
            return next(err);
        }
    });
};
//# sourceMappingURL=db.js.map