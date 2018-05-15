import model from '../models/user';
import { getNextUserSequenceValue,userKeyIF } from '../models/counter';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";
import { body,validationResult,check  } from 'express-validator/check';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';


export let loginVerification = [
  body('account','最少四位字符').isLength({ min: 4 }),
  body('password','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/)
]

export let login = ( req:Request,res:Response,next:NextFunction ) => {

  //有了 passport ，在登录中验证可以放弃 express-validator 了
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      status:422,
      data:'您输入的信息有误',
      message:errors.mapped()
    })
    res.end();
    // return res.status(422).json({ errors: errors.mapped() });
  }

  passport.authenticate("local", (err: Error, user: UserModelIF, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      res.send({ status:500,message:info.message })
      res.end();
      return;
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      process.env["ACCOUNT"] = req.body.account;
      let promise = model.findOne({ account:req.body.account },{ key:1 }).exec();
      promise.then(( data:UserModelIF )=>{
        res.cookie( 'key',data.key,{ signed: true,maxAge:5000000 } )
        res.send({ status:200,message:info.message })
        res.end();
      })
    });
  })(req, res, next);

}

export let loginGet = (req:Request,res:Response,next:NextFunction) => {

  res.type('html');
  res.render('login');

}

export let save = ( req:Request,res:Response,next:NextFunction ) => {

  // 5ad9a85917dbc324205b6481 LastKey_users
  getNextUserSequenceValue( "key_user",next )
  .then(( data:userKeyIF )=>{

    let newData = new model({
        account:'xiaoming',
        password:'123456',
        key:data.last_key,  //递增字段

        checkStatusValue: "已审核",   //审核状态
        checkStatus: 1,              //审核状态码
        hospitalLogo: "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yylogo_0.jpg",  //用户头像
        accountTypeValue: "医美机构", //用户类型
        hospitalName: "上海华美医疗美容医院",//用户名称
        accountType: 1,              //用户类型状态码

        "provinceId": 21,
        "cityId": 51,
        "hospInfo": "上海华美医疗美容医院坐落于上海浦东小陆家嘴商圈，紧邻闹中取静的浦东大道，交通便利，停车方便。院内环境优雅，装修温馨雅致，是一家力求将美融入到精致生活中的特色美容医院。医院设有整形外科、皮肤美容、注射美容、毛发种植、口腔美容等核心科室，同时，也在不断创新医疗美容体系和高品质个性化服务。...",
        "cityName": "上海市",
        "provinceName": "上海",
        "areaId": 52,
        "hospType": "医疗美容/医疗美容医院",
        "hospLogo": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yylogo_0.jpg",
        "ziZhi": [
          {
            "key": 345,
            "hospitalId": 10045,
            "zizhiType": 1,
            "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yyzz_0.jpg",
            "usefulTime": "2018-01-10 17:07:00",
            "zizhiState": 1,
            "isValid": 1
          },
          {
            "key": 346,
            "hospitalId": 10045,
            "zizhiType": 2,
            "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_zyxkz_0.jpg",
            "usefulTime": "2019-01-31 17:07:00",
            "zizhiState": 2,
            "isValid": 1
          },
          {
            "key": 347,
            "hospitalId": 10045,
            "zizhiType": 3,
            "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_ggsczm_0.jpg",
            "usefulTime": "2019-01-31 17:07:08",
            "zizhiState": 2,
            "isValid": 1
          },
          {
            "key": 348,
            "hospitalId": 10045,
            "zizhiType": 3,
            "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_ggsczm_1.jpg",
            "usefulTime": "2019-01-31 17:07:08",
            "zizhiState": 2,
            "isValid": 1
          }
        ],
        "contactTelephone": "",
        "lat": "31.245465",
        "contactQQ": "",
        "lon": "121.53707",
        "hospName": "上海华美医疗美容医院",
        "contactEmail": "",
        "openTimeStart": "08:00:00",
        "bankName": "建设银行",
        "typeName": "眼部,鼻部,面部轮廓",
        "bankInfo": "建行上海卢湾支行",
        "openTimeOver": "21:00:00",
        "areaName": "浦东新区",
        "accountHolder": "上海华美医疗美容医院有限公司",
        "hospStyle": 2,
        "goodatProject": "1,2,3",
        "authFileUrl": null,
        "hospAddress": "上海华美医疗美容医院有限公司",
        "contactName": "李凡",
        "bdName": "林谟阳",
        "contactMobile": "18701738716",
        "hospPhotos": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_2202.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_1572.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_8187.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_125.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_97.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_2757.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_9622.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_9622.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_9748.jpg",
        "bankAccount": "31001509600050011119"
    })
    return newData.save();

  })
  .then(()=>{
    res.end();
  })
  .catch(( err:Error )=>{ return next(err) });

}
