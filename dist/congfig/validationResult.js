"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
exports.validationResult_FN = (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.send({
            status: 422,
            data: '参数有误',
            message: errors.mapped()
        });
        res.end();
    }
    return !errors.isEmpty();
};
//# sourceMappingURL=validationResult.js.map