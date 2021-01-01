import Session from "../Model/sessionModel";
import {Aggregate} from "mongoose";

export const filterByCompany = async (ComId: number) => {

    let arr 
    await Session.find({
        CompanyId: ComId
    }).limit(100).then(list =>{
        arr = list
    })
    
    return arr
}

export const filterByUser = async (ComId: number, UserId: number) =>{
    let arr 
    await Session.find({
        CompanyId: ComId,
        UserId: UserId
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

export const numberSessionOn = async (timeInterval: number) => {
    await Session.aggregate([
        
    ]).limit(20)
        .then(result =>{
            console.log(result)
    }).catch(err => {
        console.log(err)
    })
    
    return true
}