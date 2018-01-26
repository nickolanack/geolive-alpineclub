$parameters['client']=($client=GetClient()->getUserMetadata());
if($client['id']>0){
    GetPlugin('Attributes');
    $parameters['client']['attributes']=(new attributes\Record('deviceUserAttributes'))->getValues($client['id'],'user');
    
    if($parameters['client']['attributes']['authEmail']===$parameters['client']['attributes']['authorizedEmail']){
        $parameters['authorized']=true;
    }
    
    
}
return $parameters;