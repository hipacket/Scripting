var obj = JSON.parse($response.body);
var date = new Date();
date.setFullYear(date.getFullYear() + 1);
if(obj.info) {
  obj.info.days_vip = 365;
  obj.info.packages = [{
    "id": 1219999,//1219945
    "package_id": null,
    "code": "",//diqssz
    "start_time": "2021-08-17T03:40:29.000Z",
    "end_time": date.toISOString(),
    "level": "24,25,30",
    "account_id": obj.info.id,
    "description": null,
    "device_type": 0,
    "transaction_id": null,
    "created_at": "2021-08-17T03:40:29.000Z",
    "updated_at": "2021-08-17T03:40:29.000Z"
  }];
}
$done({body: JSON.stringify(obj)});
