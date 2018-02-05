GetPlugin('Maps');


$layer=(int)$json->layer;

return array(
    "items"=>(new spatial\Features())->listLayerItems($layer)
        ->appendUserAttributes('deviceUserAttributes')
        ->map(function($item){
            
            $profileIcon=$item['user-attributes']['deviceUserAttributes']['profile'];
            $item['user-attributes']['deviceUserAttributes']['profile']=GetWidget("")->getParameter("")
            
            return $item;
            
        })
    );