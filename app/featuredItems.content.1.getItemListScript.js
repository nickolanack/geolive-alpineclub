
var itemlist=<?php
GetPlugin('Maps');


$layer=1;
$defaultProfileIcon=GetWidget("mobile-app-config")->getParameter("profile-image")[0];

//throw new \Exception('idk');

echo '/*List Layer: '.$layer.': '.date("Y-m-d H:i:s").'*/ ';

$list=(new spatial\Features())->listLayerItems($layer)
        ->appendUserInfo()
        //->appendUserAttributes('deviceUserAttributes')
        // ->map(function($item)use($defaultProfileIcon){
            
        //     $profileIcon=$item['user-attributes']['deviceUserAttributes']['profileImage'];
        //     $item['user-attributes']['deviceUserAttributes']['isDefaultProfileImage']=false;
        //     if(empty($profileIcon)||(!HtmlDocument()->isLocalFileUrl($profileIcon))){
        //         $item['user-attributes']['deviceUserAttributes']['profileImage']=$defaultProfileIcon;
        //         $item['user-attributes']['deviceUserAttributes']['isDefaultProfileImage']=true;
        //     }
            
        //     echo '/*'.json_encode($item).'*/ ';
            
        //     return $item;
            
        // });
        ->get();
        
    usort($list, function($a, $b){
        return -strcmp($a['creationDate'], $b['creationDate']);
    });
    //echo json_encode($list, 0, 5);
    echo json_encode(array_slice($list, 0, 5));


?>;

return itemlist.map(function(item){
    
    return new MockDataTypeItem(item);
    
});