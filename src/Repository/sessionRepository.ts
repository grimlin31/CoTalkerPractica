import Session from "../Model/sessionModel";
import ts from "typescript/lib/tsserverlibrary";

export const filterByCompany = async (param1: Array<number>) => {

    let arr 
    await Session.find({
        CompanyId: param1[0]
    }).limit(100).then(list =>{
        arr = list
    })
    
    return arr
}

export const filterByUser = async (param1: Array<number>) =>{
    let arr 
    await Session.find({
        CompanyId: param1[0],
        UserId: param1[1]
    }).then(list => {
        arr = list
    })
    
    return arr
}

export const inserta = async ()=>{
    const userSession = new Session({
        CompanyId: 2,
        UserId:0,
        Metodo:"hi",
        APIId:"chao",
        Tiempo: 10,
        Source: "hola"
    })
    await userSession.save().then(
        save => console.log("bien")
    ).catch(
        err => console.log(err)
    )
    
}

export const numberSessionOn = async (param1: Array<number>, param2: Array<any>) => {
    let minIntervalTime = new Date(param2[1])
    let maxIntervalTime = new Date(param2[2])
    
    console.log(maxIntervalTime,minIntervalTime)
    
    let firstDate = await Session.findOne({
        CompanyId: param1[0],
        UserId: param1[1],
        Fecha: {
            $gte: minIntervalTime,
            $lte: maxIntervalTime
        }
    }).then(result =>{
        if(result != null) {
            return result.toObject()
        }
        else{
            return "User Not Found"
        }
    }).catch(err => {
        return err
    })
    
    
    let query = await Session.aggregate([
        {
            $match: {
                CompanyId: param1[0],
                UserId: param1[1],
                Fecha: {
                    $gte: minIntervalTime,
                    $lte: maxIntervalTime
                }
            }
        },
        {
            
            $project:{
                resta: {
                    $sum:[
                        {
                            $trunc: [
                                {
                                    $divide:[
                                        {
                                            $subtract: [
                                                "$Fecha", firstDate.Fecha
                                            ]
                                        }, param2[0]*60*1000
                                    ]
                                },0
                            ]
                        }, 1
                    ]
                }
            }
        },
        {
            $group:{
                _id: "$resta",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]).then(result => {
        return result
    }).catch(err => {
        return err
    })
  
    return query
    
}