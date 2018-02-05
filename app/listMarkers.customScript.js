GetPlugin('Maps');


$layer=(int)$json->layer;
$defaultProfileIcon=GetWidget("mobile-app-config")->getParameter("profile-image");

return array(
    "items"=>(new spatial\Features())->listLayerItems($layer)
        ->appendUserAttributes('deviceUserAttributes')
        ->map(function($item)use($defaultProfileIcon){
            
            $profileIcon=$item['user-attributes']['deviceUserAttributes']['profile'];
            $item['user-attributes']['deviceUserAttributes']['profile']=$defaultProfileIcon;
            
            return $item;
            
        })
    );