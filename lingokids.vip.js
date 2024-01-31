var obj = JSON.parse($response.body || '{}');

// obj["info"]["subscriptions"]= [{
// 	"status": "active",
// 	"product": "unlimited",
// 	"duration_unit": "months",
// 	"id": 805063,
// 	"platform": "apple",
// 	"duration_value": 1,
// 	"starts_at": 1572617692,
// 	"ends_at": 4099821292,
// 	"auto_renew_status": true,
// 	"plan_id": "lk.ios.s1m.t1m.p15.v1",
// 	"state": "active"
// }];3369406

// if(obj.info) {
//   obj.info.customer = true;
//   obj.info.subscriptions = [{
//     "id": 805063,
//     "status": "active",
//     "in_grace_period": false,
//     "product": "unlimited",
//     "platform": "apple",
//     "starts_at": 1646452089,
//     "ends_at": 4099821292,
//     "plan_id": "s1m.t7d.p8.v1",
//     "duration_unit": "months",
//     "duration_value": 1,
//     "auto_renew_status": true
//   }];
// } else 
if(obj.feeds) {
  for(var feed of obj.feeds) {
    for(var entrie of feed.entries) {
      if(entrie.overlay) {
        if(entrie.overlay.blocking) 
          delete entrie.overlay;
        else 
          entrie.overlay.blocking = false;
      }
    }
  }
}
if(obj.info) {
  obj.info.customer = true;
  if(obj.info.subscriptions) {
    obj.info.subscriptions = [{
      "id": 3369406,
      "status": "active",
      "in_grace_period": false,
      "product": "unlimited",
      "platform": "apple",
      "starts_at": 1646452089,
      "ends_at": 4099821292,
      "plan_id": "s1m.t7d.p8.v1",
      "duration_unit": "months",
      "duration_value": 1,
      "auto_renew_status": true
    }];
  }
  if(obj.info.children) {
    for(var c of obj.info.children) {
      c.curriculum_unlocked = true;
    }
  }
}

$done({body: JSON.stringify(obj)});
