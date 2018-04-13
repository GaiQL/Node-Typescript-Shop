"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sth_1 = require("../models/sth");
exports.Home = (req, res) => {
    let newHome = new sth_1.SthModel({
        age: '123'
    });
    newHome.save((err) => {
        if (err)
            return console.log(err);
        console.log('添加成功');
        // newHome.find(( err:Error,data: )=>{
        //
        // })
    });
    res.send('come on!');
    res.end();
};
//# sourceMappingURL=index.js.map