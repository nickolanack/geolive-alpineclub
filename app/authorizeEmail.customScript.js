$token=($links=GetPlugin('Links'))->createLinkEventCode('authorizeEmailAddressForDevice', $json);
$link=$links->actionUrlForToken($token);

GetPlugin('Email')->getMailer()
    ->mail("Executing email authorization for", "Activate your email address with this link: ".$link
    ->to("nickblackwell82@gmail.com")
    ->send();

return array(
    "very-cool"=>"user-function",
    "json"=>$json
    );