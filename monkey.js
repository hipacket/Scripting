var obj = JSON.parse($response.body);

// obj.data.purchased =  {
// 	"pay_inapp": false,
// 	"time_purchased": 0,
// 	"time_activated": 0,
// 	"time_expire": 0,
// 	"product_list": [],
// 	"is_active": true,
// 	"is_free": false,
// 	"free_days": 365,
// 	"is_purchased": true,
// 	"purchased_packages": {
// 	"iap": [],
// 	"cod": []
// 	}
// };
// obj.data.userInfo.time_expired = 4070908800;
// obj.data.userInfo.is_trial = 0;
if(obj.data.purchased && obj.data.purchased.is_purchased) {
	obj.data.purchased.is_purchased = true;
	obj.data.purchased.is_active = true;
	obj.data.purchased.is_free = false;
	obj.data.purchased.time_expire = 0;
	obj.data.purchased.free_days = 365;
	obj.data.purchased.is_free = false;
	obj.data.userInfo.time_expired = Math.round(new Date()/1000) + 86400 * 365;
	obj.data.userInfo.is_trial = 0;
} else {
	for(var key of Object.keys(obj.data.purchased)) {
		obj.data.purchased[key].is_purchased = true;
		obj.data.purchased[key].is_active = true;
		obj.data.purchased[key].time_expire = 0;
		obj.data.purchased[key].free_days = 365;
		obj.data.purchased[key].free_user = false;
		obj.data.time_expire = Math.round(new Date()/1000) + 86400 * 365;
	}
}
$done({body: JSON.stringify(obj)});
