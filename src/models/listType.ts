import mongoose from 'mongoose';

export interface listTypeIF extends mongoose.Document {
  typeName:string;
  parentId:number;
  typeSort:number;
  children:[{
    typeName: string;
    parentId: number;
    typeSort: number;
    isLeaf: number;
    typeLevel: number;
    readonly key: number
  }];
  typeLevel:string;
  readonly key:number
}

let listTypeS = new mongoose.Schema({
  typeName:String,
  parentId:Number,
  typeSort:Number,
  children:[{
    typeName: String,
    parentId: Number,
    typeSort: Number,
    isLeaf: Number,
    typeLevel: Number,
    key: Number
  }],
  typeLevel:String,
  key:Number
})

export let model_listType = mongoose.model( 'listType',listTypeS );





/*

{
  "data": [
    {
      "typeName": "眼部",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "开眼角",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 14
        },
        {
          "typeName": "双眼皮",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 15
        },
        {
          "typeName": "眼袋",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 16
        },
        {
          "typeName": "黑眼圈",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 17
        },
        {
          "typeName": "卧蚕",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 18
        },
        {
          "typeName": "上眼睑",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 19
        },
        {
          "typeName": "下眼睑",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 20
        },
        {
          "typeName": "眉弓",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 21
        },
        {
          "typeName": "眼部其它",
          "parentId": 1,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 22
        }
      ],
      "typeLevel": 1,
      "key": 1
    },
    {
      "typeName": "鼻部",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "隆鼻",
          "parentId": 2,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 23
        },
        {
          "typeName": "鼻头整形",
          "parentId": 2,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 24
        },
        {
          "typeName": "鼻翼",
          "parentId": 2,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 25
        },
        {
          "typeName": "鼻骨矫正",
          "parentId": 2,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 26
        },
        {
          "typeName": "鼻小柱",
          "parentId": 2,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 27
        },
        {
          "typeName": "鼻部其它",
          "parentId": 2,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 28
        }
      ],
      "typeLevel": 1,
      "key": 2
    },
    {
      "typeName": "面部轮廓",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "额头",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 29
        },
        {
          "typeName": "太阳穴",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 30
        },
        {
          "typeName": "颧骨颧弓",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 31
        },
        {
          "typeName": "上下颚",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 32
        },
        {
          "typeName": "下巴",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 33
        },
        {
          "typeName": "瘦脸",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 34
        },
        {
          "typeName": "V型脸",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 35
        },
        {
          "typeName": "酒窝",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 36
        },
        {
          "typeName": "面部提升",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 37
        },
        {
          "typeName": "法令纹",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 38
        },
        {
          "typeName": "苹果肌",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 39
        },
        {
          "typeName": "脸颊",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 40
        },
        {
          "typeName": "自体脂肪填充",
          "parentId": 3,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 41
        }
      ],
      "typeLevel": 1,
      "key": 3
    },
    {
      "typeName": "唇部",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "厚唇",
          "parentId": 4,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 42
        },
        {
          "typeName": "薄唇",
          "parentId": 4,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 43
        },
        {
          "typeName": "唇形矫正",
          "parentId": 4,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 44
        }
      ],
      "typeLevel": 1,
      "key": 4
    },
    {
      "typeName": "胸部",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "乳头",
          "parentId": 5,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 45
        },
        {
          "typeName": "去副乳",
          "parentId": 5,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 46
        },
        {
          "typeName": "乳晕",
          "parentId": 5,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 47
        },
        {
          "typeName": "乳房",
          "parentId": 5,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 48
        }
      ],
      "typeLevel": 1,
      "key": 5
    },
    {
      "typeName": "美体塑形",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "激光溶脂",
          "parentId": 6,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 49
        },
        {
          "typeName": "冷冻溶脂",
          "parentId": 6,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 50
        },
        {
          "typeName": "吸脂",
          "parentId": 6,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 51
        },
        {
          "typeName": "臀部",
          "parentId": 6,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 52
        },
        {
          "typeName": "小腿",
          "parentId": 6,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 53
        }
      ],
      "typeLevel": 1,
      "key": 6
    },
    {
      "typeName": "皮肤",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "美肤",
          "parentId": 7,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 54
        },
        {
          "typeName": "改善肤质",
          "parentId": 7,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 55
        },
        {
          "typeName": "提升",
          "parentId": 7,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 56
        },
        {
          "typeName": "皮肤其他",
          "parentId": 7,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 57
        }
      ],
      "typeLevel": 1,
      "key": 7
    },
    {
      "typeName": "耳部",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "招风耳",
          "parentId": 8,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 58
        }
      ],
      "typeLevel": 1,
      "key": 8
    },
    {
      "typeName": "私密整形",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "阴茎",
          "parentId": 9,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 60
        }
      ],
      "typeLevel": 1,
      "key": 9
    },
    {
      "typeName": "牙齿",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "牙齿美容",
          "parentId": 10,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 62
        },
        {
          "typeName": "牙齿治疗",
          "parentId": 10,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 63
        }
      ],
      "typeLevel": 1,
      "key": 10
    },
    {
      "typeName": "毛发",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "毛发种植",
          "parentId": 11,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 64
        },
        {
          "typeName": "激光脱毛",
          "parentId": 11,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 65
        }
      ],
      "typeLevel": 1,
      "key": 11
    },
    {
      "typeName": "微整注射",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "玻尿酸",
          "parentId": 12,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 66
        },
        {
          "typeName": "肉毒素",
          "parentId": 12,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 67
        }
      ],
      "typeLevel": 1,
      "key": 12
    },
    {
      "typeName": "韩式半永久妆",
      "parentId": 0,
      "typeSort": 1,
      "children": [
        {
          "typeName": "韩式半永久",
          "parentId": 13,
          "typeSort": 1,
          "isLeaf": 1,
          "typeLevel": 2,
          "key": 71
        }
      ],
      "typeLevel": 1,
      "key": 13
    }
  ],
  "message": "获取医美类型列表成功",
  "status": 200
}

*/
