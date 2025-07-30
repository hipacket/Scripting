var headers = $request.headers
if (headers['If-None-Match'] || headers['if-none-match']) {
  delete headers['If-None-Match'];
  delete headers['if-none-match'];
}
$done({headers});
