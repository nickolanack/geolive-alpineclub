<?php

$linkEmailAddress='nickblackwell82@gmail.com';
$users=Core::GetUsersource()->emailExists($linkEmailAddress);
if(!empty($users)){
    echo 'Should Link Account! '.json_encode($users);
}else{
    echo 'Nothing to link';
}

GetPlugin('Attributes');

    echo (new attributes\Filter())->toQuery('{"join":"intersect","table":"userAttributes","set":"*","filters":[
                        {"field":"","authorizedEmail":"' . $linkEmailAddress . '"}
                        
                    ]}');


?>