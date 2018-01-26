$clientId=GetClient()->getUserId();
if($clientId<=0){
    return false;
}

$email=$json->email;

if(empty($email)){
    return false;
}

GetPlugin('Attributes');
(new attributes\Record('deviceUserAttributes'))->setValues($clientId, 'user', array('authEmail'=>$email, 'authEmailStatus'=>'sent'));

$token=($links=GetPlugin('Links'))->createLinkEventCode('onAuthorizeEmailAddressForDevice', array(
    'user'=>$clientId,
    'email'=>$json->email
));
$link=HtmlDocument()->website().'/'.$links->actionUrlForToken($token);

GetPlugin('Email')->getMailer()
    ->mail("Executing email authorization for", "Activate your email address with this link: <a href=\"".$link."\" >Click Here</a>")
    ->to("nickblackwell82@gmail.com")
    ->send();

return array(
    "very-cool"=>"user-function",
    "json"=>$json
    );