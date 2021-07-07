const recipe_catalogs = {
  "code": 0,
  "message": "success",
  "data": [
    {
      "name": "热门",
      "data": [
        {
          "name": "家常菜",
          "image_url": "http://cp1.douguo.net/upload/article/d/3/d/d3dde5f60ee0ab38430ef180fa7203dd.jpg",
          "data": ["红烧肉", "可乐鸡翅", "糖醋排骨", "鱼香肉丝", "红烧排骨", "宫保鸡丁", "麻婆豆腐", "酸菜鱼", "西红柿炒鸡蛋"]
        },
        {
          "name": "下饭菜",
          "image_url": "http://cp1.douguo.net/upload/article/1/0/1/10ce5619f9b05d54a3382b9778ce37f1.jpg",
          "data": ["清蒸鲈鱼", "油焖大虾", "水煮肉片", "麻辣香锅", "黄焖鸡", "黄焖鸡", "回锅肉"]
        },
        {
          "name": "快手菜",
          "image_url": "http://cp1.douguo.net/upload/article/8/3/b/8332015773daf6c77017cfedfb90358b.jpg",
          "data": ["豆腐", "京酱肉丝", "烤鸡翅", "酸辣土豆丝", "地三鲜", "红烧鱼", "红烧茄子"]
        },
        {
          "name": "减肥食谱",
          "image_url": "http://cp1.douguo.net/upload/article/d/b/5/dbb58343562b7b9100ae3c0dd7c944a5.jpg",
          "data": ["沙拉", "薏米", "红豆", "芹菜", "冬瓜", "黄瓜", "番茄", "生菜", "西兰花", "卷心菜", "苦瓜"]
        }
      ]
    },
    {
      "name": "蔬菜",
      "data": [
        {
          "name": "绿叶蔬菜",
          "image_url": "http://cp1.douguo.net/upload/article/0/1/2/016d1d597fba9a91b5698a5349508392.jpg",
          "data": ["西兰花", "菠菜", "大白菜", "芹菜", "娃娃菜", "莴笋", "生菜", "菜花", "油麦菜", "茼蒿", "小白菜", "卷心菜", "蒜苗", "芦笋", "芥菜", "韭黄", "苦菊", "茴香", "鸡毛菜", "空心菜", "菜苔", "冰草"]
        },
        {
          "name": "根茎蔬菜",
          "image_url": "http://cp1.douguo.net/upload/article/4/d/b/4d50410d419b52b575118b6ff88cdf8b.jpg",
          "data": ["山药", "芋头", "白萝卜", "红薯", "胡萝卜", "莲藕", "茭白", "芥菜头", "甜菜根"]
        },
        {
          "name": "时令蔬菜",
          "image_url": "http://cp1.douguo.net/upload/article/e/f/b/efafe77b701f8279cc06b3f993d30ccb.jpg",
          "data": ["土豆", "茄子", "菠菜", "西红柿", "韭菜", "油菜", "紫菜", "春笋", "香椿"]
        },
        {
          "name": "菌类",
          "image_url": "http://cp1.douguo.net/upload/article/f/5/8/f5a1f3a27bc03564b66414ec77084758.jpg",
          "data": ["金针菇", "杏鲍菇", "香菇", "平菇", "木耳", "白玉菇", "银耳", "松茸", "茶树菇", "猴头菇", "虫草花", "白口蘑", "牛肝菌", "滑子菇", "黄蘑", "元蘑", "白灵菇"]
        },
        {
          "name": "瓜类",
          "image_url": "http://cp1.douguo.net/upload/article/d/3/a/d36a14c2c47848ab8e58585e160727ba.jpg",
          "data": ["南瓜", "冬瓜", "黄瓜", "西葫芦", "佛手瓜", "苦瓜", "丝瓜"]
        },
        {
          "name": "豆科",
          "image_url": "http://cp1.douguo.net/upload/article/f/7/b/f7e8a663be21a244b7870511aad168bb.jpg",
          "data": ["豆角", "豆芽", "四季豆", "豌豆", "毛豆", "豇豆", "黄豆芽", "扁豆", "绿豆芽", "芸豆", "蚕豆", "刀豆"]
        }
      ]
    },
    {
      "name": "肉类大全",
      "data": [
        {
          "name": "猪肉",
          "image_url": "http://cp1.douguo.net/upload/article/5/4/0/54890da336a3ec213ca7910defd16a30.jpg",
          "data": ["排骨", "五花肉", "瘦肉", "猪蹄", "猪肝", "腊肉", "猪肚", "香肠", "里脊", "肥肠", "午餐肉", "猪血", "肉松", "火腿", "猪皮", "猪心", "猪腰", "叉烧肉", "猪骨", "猪耳朵", "肉馅", "猪肘", "猪肺", "咸肉", "肥肉", "熏肉", "猪尾"]
        },
        {
          "name": "鸡肉",
          "image_url": "http://cp1.douguo.net/upload/article/d/1/9/d1b1979be30031ab1ef7ae955e440d49.jpg",
          "data": ["鸡胸肉", "鸡腿", "鸡翅", "鸡爪", "鸡胗", "三黄鸡", "土鸡", "乌鸡", "母鸡", "公鸡", "鸡肝", "柴鸡"]
        },
        {
          "name": "牛肉",
          "image_url": "http://cp1.douguo.net/upload/article/7/9/d/790ace97f710d1976052bcc9c87d47cd.jpg",
          "data": ["牛腩", "牛排", "肥牛", "牛里脊", "牛肚", "牛尾", "牛腱", "牛蹄筋", "牛仔骨", "牛肋骨", "百叶", "肋条"]
        },
        {
          "name": "羊肉",
          "image_url": "http://cp1.douguo.net/upload/article/c/8/2/c82e1a71f745c5439eb01a8449491f82.jpg",
          "data": ["羊肉", "羊排", "羊蝎子", "羊肚", "羊肝", "羊后腿", "羊骨", "羊里脊", "羊腰"]
        },
        {
          "name":"其他",
          "image_url":"http://cp1.douguo.net/upload/article/6/8/b/6852ed1268f98704c5b28a60c4ef7ebb.jpg",
          "data":["鸭肉", "牛蛙", "鸽子", "兔肉", "鹅肉", "驴肉", "田鸡", "鹌鹑", "马肉"]
        }
      ]
    },
    {
      "name": "菜式菜系",
      "data": [
        {
          "name": "菜式",
          "image_url": "http://cp1.douguo.net/upload/article/9/2/e/9242d8707e962fb4fb76057acfb76c9e.jpg",
          "data": ["下饭菜", "快手菜", "凉菜", "素食", "私房菜", "宴客菜", "下酒菜", "下午茶", "野炊"]
        },
        {
          "name": "中国菜",
          "image_url": "http://cp1.douguo.net/upload/article/5/f/5/5f20e3a7dc86235794ec3e6d49fecb35.jpg",
          "data": ["川菜", "粤菜", "湘菜", "东北菜", "鲁菜", "浙菜", "淮扬菜", "苏菜", "潮州菜", "西北菜", "徽菜", "闽菜", "新疆菜", "云南菜", "晋菜"]
        },
        {
          "name": "外国菜",
          "image_url": "http://cp1.douguo.net/upload/article/9/0/7/9094a3a52fae63e59c431132de85e797.jpg",
          "data": ["日本料理", "韩国料理", "泰国菜", "法国料理", "意大利菜", "东南亚菜", "德国菜", "西班牙菜", "印度菜", "墨西哥菜", "瑞士菜"]
        }
      ]
    },
    {
      "name": "主食",
      "data": [
        {
          "name": "面食",
          "image_url": "http://cp1.douguo.net/upload/article/5/e/d/5e05db50cbd41c518c16ea418d2fcf7d.jpg",
          "data": ["面条", "包子", "饺子", "馒头", "拌面", "焖面", "花卷", "馄饨", "锅贴", "煎饺", "蒸饺", "凉面", "虾饺", "水晶饺", "中华饺子全席"]
        },
        {
          "name": "饼",
          "image_url": "http://cp1.douguo.net/upload/article/3/5/9/357f43abbd4f6f6abff7da5c91e22369.jpg",
          "data": ["手抓饼", "煎饼", "馅饼", "葱油饼", "玉米饼", "炒饼", "发面饼", "肉夹馍", "春饼", "春卷", "锅盔", "火烧", "盒子", "灌饼", "馕"]
        },
        {
          "name": "西式主食",
          "image_url": "http://cp1.douguo.net/upload/article/0/0/9/00811f8cafe961e7930a5d6aa6581bc9.jpg",
          "data": ["披萨", "牛排", "三明治", "意大利面", "土豆泥", "汉堡"]
        },
        {
          "name": "粥",
          "image_url": "http://cp1.douguo.net/upload/article/7/b/d/7bc2d2dd57460bbe053db1b7a75f413d.jpg",
          "data": ["皮蛋瘦肉粥", "小米粥", "海鲜粥", "南瓜粥", "山药粥", "八宝粥", "玉米粥", "红豆粥", "青菜粥", "燕麦粥", "水果粥", "绿豆粥"]
        },
        {
          "name": "米饭",
          "image_url": "http://cp1.douguo.net/upload/article/f/4/1/f4346b94f59d2f8ffe87911f3616cdc1.jpg",
          "data": ["炒饭", "煲仔饭", "焖饭", "盖浇饭", "焗饭", "蛋包饭", "拌饭", "烩饭", "抓饭"]
        }
      ]
    },
    {
      "name": "烘焙",
      "data": [
        {
          "name": "蛋糕",
          "image_url": "http://cp1.douguo.net/upload/article/4/c/9/4cbaf05f1df4ab94bf873531cd48da99.jpg",
          "data": ["戚风蛋糕", "纸杯蛋糕", "蛋糕卷", "奶油蛋糕", "芝士蛋糕", "千层蛋糕", "慕斯", "舒芙蕾", "玛芬", "黑森林", "抹茶蛋糕", "裸蛋糕", "磅蛋糕", "乳酪蛋糕", "草莓蛋糕", "红丝绒蛋糕", "蒙布朗", "蜂窝蛋糕", "玛德琳", "裱花蛋糕", "翻糖蛋糕", "大理石蛋糕", "彩虹蛋糕"]
        },
        {
          "name": "面包",
          "image_url": "http://cp1.douguo.net/upload/article/e/d/8/ed2f5fdb5d350680d3b1452f4af9aba8.jpg",
          "data": ["吐司", "全麦面包", "手撕面包", "餐包", "牛角包", "司康", "肉松面包", "菠萝包", "黄油面包", "法棍", "欧式面包", "法式面包", "贝果面包", "培根面包", "丹麦面包"]
        },
        {
          "name": "饼干",
          "image_url": "http://cp1.douguo.net/upload/article/f/9/6/f95fcf12d059c76afdeca00eb314ae76.jpg",
          "data": ["曲奇饼干", "蔓越莓饼干", "玛格丽特", "鸡蛋饼干", "巧克力饼干", "燕麦饼干", "苏打饼干", "手指饼干", "糖霜饼干", "夹心饼干", "抹茶饼干", "棋格饼干"]
        }
      ]
    },
    {
      "name": "水产海鲜",
      "data": [
        {
          "name": "虾",
          "image_url": "http://cp1.douguo.net/upload/article/5/3/1/533a7abd9d5c2ee103fa4a117ddf1d51.jpg",
          "data": ["虾仁", "基围虾", "皮皮虾", "河虾", "海虾", "明虾", "青虾", "北极虾", "草虾"]
        },
        {
          "name": "淡水鱼",
          "image_url": "http://cp1.douguo.net/upload/article/0/a/f/0a2e5b9c255d87b6626e86dc82ac54ff.jpg",
          "data": ["草鱼", "鲈鱼", "鲫鱼", "鲤鱼", "黑鱼", "罗非鱼", "泥鳅", "银鱼", "胖头鱼", "黄鳝", "鲶鱼", "鲢鱼", "梭边鱼", "梭边鱼", "青鱼", "鳜鱼", "清江鱼", "黄腊丁", "鲮鱼", "白鱼"]
        },
        {
          "name": "海水鱼",
          "image_url": "http://cp1.douguo.net/upload/article/4/1/3/419539dec2656050a80c7ccd2dd58f63.jpg",
          "data": ["带鱼", "龙利鱼", "黄花鱼", "鳕鱼", "鲅鱼", "三文鱼", "金枪鱼", "秋刀鱼", "比目鱼", "海鲈鱼", "沙丁鱼", "梭鱼", "海鳗", "金线鱼", "鲆鱼", "虹鳟"]
        },
        {
          "name": "其他",
          "image_url": "http://cp1.douguo.net/upload/article/3/b/b/3b320ca4b182e18eea808de50b6f845b.jpg",
          "data": ["鱿鱼", "海参", "鲍鱼", "海带", "海螺", "章鱼", "田螺", "香螺", "海兔"]
        },
        {
          "name": "贝类",
          "image_url": "http://cp1.douguo.net/upload/article/e/d/f/edc92e787b6fc691a12078639fd522cf.jpg",
          "data": ["生蚝", "花蛤", "扇贝", "蛤蜊", "蛏子", "青口贝", "海瓜子"]
        },
        {
          "name": "螃蟹",
          "image_url": "http://cp1.douguo.net/upload/article/f/4/b/f45cac0f1a37f7c0354ec90df478d0cb.jpg",
          "data": ["大闸蟹", "梭子蟹", "青蟹", "花蟹", "面包蟹", "帝王蟹", "蟹肉", "蟹黄"]
        }
      ]
    },
    {
      "name": "食疗养生",
      "data": [
        {
          "name": "食疗养生食谱",
          "image_url": "",
          "data": ["润肺止咳", "提高免疫", "美容瘦身", "健脾养胃", "驱寒暖身", "补肾", "滋阴壮阳", "清热去火", "降血糖", "保肝补血", "补钙食谱", "调节内分泌", "祛湿", "感冒发烧", "润肠通便", "养发", "降血脂", "便秘", "抗癌", "消食", "缓解痛经", "明目", "口腔溃疡", "痛风", "骨质疏松", "腹泻", "消暑解渴", "对抗雾霾"]
        }
      ]
    },
    {
      "name": "豆蛋制品",
      "data": [
        {
          "name": "豆制品",
          "image_url": "http://cp1.douguo.net/upload/article/e/5/3/e5d403455382855f4eb70f831bfed683.jpg",
          "data": ["豆腐", "腐竹", "千张", "香干", "素鸡", "千叶豆腐", "红豆沙", "豆腐脑", "油豆皮", "臭豆腐", "绿豆沙", "麻豆腐"]
        },
        {
          "name": "蛋类",
          "image_url": "http://cp1.douguo.net/upload/article/d/6/5/d6ffe7968d7065faa0bcd15f4ddd6035.jpg",
          "data": ["鸡蛋", "鹌鹑蛋", "皮蛋", "鹅蛋", "鸭蛋", "咸蛋"]
        }
      ]
    },
    {
      "name": "母婴",
      "data": [
        {
          "name": "母婴食谱",
          "image_url": "",
          "data": ["产妇食谱", "宝宝辅食", "月子餐", "2岁以上", "孕妇食谱", "婴儿", "催乳"]
        }
      ]
    },
    {
      "name": "米面杂粮",
      "data": [
        {
          "name": "米类",
          "image_url": "http://cp1.douguo.net/upload/article/4/5/6/458de33291496a6438fec0d29e9a9e76.jpg",
          "data": ["糯米", "玉米", "小米", "大米", "薏米", "黑米", "燕麦片", "糙米", "紫米", "香米", "粳米", "大麦"]
        },
        {
          "name": "面类",
          "image_url": "http://cp1.douguo.net/upload/article/0/3/2/0311908d5f3ef4e9e1a604aa60980d52.jpg",
          "data": ["糯米粉", "中筋面粉", "低筋面粉", "玉米面", "高筋面粉", "全麦粉", "小米面"]
        }
      ]
    }
  ]
}

module.exports = {
  recipe_catalogs: recipe_catalogs
}