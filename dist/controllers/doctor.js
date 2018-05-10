"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = (req, res, next) => {
};
exports.save_Img = (req, res, next) => {
    // console.log( req.file );
    let data = {};
    if (req.file.path) {
        data.status = 200;
        data.data = req.file.path;
    }
    else {
        data.status = 500;
        data.data = 'some error';
    }
    res.send(data);
    res.end();
};
//# sourceMappingURL=doctor.js.map