$parameters['client']=($client=GetClient()->getUserMetadata());
$parameters['account-authorized']=false;
$parameters['account-profile-image']=$parameters['account-profile];
if($client['id']>0){
    GetPlugin('Attributes');
    $parameters['client']['attributes']=(new attributes\Record('deviceUserAttributes'))->getValues($client['id'],'user');
    
    if($parameters['client']['attributes']['authEmail']===$parameters['client']['attributes']['authorizedEmail']){
        $parameters['account-authorized']=true;
    }
    
    
    if(!empty($parameters['client']['attributes']['profileImage'])){
        $parameters['account-profile-image']=HtmlDocument()->parseImageUrls(
            $parameters['client']['attributes']['profileImage']
        );    
        
    }
    
    
}
return $parameters;