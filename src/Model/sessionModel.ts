import {Schema, model} from "mongoose"

const SessionData = new Schema({
        CompanyId: {
            type: Number 
        },
        UserId:{
            type: Number
        },
        Metodo:{
            type: String
        },
        APIId:{
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
    
    }
)

const Session = model('SessionData', SessionData)
export default Session