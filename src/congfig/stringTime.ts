// import { verification_NIF } from '../models/order/verification_N';
// import { doctorIf } from '../models/doctor/doctor'
import moment from 'moment';

function changeDate( date:Date,formatString?:string ){

  if( !formatString ){
    formatString = 'YYYY-MM-DD HH:mm:ss';
  }

  if( typeof date == 'undefined' ){
    return undefined
  }

  if( date instanceof Date ){

    return moment( date ).format( formatString );

  }else{
    throw new Error('must Date 嘿嘿嘿嘿');
  }

}

export let stringTime = ( data:any[],str:string|string[] ) => {
    data.forEach(( e,i )=>{
      if( str instanceof Array ){
        for(let j=0;j<str.length;j++ ){
          // console.log( e[str[j]] );
          e[str[j]] = changeDate( e[str[j]] );

        }
      }
      else if( typeof str == 'string' ){
        // str变量，不要用.  ....
        e[str] = changeDate( e[str] );
      }
      else {
        throw new Error('some error');
      }
    })

}
