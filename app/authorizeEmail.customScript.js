$clientId=GetClient()->getUserId();
//user must be logged in
if($clientId<=0){
    //return false;
    return array(
        "text"=>"unable to resolve your account",
        "type"=>"error"
    );
}

$email=$json->email;

//must submit an email address
//TODO: validate email address
if(empty($email)){
    //return false;
    
    return array(
        "text"=>"The email field was empty",
        "type"=>"error"
    );
}
$validEmail=false;
if(filter_var($email, FILTER_VALIDATE_EMAIL)){
    $validEmail=true;
}

$config=GetWidget('alpine-auth-config');

$secretEmail=$config->getParameter('testSecretEmail');


if(strpos($email, $secretEmail.":")===0){
    $email=explode(':', $email);
    $email=trim($email[1]);
    
    Emit('onAuthorizeEmailAddressForDevice', array(
        'user'=>$clientId,
        'email'=>$email,
        "text"=>"Your activated you sneaky character"
    ));
    return true;
    
}

if($email===$secretEmail){
    Emit('onAuthorizeEmailAddressForDevice', array(
        'user'=>$clientId,
        'email'=>$json->email,
        "text"=>"Your activated you sneaky character"
    ));
    return true;
    
}






//store address in user attribute
GetPlugin('Attributes');
(new attributes\Record('deviceUserAttributes'))->setValues($clientId, 'user', array('authEmail'=>$email, 'authEmailStatus'=>'sent'));

//create event token
$adminToken=($links=GetPlugin('Links'))->createLinkEventCode('onAuthorizeEmailAddressForDevice', array(
    'user'=>$clientId,
    'email'=>$json->email,
    "text"=>"And administrator has activated your device"
));
//make a one time clickable url from event token
$adminLink=HtmlDocument()->website().'/'.$links->actionUrlForToken($adminToken);


//create event token
$clientToken=($links=GetPlugin('Links'))->createLinkEventCode('onAuthorizeEmailAddressForDevice', array(
    'user'=>$clientId,
    'email'=>$json->email,
    "text"=>"Your device has been activated"
));
//make a one time clickable url from event token
$clientLink=HtmlDocument()->website().'/'.$links->actionUrlForToken($clientToken);

//email link to email address. verify email ownership
GetPlugin('Email')->getMailer()
    ->mail("Activate Device for: ".GetClient()->getRealName(), "Activate App Clients Device with email: ".$email.": <a href=\"".$adminLink."\" >Click Here</a>")
    ->to("nickblackwell82@gmail.com")
    ->send();
    
if(!$validEmail){  

    return array(
        "text"=>"The email address you entered (".$email.") is invalid",
        "type"=>"error"
    );
    
}
    
    
$auth=GetWidget('alpine-auth-function')->executeScript(array('email'=>$email));
Emit('onAuthorizeEmailWithAlpine', array('alpine-auth-function'=>$auth));
if(!$auth){
    return array(
        "text"=>"Failed to authorize with The alpine Club of Canada",
        "type"=>"error"
    );
}

if(key_exists("type", $auth)&&$auth['type']=="error"){
    return $auth;
}
    

    
    
$subject=(new \core\Template(
    'activate.device.subject',"Activate your mobile device ({{name}}) with The Alpine Club"))
    ->render(GetClient()->getUserMetadata());
$body=(new \core\Template(
    'activate.device.body', "You can activate your device by clicking this link: <a href=\"{{link}}\" >Click Here</a>"))
    ->render(array_merge(GetClient()->getUserMetadata(), array("link"=>$clientLink)));  
    
GetPlugin('Email')->getMailer()
    ->mail($subject, $body)
    ->to($email)
    ->send();




//prompt user to check their email address.
return array(
    "text"=>"An email, containing an activation link, has been sent to ".$email."."
);