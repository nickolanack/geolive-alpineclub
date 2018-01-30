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

//store address in user attribute
GetPlugin('Attributes');
(new attributes\Record('deviceUserAttributes'))->setValues($clientId, 'user', array('authEmail'=>$email, 'authEmailStatus'=>'sent'));

//create event token
$token=($links=GetPlugin('Links'))->createLinkEventCode('onAuthorizeEmailAddressForDevice', array(
    'user'=>$clientId,
    'email'=>$json->email
));
//make a one time clickable url from event token
$link=HtmlDocument()->website().'/'.$links->actionUrlForToken($token);

//email link to email address. verify email ownership
GetPlugin('Email')->getMailer()
    ->mail("Executing email authorization for", "Activate your email address with this link: <a href=\"".$link."\" >Click Here</a>")
    ->to("nickblackwell82@gmail.com")
    ->send();

//prompt user to check their email address.
return array(
    "text"=>"An email, containing an activation link, has been sent to ".$email."."
    );