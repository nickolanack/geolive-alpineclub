<?php

//This event was triggered from an event token bound to an action link passed to a user.


GetPlugin('Attributes');

(new attributes\Record('deviceUserAttributes'))
    ->setValues($eventArgs->user, 'user', array(
        'authorizedEmail'=>$eventArgs->email
    ));

?>