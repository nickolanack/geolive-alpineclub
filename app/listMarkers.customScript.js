GetPlugin('Maps');


$layer=(int)$json->layer;
$defaultProfileIcon=GetWidget("mobile-app-config")->getParameter("profile-image")[0];

return array(
    "items"=>(new spatial\Features())->listLayerItems($layer)
        ->appendUserDetails()
        ->appendUserAttributes('deviceUserAttributes')
        ->map(function($item)use($defaultProfileIcon){
            
            $profileIcon=$item['user-attributes']['deviceUserAttributes']['profileImage'];
            $item['user-attributes']['deviceUserAttributes']['isDefaultProfileImage']=false;
            if(empty($profileIcon)||(!HtmlDocument()->isLocalFileUrl($profileIcon))){
                $item['user-attributes']['deviceUserAttributes']['profileImage']=$defaultProfileIcon;
                $item['user-attributes']['deviceUserAttributes']['isDefaultProfileImage']=true;
            }
            
            
            
            
            
            
            return $item;
            
        })
    );