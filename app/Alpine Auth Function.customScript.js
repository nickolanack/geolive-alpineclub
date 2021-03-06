/**
 *  call this function like:    ->userFunction($email);
 */
 
 
Emit('onAlpineAuthAttempt', array('args'=>func_get_args()));
 
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
    Emit('onAlpineAuthAttemptError', array('message'=>'expected email address', 'args'=>func_get_args()));
    return false;
}








$client = new \GuzzleHttp\Client();

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

   Emit('onAlpineAuthAttemptError', $error=array(
       'url'=>$tokenUrl,
       'message'=>'Token Response: '.$status,
       'args'=>func_get_args(),
       'response'=>$tokenResponse->getBody()."",
       'user'=>$serverUser,
       'pass'=>'XXX-XXXX'
       ));
       
    print_r($error);
   return; 
}

$token=json_decode($tokenResponse->getBody());

if(!($token&&key_exists('access_token', $token)&&(!empty($token->access_token)))){
    Emit('onAlpineAuthAttemptError', array('message'=>'Expected to receive server token from: '.$serverUrl, 'args'=>func_get_args()));
    return false;
}


$validationUrl= $serverUrl.'/api/IQA?QueryName=$/ACC/Queries/MtnApp/MtnApp&Parameter='.urlencode($email);

$validationResponse = $client->request('GET', $validationUrl,   
    
    array(
        'http_errors' => false,
        'headers'=> $headers=array(
            //'RequestVerificationToken'=>$token->access_token,
            'Authorization'=> "Bearer ".$token->access_token
        )
    )
);


if(($status=$validationResponse->getStatusCode())!==200){

   Emit('onAlpineAuthAttemptError', $error=array(
       'token'=>$token,
       'token-url'=>$tokenUrl,
       'validation-url'=>$validationUrl,
       'message'=>'Validation Response: '.$status,
       'args'=>func_get_args(),
       'response'=>$validationResponse->getBody()."",
       'user'=>$serverUser,
       'pass'=>'XXX-XXXX',
       'email'=>$email
       ));
       
    print_r($error);
   return false; 
}

$validation=json_decode($validationResponse->getBody());

if(is_object($validation)){
    Emit('onAlpineAuthResonse', $error=array(
       'validationData'=>$validation,
       'email'=>$email
       ));
}

$count=$validation->Count;
if($count!=1){
    
    Emit('onAlpineAuthAttemptError', $error=array(
       'message'=>'Expected 1 result',
       'email'=>$email
       ));
       
    print_r($error);
    return false; 
    
}
    $v=$validation->Items->{'$values'}[0];
    //print_r($values);

    $item=array(
        'type'=>$v->EntityTypeName,
    );
    foreach($v->Properties->{'$values'} as $p){
        if(!key_exists('Value', $p)){
            $item[$p->Name]=null;
            continue;
        }
        if(!is_object($p->Value)){
            $item[$p->Name]=$p->Value;
            continue;
        }
        $item[$p->Name]=$p->Value->{'$value'};
    }



$validation=array(
    'email'=>$email,
    'result'=>$item
);
    
if($item['email_count']==0){
    $validation['text']='The email address '.$email.' is not registered with The Alpine Club of Canada';
    $validation['type']="error";
}else{
    
    $nullIsExpired=false;
    if($nullIsExpired&&is_null($item['expiry'])){
        $validation['text']='The account for '.$email.' is expired';
        $validation['type']="error";
    }
    
    if((!is_null($item['expiry']))&&strtotime($item['expiry'])<time()){
        $validation['text']='The account for '.$email.' is expired';
        $validation['type']="error";
    }
    
    
}   


Emit('onAlpineAuthEmail', $validation);

return $validation;