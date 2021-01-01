import {Response,Request} from "express";
import * as sessionRepository from "../Repository/sessionRepository"


//Get all session by Company specify
export const getSessionCompany = (req:Request, res: Response ) => {
    let ComId = req.params.ComId
    parseAndRequest(ComId,sessionRepository.filterByCompany).then((result)=>{
        res.status(200).json(result)
    }).catch(err => {
        res.status(400).json({
            err: err
        })
    })
}

//Get all session by User specify
export const getSessionUser = (req:Request, res: Response) => {
    let ComId = req.params.ComId
    let UserId = req.params.UserId
    
    parseAndRequest(ComId,sessionRepository.filterByUser, UserId).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(400).json({
            err : err
        })
    })
    
}

// Get session number on time interval.

export const getSessionNumber = (req: Request, res: Response) =>{
    const timeInterval = req.params.timeInterval
    
    parseAndRequest(timeInterval, sessionRepository.numberSessionOn).then(result => {
        res.status(200).json({
            result: result
        })
    })
}

const parseAndRequest = (text:string, funct:Function, text2?:string): Promise<any> => {
    const ComId = parseInt(text)
    if(text2 != undefined){
          
        const promise1 = new Promise((result,reject) => {
            const UserId = parseInt(text2)
            if ( !(isNaN(ComId) || isNaN(UserId))){
                result(
                    funct(ComId,UserId)
                )
            }else{
                reject(
                    "Some value are incorrect"
                )
            }
        })
        return promise1
            
    }else {

        const promise2 = new Promise((result,reject) =>{
            if (!isNaN(ComId)) {
                result (
                    funct(ComId)
                )
            } else {
                reject(
                    "Value is incorrect"
                )
            }
        })
        return promise2
    }    
}

