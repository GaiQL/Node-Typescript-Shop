"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// import { verification_NIF } from '../models/order/verification_N';
// import { doctorIf } from '../models/doctor/doctor'
const moment_1 = __importDefault(require("moment"));
function changeDate(date, formatString) {
    if (!formatString) {
        formatString = 'YYYY-MM-DD HH:mm:ss';
    }
    if (typeof date == 'undefined') {
        return undefined;
    }
    if (date instanceof Date) {
        return moment_1.default(date).format(formatString);
    }
    else {
        throw new Error('must Date 嘿嘿嘿嘿');
    }
}
exports.stringTime = (data, str) => {
    data.forEach((e, i) => {
        if (str instanceof Array) {
            for (let j = 0; j < str.length; j++) {
                // console.log( e[str[j]] );
                e[str[j]] = changeDate(e[str[j]]);
            }
        }
        else if (typeof str == 'string') {
            // str变量，不要用.  ....
            e[str] = changeDate(e[str]);
        }
        else {
            throw new Error('some error');
        }
    });
};
//# sourceMappingURL=stringTime.js.map