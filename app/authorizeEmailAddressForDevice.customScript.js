<?php
GetPlugin('Attributes');

(new attributes\Record('deviceUserAttributes'))
    ->setValues($eventArgs->user, 'user', array(
        'authorizedEmail'=>$eventArgs->email
    ));

?>