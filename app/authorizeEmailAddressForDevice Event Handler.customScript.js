<?php

//This event was triggered from an event token bound to an action link passed to a user.
//create event token
//$token=($links=GetPlugin('Links'))->createLinkEventCode('onAuthorizeEmailAddressForDevice', array(
//    'user'=>$clientId,
//    'email'=>$json->email
//));


GetPlugin('Attributes');

(new attributes\Record('deviceUserAttributes'))
    ->setValues($eventArgs->user, 'user', array(
        'authorizedEmail'=>$eventArgs->email,
        'authEmailStatus'=>'approved'
    ));

//user should now have matching attributes: authorizedEmail=authEmail


    GetLogger('test')->info(' Test Test', array());

    $users=array();
    $devices= (new attributes\Filter())->query('
    
        {
            "table":"deviceUserAttributes",
           
            "filters":[
                {"field":"authorizedEmail","value":"' . $eventArgs->email . '"},
                {"field":"authEmailStatus","value":"approved"}
            ]
        
        }
    ');

    //echo 'Results: '.print_r($devices, true);
    
    
    if(!empty($devices)){
            
        if(count($devices)==1&&empty($users)){
 
            Emit('onInitializeDeviceAccount', $devices[0]);
          
        }else if(count($devices)>1){
            
            GetPlugin('Apps')->mergeDeviceUsers(array_map(function($d){
                return $d->mapitem;
            }, $devices));
            
        }else if(count($devices)==1&&!empty($users)){

            Emit('onLinkDeviceAccount', array('device'=>$device[0], 'user'=>$users[0]));

        }
        
    }



GetPlugin('Apps')
    ->notifyUsersDevices(
        $eventArgs->user, 
        array(
            "data"=>array("authorized"=>true),
            "parameters"=>array("account-authorized"=>true),
            "text"=>"Your account has been authorized"
        )
    );


?>