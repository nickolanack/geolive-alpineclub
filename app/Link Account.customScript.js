<?php

$linkEmailAddress='nickblackwell82@gmail.com';
$users=Core::GetUsersource()->emailExists($linkEmailAddress);
if(!empty($users)){
    echo 'Should link devices to: ! '.json_encode($users);
}else{
    echo 'No real account to link!';
}

GetPlugin('Attributes');

    $devices= (new attributes\Filter())->query('
    
        {
            "table":"deviceUserAttributes",
           
            "filters":[
                {"field":"authorizedEmail","value":"' . $linkEmailAddress . '"},
                {"field":"authEmailStatus","value":"approved"}
            ]}
        ');

    echo 'Results: '.print_r($devices, true);
    
    
    if(!empty($devices)){
            
        if(count($devices)==1&&empty($users)){
            Emit('onInitializeDeviceAccount', $devices[0]);
            return;
        }
        
        if(count($devices)>1){
            Emit('onMergeDeviceAccounts', array('devices'=>$devices));
            return;
        }
        
        
        if(count($devices)==1&&!empty($users)){
            Emit('onLinkDeviceAccount', array('device'=>$device[0], 'user'=>$users[0]));
            return;
        }
        
    }
    

?>