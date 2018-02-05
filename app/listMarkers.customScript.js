GetPlugin('Maps');


$layer=(int)$json->layer;

return array(
    "items"=>(new spatial\Features())->listLayerItems($layer)
        ->appendUserAttributes('deviceUserAttributes')
        ->map(function($item){
            
            return $item;
            
        })
    );