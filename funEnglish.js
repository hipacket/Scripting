var obj = JSON.parse($response.body);
var plan = obj.find(p => p.has_expiration);
if(plan) {
  plan.status = 'wcm-active';
  plan.has_expiration = false;
  plan.expires_gmt = 4071200107;
  plan.expires_gmt_formatted = '2099-01-04 15:55:07';
}


$done({body: JSON.stringify([{
	"user_id": "59b34681-50da-4d1b-9e74-4183b2dcf319",
	"plan": "fe",
	"status": "active",
	"has_expiration": false,
	"expires_ms": 4071200107000,
	"expires_formatted": "2099-01-04T08:55:07.000Z"
}])});
