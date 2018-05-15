import { Response } from 'express';
import fs from 'fs';

export let deleteImage_FN = ( data:string|string[],res:Response ) => {

  let arr : string[] = data instanceof Array ? data : data.split(',');

  try{
    arr.forEach(( e:string,i:number )=>{
      fs.unlinkSync( 'img' + e.split('img')[1] );
    })
    res.send({ status:200,message:'success' });
  }catch( err ){
    res.send({ status:500,message:'some error' });
  }

  res.end();

}
