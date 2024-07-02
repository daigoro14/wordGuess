"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require('express')
const router = express_1.default.Router();
// const translate = require('translate')
const translate_1 = __importDefault(require("translate"));
function translateString(str, translateTo) {
    return __awaiter(this, void 0, void 0, function* () {
        // translate.engine = "libre";
        const foo = yield (0, translate_1.default)(str, translateTo);
        console.log(foo);
    });
}
// import translate from 'translate'
// if ('engine' in translate) {
//     translate.engine = "deepl";
//   } else {
//     console.error("The 'engine' property is not available in the translate module.");
//   }
// if ('key' in translate) {
// translate.key = process.env.DEEPL_KEY;
// } else {
// console.error("The 'key' property is not available in the translate module.");
// }
// const text = translate("Hello world", "es");
// console.log(text);
exports.router = router;
