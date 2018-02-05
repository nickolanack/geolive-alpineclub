GetPlugin('Maps');


$layer=(int)$json->layer;
$defaultProfileIcon=GetWidget("mobile-app-config")->getParameter("profile-image");

return array(
    "items"=>(new spatial\Features())->listLayerItems($layer)
        ->appendUserAttributes('deviceUserAttributes')
        ->map(function($item)use($defaultProfileIcon){
            
            $profileIcon=$item['user-attributes']['deviceUserAttributes']['profileImage'];
            if(empty($profileIcon)||(!HtmlDocument()->isLocalFileUrl($profileIcon))){
                $item['user-attributes']['deviceUserAttributes']['profileImage']=$defaultProfileIcon;
            }
            
            
            $item['user-attributes']['deviceUserAttributes']['defaultProfileImage']=$defaultProfileIcon;
            
            
            
            return $item;
            
        })
    );