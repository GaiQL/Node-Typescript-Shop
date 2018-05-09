"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const counter_1 = require("../models/counter");
const goodItem_1 = require("../models/goodItem/goodItem");
exports.save = (req, res, next) => {
    counter_1.getNextUserSequenceValue('key_goodItem', next)
        .then((data) => {
        let newData = new goodItem_1.model_goodItem({
            typeName: '眼部',
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
    let promise = goodItem_1.model_goodItem.find().exec();
    promise.then((data) => {
        res.send({
            message: '获取医美类型列表成功',
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
//# sourceMappingURL=goodItem.js.map