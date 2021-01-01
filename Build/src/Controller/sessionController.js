"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionNumber = exports.getSessionUser = exports.getSessionCompany = void 0;
var sessionRepository = __importStar(require("../Repository/sessionRepository"));
//Get all session by Company specify
var getSessionCompany = function (req, res) {
    var ComId = req.params.ComId;
    parseAndRequest(ComId, sessionRepository.filterByCompany).then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(400).json({
            err: err
        });
    });
};
exports.getSessionCompany = getSessionCompany;
//Get all session by User specify
var getSessionUser = function (req, res) {
    var ComId = req.params.ComId;
    var UserId = req.params.UserId;
    parseAndRequest(ComId, sessionRepository.filterByUser, UserId).then(function (result) {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(400).json({
            err: err
        });
    });
};
exports.getSessionUser = getSessionUser;
// Get session number on time interval.
var getSessionNumber = function (req, res) {
    var timeInterval = req.params.timeInterval;
    parseAndRequest(timeInterval, sessionRepository.numberSessionOn).then(function (result) {
        res.status(200).json({
            result: result
        });
    });
};
exports.getSessionNumber = getSessionNumber;
var parseAndRequest = function (text, funct, text2) {
    var ComId = parseInt(text);
    if (text2 != undefined) {
        var promise1 = new Promise(function (result, reject) {
            var UserId = parseInt(text2);
            if (!(isNaN(ComId) || isNaN(UserId))) {
                result(funct(ComId, UserId));
            }
            else {
                reject("Some value are incorrect");
            }
        });
        return promise1;
    }
    else {
        var promise2 = new Promise(function (result, reject) {
            if (!isNaN(ComId)) {
                result(funct(ComId));
            }
            else {
                reject("Value is incorrect");
            }
        });
        return promise2;
    }
};
