$clientId=GetClient()->getUserId();
//user must be logged in
if($clientId<=0){
    return false;
}

$email=$json->email;

//must submit an email address
//TODO: validate email address
if(empty($email)){
    return false;
}
$validEmail=false;
if(filter_var($email, FILTER_VALIDATE_EMAIL)){
    $validEmail=true;
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
    
if($validEmail){  
GetPlugin('Email')->getMailer()
    ->mail("Activate your mobile device (".GetClient()->getRealName().") with The Alpine Club", "You can activate your device by clicking this link: <a href=\"".$clientLink."\" >Click Here</a>")
    ->to($email)
    ->send();
}

//prompt user to check their email address.
return array(
    "text"=>$validEmail?"An email, containing an activation link, has been sent to ".$email.".":"The email address you entered (".$email.") is invalid"
    );