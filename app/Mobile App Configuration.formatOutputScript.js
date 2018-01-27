$parameters['client']=($client=GetClient()->getUserMetadata());
$parameters['account-authorized']=false;
$parameters['account-profile-image']=$parameters['profile-image'];
if($client['id']>0){
    GetPlugin('Attributes');
    $attributes=(new attributes\Record('deviceUserAttributes'))->getValues($client['id'],'user');
    $parameters['client']['attributes']= $attributes;
    
    if(!empty($attributes['authEmail'])&&$attributes['authEmail']===$attributes['authorizedEmail']){
        $parameters['account-authorized']=true;
    }
    
    
    if(!empty($attributes['profileImage'])){
        $parameters['account-profile-image']=array($attributes['profileImage']);
    }
    
    
}
return $parameters;