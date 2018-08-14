<?php

/**
 *  call this function like:    ->userFunction($email);
 */
 
 
Emit('onAttemptAlpineAuth', array('args'=>func_get_args()));
 
$config=GetWidget('alpine-auth-config');

$serverUrl=$config->getParameter('testAuthorizationSecretUrl');
$serverUser=$config->getParameter('testAuthorizationUsername');
$serverPass=$config->getParameter('testAuthorizationPassword');



if($config->getParameter('enableLive')){
    
    $serverUrl=$config->getParameter('liveAuthorizationSecretUrl');
    $serverUser=$config->getParameter('liveAuthorizationUsername');
    $serverPass=$config->getParameter('liveAuthorizationPassword');
    
}
//else{
    
    if(!isset($email)){
        //expect $email from argument
        $testAddresses=$config->getParameter('testAccountList');
        $email=$testAddresses[rand(0, count($testAddresses)-1)];
    }
    
//}



if(!isset($email)){
    Emit('onAttemptAlpineAuthError', array('message'=>'expected email address', 'args'=>func_get_args()));
    return;
}








$client = new \GuzzleHttp\Client(array(
 
));

$tokenUrl=$serverUrl.'/token';
$tokenResponse = $client->request('POST', $tokenUrl, array(
    'http_errors' => false,
    'form_params' => array(
        'grant_type'=>'password',
        'username'=>$serverUser, 
        'password'=>$serverPass
    )
));


if(($status=$tokenResponse->getStatusCode())!==200){

   Emit('onAttemptAlpineAuthError', $error=array(
       'url'=>$tokenUrl,
       'message'=>'Token Response: '.$status,
       'args'=>func_get_args(),
       'response'=>$tokenResponse->getBody().""
       ));
       
    print_r($error);
   return; 
}

$data=json_decode($tokenResponse->getBody());

if(!($data&&key_exists('access_token', $data)&&(!empty($data->access_token)))){
    Emit('onAttemptAlpineAuthError', array('message'=>'Expected to receive server token from: '.$serverUrl, 'args'=>func_get_args()));
    return;
}

//die(print_r($data));


/*

jQuery.ajax("'.$serverUrl.'/api/IQA?QueryName=$/ACC/Queries/MtnApp&Parameter='.urlencode($email).'", {
  type: "GET",
  contentType: "application/json",
  headers: {
    RequestVerificationToken: "'.$data->access_token.'"
  },
  success: function(data) {
    console.log(data);
  }
});


');
*/
$validationUrl= $serverUrl.'/api/IQA?QueryName=$/ACC/Queries/MtnApp/MtnApp&Parameter='.urlencode($email);




$validationResponse = $client->request('GET', $validationUrl,   
    
    array(
        'http_errors' => false,
        'headers'=> $headers=array(
            'requestVerificationToken'=>$data->access_token
        )
    )
);


echo $validationUrl."\n";
print_r($headers);
echo "\n";
echo $validationResponse->getBody()."\n";





?>