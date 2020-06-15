 /**
  * 业务组件，单独业务的路由都在这里
  */

 const home = resolve => require(['@/view/businessView/home'], resolve)
 const deal = resolve => require(['@/view/businessView/deal'], resolve)
 const mining = resolve => require(['@/view/businessView/mining'], resolve)
 const assets = resolve => require(['@/view/businessView/assets'], resolve)
//  const bankUser = resolve => require(['@/view/businessView/bankUser'], resolve)
 const bankUser = resolve => require(['@/view/businessView/bankUserCopy'], resolve)
 const bankShare = resolve => require(['@/view/businessView/bankShare'], resolve)
 const miningDetail = resolve => require(['@/view/businessView/miningDetail'], resolve)
 const miningPro = resolve => require(['@/view/businessView/miningPro'], resolve)
 const bank = resolve => require(['@/view/businessView/bank'], resolve)
 const bankBuy = resolve => require(['@/view/businessView/bankBuy'], resolve)
 const miningBuy = resolve => require(['@/view/businessView/miningBuy'], resolve)
 const bankShareList = resolve => require(['@/view/businessView/bankShareList'], resolve)
 const bankOrder = resolve => require(['@/view/businessView/bankOrder'], resolve)
 const transfer = resolve => require(['@/view/businessView/transfer'], resolve)
 const shareExtract = resolve => require(['@/view/businessView/shareExtract'], resolve)


 let business = {
     home,
     deal,
     mining,
     assets,
     bankUser,
     bankShare,
     miningDetail,
     miningPro,
     bank,
     bankBuy,
     miningBuy,
     bankShareList,
     bankOrder,
     transfer,
     shareExtract
 }
 export default business //res;