<?php

$linkEmailAddress='nickblackwell82@gmail.com';
$users=Core::GetUsersource()->emailExists($linkEmailAddress);
if(!empty($users)){
    echo 'Should Link Account! '.json_encode($users);
}else{
    echo 'Nothing to link';
}

GetPlugin('Attributes');

    $results= (new attributes\Filter())->query('{"join":"intersect","table":"deviceUserAttributes","set":"*","filters":[
                        {"field":"authorizedEmail","value":"' . $linkEmailAddress . '"}
                        
                    ]}');

    echo 'Results: '.print_r($results, true);

?>