
var itemlist=<?php
GetPlugin('Maps');


$layer=1;
$defaultProfileIcon=GetWidget("mobile-app-config")->getParameter("profile-image")[0];

echo json_encode(array_slice((new spatial\Features())->listLayerItems($layer)
        ->appendUserInfo()
        ->appendUserAttributes('deviceUserAttributes')
        //->sort('creationDate')
        ->map(function($item)use($defaultProfileIcon){
            
            $profileIcon=$item['user-attributes']['deviceUserAttributes']['profileImage'];
            $item['user-attributes']['deviceUserAttributes']['isDefaultProfileImage']=false;
            if(empty($profileIcon)||(!HtmlDocument()->isLocalFileUrl($profileIcon))){
                $item['user-attributes']['deviceUserAttributes']['profileImage']=$defaultProfileIcon;
                $item['user-attributes']['deviceUserAttributes']['isDefaultProfileImage']=true;
            }
            
            
            
            
            
            
            return $item;
            
        })
        , 0, 5)
    );


?>

return itemlist.map(function(item){
    
    return new MockDataTypeItem(item);
    
});