"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const doctor_1 = require("../models/doctor/doctor");
const check_1 = require("express-validator/check");
const counter_1 = require("../models/counter");
const stringTime_1 = require("../congfig/stringTime");
const validationResult_1 = require("../congfig/validationResult");
const fs_1 = __importDefault(require("fs"));
exports.save_examine = [
    check_1.body('doctorName').isLength({ min: 1, max: 100 }),
    check_1.body('doctorCountry').isLength({ min: 1, max: 100 }),
    check_1.body('doctorSex').isLength({ min: 1, max: 1 }).isNumeric().toInt(),
    check_1.body('doctorJob').isLength({ min: 1, max: 100 }),
    check_1.body('doctorZizhi').isLength({ min: 1, max: 10 }),
    check_1.body('jobStartTime').isLength({ min: 7, max: 100 }),
    check_1.body('doctorEducation').isLength({ min: 1, max: 10 }),
    check_1.body('bdId').isLength({ min: 1, max: 10 }).isNumeric().toInt(),
    check_1.body('doctorGoodat').isLength({ min: 1, max: 100 }),
    check_1.body('doctorInfo').isLength({ min: 1, max: 200 }),
    check_1.body('doctorZizhiList').isLength({ min: 1, max: 1000 }),
];
exports.save = (req, res, next) => {
    counter_1.getNextUserSequenceValue('key_doctors', next).then((key) => {
        req.body.key = key.last_key;
        let newData = new doctor_1.modle_doctor(req.body);
        newData.save((err) => {
            if (err)
                return next(err);
            res.send({
                status: 200,
                message: '添加医生成功'
            });
        });
    })
        .catch((err) => {
        next(err);
    });
};
exports.find_examine = [
    check_1.body('currentPage').isLength({ min: 1, max: 1000 }).isNumeric().customSanitizer((value) => { return value ? value : 1; }),
    check_1.body('type').isLength({ min: 1, max: 100 }).isNumeric().customSanitizer((value) => { return value ? value : 0; }),
    check_1.body('doctorName').isLength({ min: 0, max: 100 }),
    check_1.body('doctorKey').optional({ checkFalsy: true }).isLength({ min: 0, max: 100 }).isNumeric()
];
exports.find = (req, res, next) => {
    validationResult_1.validationResult_FN(req, res);
    //  全部  审核中  驳回  已置顶  上架中  已下架
    let { type, doctorName, doctorKey } = req.body;
    let find_condition = {};
    console.log(doctorName, doctorKey, type); //type默认是 0.....
    if (type == 1) {
        find_condition = { doctorCheckState: 0 };
    }
    else if (type == 2) {
        find_condition = { doctorCheckState: 2 };
    }
    else if (type == 3) {
        find_condition = { doctorCheckState: 1, doctorUpshelf: 1, isTop: 1 };
    }
    else if (type == 4) {
        find_condition = { doctorCheckState: 1, doctorUpshelf: 1, isTop: 0 };
    }
    else if (type == 5) {
        find_condition = { doctorCheckState: 1, doctorUpshelf: 0 };
    }
    if (doctorKey) {
        find_condition.key = doctorKey;
    }
    if (doctorName) {
        find_condition.doctorName = { $regex: '^' + doctorName, $options: 'm' };
    }
    doctor_1.modle_doctor.count(find_condition, (err, count) => {
        let promise = doctor_1.modle_doctor.find(find_condition).lean().exec();
        promise.then((data) => {
            stringTime_1.stringTime(data, 'actionTime');
            res.send({
                status: 200,
                message: '获取医生列表成功！',
                data: {
                    doctorSum: count,
                    doctorList: data || []
                }
            });
        })
            .catch((err) => { next(err); });
    });
};
exports.editDoctorIsTop_examine = [
    check_1.body('key').isNumeric().isLength({ min: 1, max: 10 }),
    check_1.body('isTop').isNumeric().isLength({ min: 1, max: 1 })
];
exports.editDoctorIsTop = (req, res, next) => {
    // key
    // isTop
    validationResult_1.validationResult_FN(req, res);
    let promise = doctor_1.modle_doctor.findOne({ key: req.body.key }).exec();
    promise.then((data) => {
        console.log(data);
        data.isTop = req.body.isTop;
        if (data.isTop) {
            data.topTime = new Date();
        }
        else {
            data.topTime = undefined;
        }
        data.save((err) => {
            if (err)
                return next(err);
            res.send({
                status: 200,
                message: data.isTop ? '置顶成功' : '取消置顶成功'
            });
        });
    });
};
exports.findOne_examine = [
    check_1.body('key').isNumeric().isLength({ min: 1, max: 10 })
];
exports.findOne = (req, res, next) => {
    validationResult_1.validationResult_FN(req, res);
    let promise = doctor_1.modle_doctor.findOne({ key: req.body.key }).exec();
    promise.then((data) => {
        let arr = [];
        data.doctorGoodat.split(',').forEach((e, i) => {
            arr.push({ typeId: e });
        });
        res.send({
            status: 200,
            message: '获取医生信息成功',
            data: {
                ymDoctor: data,
                zizhiList: JSON.parse(data.doctorZizhiList),
                typeList: arr
            }
        });
    });
};
exports.editDoctor = (req, res, next) => {
    let promise = doctor_1.modle_doctor.findOne({ key: req.body.key }).exec();
    promise.then((data) => {
        console.log(data);
        for (let key in req.body) {
            data[key] = req.body[key];
        }
        data.save((err) => {
            if (err)
                return next(err);
            res.send({
                status: 200,
                message: '编辑医生成功'
            });
            res.end();
        });
    });
};
exports.save_Img = (req, res, next) => {
    // console.log( req.file );
    let data = {};
    if (req.file.path) {
        data.status = 200;
        data.data = process.env["img_domainName"] + '/' + req.file.path;
    }
    else {
        data.status = 500;
        data.data = 'some error';
    }
    res.send(data);
    res.end();
};
exports.delete_Img_examine = [
    check_1.body('fileName').isLength({ min: 5, max: 100 })
];
exports.delete_Img = (req, res, next) => {
    let data = {};
    fs_1.default.unlink(req.body.fileName, (err) => {
        if (err)
            return console.log(err);
        res.send({
            status: 200,
            message: '删除图片成功'
        });
        res.end();
    });
};
//# sourceMappingURL=doctor.js.map