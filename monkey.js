var obj = JSON.parse($response.body);

obj.data.purchased =  {
	"pay_inapp": false,
	"time_purchased": 0,
	"time_activated": 0,
	"time_expire": 0,
	"product_list": [],
	"is_active": true,
	"is_free": false,
	"free_days": 365,
	"is_purchased": true,
	"purchased_packages": {
	"iap": [],
	"cod": []
	}
};
obj.data.userInfo.time_expired = 4070908800;
obj.data.userInfo.is_trial = 0;
$done({body: JSON.stringify(obj)});
