"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
exports.Add = (req, res) => {
    let newData = new user_1.default({
        username: '嘿嘿',
        email: '1852332222212123adf333@163.com',
        password: '321',
        boolean: 'safd',
        arr: true
    });
    newData.save((err) => {
        if (err) {
            console.log('添加失败' + err);
            return;
        }
        console.log('添加成功');
        res.end();
    });
};
exports.findAll = (req, res) => {
    user_1.default.find((err, data) => {
        if (err)
            return console.log(err);
        console.log(data);
        res.end();
    });
};
exports.findOne = (req, res) => {
    // model.findById('5ad0752b42a4eb0c5c1851c6',( err:Error,data:UserModelIF )=>{
    //   if( err ) return console.log( err );
    //   data.username = '啧啧啧啧啧啧';
    //   data.save(( err:Error )=>{
    //     if( err ) return console.log( err );
    //     console.log('修改成功')
    //   })
    //   console.log( data );
    //   res.end();
    // })
    // promise处理：
    let promise = user_1.default.findById('5ad0752b42a4eb0c5c1851c6').exec();
    promise.then((data) => {
        data.username = '啧啧啧啧啧啧';
        return data.save(); // returns a promise
    })
        .then((data) => {
        console.log('修改成功');
    })
        .catch((err) => {
        console.log(err);
    });
};
// export let getApi = (req: Request, res: Response) => {
//   res.render("api/index", {
//     title: "API Examples"
//   });
// };
//# sourceMappingURL=add.js.map