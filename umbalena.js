var obj = JSON.parse($response.body);
if(obj.personal) {
  obj.personal.personalpackage_set = [{
    "expiry_date": "01/10/2099"
  }];
  obj.personal.expiry_date = "10/01/2099 09:27";
} else {
  obj.personalpackage_set = [{
    "expiry_date": "01/10/2099"
  }];
  obj.expiry_date = "10/01/2099 09:27";
}
$done({body: JSON.stringify(obj)});

//https://api5.umbalena.vn/profile/user/
