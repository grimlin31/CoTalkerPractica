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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var K = __importStar(require("../K")); //Constantes de configuración
// Import para el uso de servidor
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
//Import para la base de datos MongoBD
var mongoose_1 = __importDefault(require("mongoose"));
var sessionController = __importStar(require("./Controller/sessionController"));
var server = express_1.default();
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({
    extended: true
}));
mongoose_1.default.connect(K.TEST_ADDRESS_BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(function () {
    console.log("Connection Successful");
}).catch(function (err) {
    console.error("Connection Error: " + err);
});
server.get('/filterByCompany/:ComId', sessionController.getSessionCompany);
server.get('/filterByUser/:ComId/:UserId', sessionController.getSessionUser);
server.get('/sessionNumber/:timeInterval', sessionController.getSessionNumber);
server.listen(K.NO_DOCKER_PORT, function () {
    console.log("Server listening at port " + K.NO_DOCKER_PORT + " ");
});
