import { listTypeIF,model_listType } from '../models/listType';
import { model_baseProList,baseProListIF } from '../models/baseProList';
import { default as model,UserModelIF } from '../models/user';
import { modle_doctor,doctorIf } from '../models/doctor/doctor';
import { Response,Request,NextFunction } from 'express';

export let find = ( req:Request,res:Response,next:NextFunction ) => {

  let promiseP = model.findOne({ key:req.signedCookies.key },{ promiseList:1 }).exec();
  let promiseD = modle_doctor.find({ hospitalId:req.signedCookies.key },{ doctorName:1,key:1,_id:0 }).lean().exec();

  let promiseALL = Promise.all( [ promiseP,promiseD ] );
  promiseALL.then(( dataArr:any[] )=>{
    dataArr[1].forEach(( e:any,i:number )=>{
      e.doctorId = e.key;
      delete e.key;
    })

    res.send({ status:200,message:'获取成功',data:{promiseList:dataArr[0].promiseList,doctorList:dataArr[1]} })
    res.end()
  })
  .catch(( err:Error )=>{ next( err ) })

}

export let listTypeFind = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model_listType.find().exec();
  promise.then(( data:listTypeIF[] )=>{
    res.send({ status:200,message:'获取成功',data })
  })
  .catch(( err:Error )=>{ next( err ) })

}

export let projectListFind = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model_baseProList.find( { STId:req.body.key },{key:1,proName:1} ).lean().exec();
  promise.then(( data:listTypeIF[] )=>{
    data.forEach(( e:any,i:number )=>{
      for( let key in e ){
        e.projectId = e.key;
        e.projectName = e.proName;
        delete e.key;
        delete e.proName;
      }
    })
    res.send({ status:200,message:'获取成功',data })
  })
  .catch(( err:Error )=>{ next( err ) })

}
