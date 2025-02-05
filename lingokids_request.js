if($request.headers['If-None-Match']) {
  delete $request.headers['If-None-Match'];
}
$done({headers: headers});
