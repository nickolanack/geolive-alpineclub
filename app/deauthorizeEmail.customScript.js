$clientId=GetClient()->getUserId();
//user must be logged in
if($clientId<=0){
    return false;
}


//store address in user attribute
GetPlugin('Attributes');
(new attributes\Record('deviceUserAttributes'))
    ->setValues($clientId, 'user', array(
        'authorizedEmail'=>"", 
        'authEmailStatus'=>'deauthorized'
    ));


return true;