$parameters['client']=($client=GetClient()->getUserMetadata());
if($client['id']>0){
    GetPlugin('Attributes');
    $parameters['client']['attributes']=(new attributes\Record('deviceUserAttributes'))->getValues($client['id'],'user');
}
return $parameters;