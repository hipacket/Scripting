var headers = $request.headers
if(headers['If-None-Match']) {
  delete headers['If-None-Match'];
}
if(headers['if-none-match']) {
  delete headers['if-none-match'];
}
if(headers['if-none-match']) {
  delete headers['if-none-match'];
}
$done({headers});
