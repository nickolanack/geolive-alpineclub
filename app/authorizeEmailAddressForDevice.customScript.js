<?php
GetPlugin('Attributes');

Emit('authorizeEmailStart',$eventArgs);

(new attributes\Record('deviceUserAttributes'))
    ->setValues($eventArgs->user, 'user', array(
        'authorizedEmail'=>$eventArgs->email
    ));
    
    
Emit('authorizeEmailEnd',$eventArgs);

?>