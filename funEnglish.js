var obj = JSON.parse($response.body);
var plan = obj.find(p => p.has_expiration);
if(plan) {
  plan.has_expiration = false;
  plan.expires_gmt = 4071200107;
  plan.expires_gmt_formatted = '2099-01-04 15:55:07';
}

$done({body: JSON.stringify(obj)});
