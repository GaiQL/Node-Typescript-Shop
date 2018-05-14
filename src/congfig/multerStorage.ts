import multer from 'multer';

export let multer_storage = ( url:string,limits?:{} ) => {

  let storage = multer.diskStorage({
    destination: url ,
    filename: function (req, file, cb) {

      let postfix = '.' + file.mimetype.split('/')[1];
      cb( null, file.fieldname + '-' + Date.now() + postfix )

    }
  })

  return multer({
    storage,
    //   指定限制可以帮助保护您的站点免遭拒绝服务（DoS）攻击。
    limits:{
      fieldNameSize:100,
      fieldSize:512000,
      // 最大数量的非文件字段  没有非文件字段，是不是可以设置成0？....
      fields:100,
      // 对于多部分表单，最大文件大小
      fileSize:512000,
      // 对于多部分表单，文件字段的最大数量
      files:100,
      // 对于多部分表单，最大数量的部分（字段+文件）
      parts:512100
    }
  });

}
