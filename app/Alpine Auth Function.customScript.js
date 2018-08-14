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
    
}else{
    
    if(!isset($email)){
        //expect $email from argument
        $testAddresses=$config->getParameter('testAccountList');
        $email=$testAddresses[rand(0, count($testAddresses)-1)];
    }
    
}



if(!isset($email)){
    Emit('onAttemptAlpineAuthError', array('message'=>'expected email address', 'args'=>func_get_args()));
    return;
}







$cookies=new \GuzzleHttp\Cookie\FileCookieJar(__DIR__.'/cookies.txt');
	

$client = new \GuzzleHttp\Client(array(
    'cookies'=> $cookies    
));

$tokenResponse = $client->request('POST', $serverUrl.'/token', array(
    'http_errors' => false,
    'form_params' => array(
        'grant_type'=>'password',
        'username'=>$serverUser, 
        'password'=>$serverPass
    )
));


if(($status=$tokenResponse->getStatusCode())!==200){

   Emit('onAttemptAlpineAuthError', array('message'=>'Token Response: '.$status, 'args'=>func_get_args()));
   return; 
}

$data=json_decode($tokenResponse->getBody());

if(!($data&&key_exists('access_token', $data)&&(!empty($data->access_token)))){
    Emit('onAttemptAlpineAuthError', array('message'=>'Expected to receive server token from: '.$serverUrl, 'args'=>func_get_args()));
    return;
}

die(print_r($data));


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
$validationResponse = $client->request('GET', 
    $serverUrl.'/api/IQA?QueryName=$/ACC/Queries/MtnApp/MtnApp&Parameter='.urlencode($email), 
    array(
        'http_errors' => false,
        'headers'=> array(
            'requestVerificationToken'=>$data->access_token,
            'accept'     => 'application/json',
            'origin' => 'https://www.alpineclubofcanada.ca',
            
           
			'accept-encoding'=>'gzip, deflate, br',
			'accept-language'=>'en-US,en;q=0.9,fr;q=0.8',
			'cache-control'=>' max-age=0',

			'upgrade-insecure-requests'=>'1',
			'user-agent'=>'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
        )
    )
);



echo $validationResponse->getBody().'';





?>