<?php

/**
 *  call this function with
 */
 
 
Emit('onAttemptAlpineAuth', array('args'=>func_get_args()));
 
$config=GetWidget('alpine-auth-config');

$serverUrl=$config->getParameter('testAuthorizationSecretUrl');
$serverUser=$config->getParameter('testAuthorizationUsername');
$serverPass=$config->getParameter('testAuthorizationPassword');

die('ok');

if($config->getParameter('enableLive')){
    
    $serverUrl=$config->getParameter('liveAuthorizationSecretUrl');
    $serverUser=$config->getParameter('liveAuthorizationUsername');
    $serverPass=$config->getParameter('liveAuthorizationPassword');
    
}else{
    
    if(!isset($email)){
        //expect $email from argument
        $testAddresses=$config->getParameter('testAccountList');
        $email=$testAddresses[rand(0, count($testAddresses)-1)];
    }
    
}

if(!isset($email)){
    Emit('onAttemptAlpineAuthError', array('message'=>'expected email address', 'args'=>func_get_args()));
}







$client = new \GuzzleHttp\Client();

$response = $client->request('POST', $serverUrl.'/token', array(
    'form_params' => array(
        'grant_type'=>'password',
        'username'=>$serverUser, 
        'password'=>$serverPass
    )
));

if(($status=$response->getStatusCode())!==200){

   Emit('onAttemptAlpineAuthError', array('message'=>'Token Response: '.$status, 'args'=>func_get_args()));
   return; 
}

print_r($response->getBody()."");

echo "Args: ".json_encode(func_get_args());

?>