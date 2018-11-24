import Mock from 'mockjs'

// 地图选中点信息
var makers = {
  sk: [{
      position: [114.3, 30.6],
      // content: "九龙水库",
      add: "九龙水库",
      sssw: "43.872m",
      zcsw: "43.8m",
      zkr: "368.3万m³",
      yl: "1mm",
      date: "2018-02-12",
      image: "http://webapi.amap.com/theme/v1.3/markers/b/mark_b.png",
    },
    {
      position: [114.3, 30.7],
      add: "胜利水库",
      sssw: "44.872m",
      zcsw: "44.8m",
      zkr: "368.3万m³",
      yl: "1mm",
      date: "2018-02-12",
      image: "http://webapi.amap.com/theme/v1.3/markers/b/mark_b.png",
    },
    {
      position: [114.4, 30.7],
      add: "长山水库",
      sssw: "46.872m",
      zcsw: "46.8m",
      zkr: "368.3万m³",
      yl: "1mm",
      date: "2018-02-12",
      image: "http://webapi.amap.com/theme/v1.3/markers/b/mark_b.png",
    },
    {
      position: [114.5, 30.5],
      add: "凉马坊",
      sssw: "39.872m",
      zcsw: "39.8m",
      zkr: "368.3万m³",
      yl: "1mm",
      date: "2018-02-12"
    },
    {
      position: [114.49, 30.71],
      add: "红星水库",
      sssw: "30.872m",
      zcsw: "30.8m",
      zkr: "368.3万m³",
      yl: "1mm",
      date: "2018-02-12"
    },
    {
      position: [114.45, 30.69],
      add: "狮子峰",
      sssw: "63.872m",
      zcsw: "63.8m",
      zkr: "368.3万m³",
      yl: "1mm",
      date: "2018-02-12"
    }
  ],
  cj: [{
    position: [114.46, 30.72],
    add: "东湖高新段",
    sssw: "63.872m",
    sfsw: "63.8m",
    jjsw: "60.872m",
    bzsw: "65.872m",
    date: "2018-02-12",
    image: "http://webapi.amap.com/theme/v1.3/markers/b/mark_r.png",
  }],
  yzsd: [{
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }, {
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }, {
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }, {
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }, {
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }, {
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }, {
    position: [114.45, 30.69],
    add: "光谷一路与黄龙山北路交汇处",
    sw: "63.872m",
    date: "2018-02-12"
  }],
  hz: [{
    position: [114.45, 30.69],
    add: "武惠闸",
    nsw: "63.872m",
    wsw: "63.8m",
    date: "2018-02-12"
  }],
  zwzx: [{
    position: [114.45, 30.69],
    add: "政务中心",
    ssyl: "10mm",
    bxsyl: "6mm",
    ryl: "30mm",
    date: "2018-02-12"
  }]
};

Mock.mock('/map/message', function (options) {
  let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
  switch (rtype) {
    case 'get':
      break;
    case 'post':

      break;
    case 'delete':

      break;
    case 'put':

      break;
    default:
      break;
  }
  return makers;
})

let meather = {
  address: '武汉',
  todayTemperature: '9~12℃',
  tomorowTemperature: '10~21℃'
}
// 头部天气信息
Mock.mock('/meather/message', 'get', function (options) {
  return meather;
})




















let List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

Mock.mock('/user/postinfo', function (options) {
  //   console.log(options);
  let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
  switch (rtype) {
    case 'get':
      break;
    case 'post':
      //   arr.push(JSON.parse(options.body));
      var str = Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
      })
      List.push(str);
      break;
    case 'delete':
      let id = JSON.parse(options.body).id;
      for (let i = 0; i < List.length; i++) {
        if (List[i].id == id) {
          List.splice(i, 1);
        }
      }
      break;
    case 'put':
      let putid = parseInt(JSON.parse(options.body).data.id);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == putid) {
          arr[i].name = '汤姆';
        }
      }
      break;
    default:
      break;
  }
  return List;
})
