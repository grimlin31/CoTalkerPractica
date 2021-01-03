import * as K from '../K'; //Constantes de configuración

// Import para el uso de servidor
import express, {Express} from 'express';
import bodyParser from "body-parser";

//Import para la base de datos MongoBD
import mongoose from "mongoose"
import * as sessionController from "./Controller/sessionController";


const server: Express = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connect(K.TEST_ADDRESS_BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connection Successful")
}).catch(err =>{
    console.error(`Connection Error: ${err}`)
})


server.get('/filterByCompany/:ComId', sessionController.getSessionCompany)
server.get('/filterByUser/:ComId/:UserId', sessionController.getSessionUser)

server.get('/sessionNumber/:ComId/:UserId/:timeInterval/:yMin/:mMin/:dMin/:yMax/:mMax/:dMax', 
    sessionController.getSessionNumber)


server.listen(K.NO_DOCKER_PORT, () => {
    console.log(`Server listening at port ${K.NO_DOCKER_PORT} `)
})
