"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
// import ejs from 'ejs';
exports.account = '';
exports.Index = (req, res) => {
    res.type('html');
    res.render('trunk');
};
exports.Home = (req, res, next) => {
    const account = process.env["ACCOUNT"];
    user_1.default.findOne({ account }, { _id: 0, password: 0 }, (err, data) => {
        if (err) {
            return next(err);
        }
        ;
        res.send({
            status: 200,
            data,
            message: '获取成功！'
        });
        res.end();
    });
};
//# sourceMappingURL=index.js.map