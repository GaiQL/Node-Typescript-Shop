"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let productS = new mongoose_1.default.Schema({
    promiseId: Number,
    promiseTitle: String
});
exports.model_product = mongoose_1.default.model('product', productS);
//# sourceMappingURL=product.js.map