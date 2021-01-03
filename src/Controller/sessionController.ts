import {Response,Request} from "express";
import * as sessionRepository from "../Repository/sessionRepository"
import {filterByCompany, filterByUser, numberSessionOn} from "../Repository/sessionRepository";


//Get all session by Company specify
export const getSessionCompany = (req:Request, res: Response ) => {
    let param1 = [req.params.ComId]
    Request(param1,sessionRepository.filterByCompany)
        .then((result)=>{
            res.status(200).json(result)
        }).catch(err => {
            res.status(400).json({
                err: err
            })
        })
}

//Get all session by User specify
export const getSessionUser = (req:Request, res: Response) => {
    let param1 = [req.params.ComId,req.params.UserId]
    
    Request(param1,sessionRepository.filterByUser)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(400).json({
                err : err
            })
        })
    
}

// Get session number on time interval.
export const getSessionNumber = (req: Request, res: Response) =>{
    const param1 = [req.params.UserId,req.params.ComId]
    
    const minDate = req.params.yMin + "/" + req.params.mMin + "/" + req.params.dMin
    const maxDate = req.params.yMax + "/" + req.params.mMax + "/" + req.params.dMax
    
    const param2 = [req.params.timeInterval, minDate, maxDate]
    
    Request(param1, sessionRepository.numberSessionOn, param2)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(400).json({
                err : err
            })
        })
}

const Request = (param1:Array<any>, funct:Function, param2?:Array<any>): Promise<any> => {
    var newparam1: Array<number> = []
    if(param2 != undefined) {
        switch (param1.length){
            case 1://filterByUser
                newparam1 = parseIntArray(param1)
                return new Promise((result,reject) =>{
                    if (!isNaN(newparam1[0])){
                        param2[0] = parseInt(param2[0])
                        result(
                            numberSessionOn(newparam1, param2)
                        )
                    }else{
                        reject(
                            "Incorrect Value 0"
                        )
                    }
                })
            case 2://filterByUser
                newparam1 = parseIntArray(param1)
                console.log(newparam1)
                return new Promise((result,reject) =>{
                    if (!isNaN(newparam1[0])){
                        param2[0] = parseInt(param2[0])
                        result(
                            numberSessionOn(newparam1, param2)
                        )
                    }else{
                        reject(
                            "Incorrect Value 1"
                        )
                    }
                })
            default:
                return new Promise((result,reject) =>{
                    reject(
                        "Fatal Error"
                    )
                })
        }

    }
    else {
        
        switch (param1.length) {
            case 1://FilterByCompany
                newparam1 = parseIntArray(param1)
                return new Promise((result,reject) =>{
                    if (!isNaN(newparam1[0])){
                        result(
                            filterByCompany(newparam1)
                        )
                    }else{
                        reject(
                            "Incorrect Value"
                        )
                    }
                })
            case 2://filterByUser
                newparam1 = parseIntArray(param1)
                return new Promise((result,reject) =>{
                    if (!isNaN(newparam1[0])){
                        result(
                            filterByUser(newparam1)
                        )
                    }else{
                        reject(
                            "Incorrect Value"
                        )
                    }
                })
            
            default:
                return new Promise((result,reject) =>{
                    reject(
                        "Fatal Error"
                    )
                })
                

        }
    }    
}


const parseIntArray = (value: Array<any>) => {
    var values:Array<number> = []
    values.fill(0)
    for(let i = 0; i < value.length; i++){
        values[i] = parseInt(value[i], 10)
        if (isNaN(values[i])){
            return [NaN]
        }
    }
    return values
}

