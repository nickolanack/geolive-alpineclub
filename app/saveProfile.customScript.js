$clientId=GetClient()->getUserId();
if($clientId<=0){
    return false;
}

$profileImageHtml=$json->profile;

if(empty($profileImageHtml)){
    return false;
}

GetPlugin('Attributes');
(new attributes\Record('deviceUserAttributes'))
    ->setValues($clientId, 'user', array(
        'profileImage'=>$profileImageHtml
    ));