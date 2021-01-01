"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SessionData = new mongoose_1.Schema({
    CompanyId: {
        type: Number
    },
    UserId: {
        type: Number
    },
    Metodo: {
        type: String
    },
    APIId: {
        type: String
    },
    Tiempo: {
        type: Number
    },
    Date: {
        type: Date
    },
    Source: {
        type: String
    }
});
var Session = mongoose_1.model('SessionData', SessionData);
exports.default = Session;
