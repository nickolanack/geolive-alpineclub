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

GetPlugin('Apps')
    ->notifyUsersDevices(
        $eventArgs->user, 
        'Successfully authorized your account with the Alpine Club'
    );


?>