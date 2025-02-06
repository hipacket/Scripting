var headers = $request.headers
if(headers['If-None-Match']) {
  delete headers['If-None-Match'];
}
$done({headers});
