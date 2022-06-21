if($request.headers['Authorization']) {
  delete $request.headers['Authorization'];
}
$done({headers: headers});
