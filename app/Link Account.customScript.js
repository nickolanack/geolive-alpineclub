<?php

$linkEmailAddress='nickblackwell82@gmail.com';
$users=Core::GetUsersource()->emailExists($linkEmailAddress);
if(!empty($users)){
    echo 'Should Link Account! '.json_encode($users);
}else{
    echo 'Nothing to link';
}

GetPlugin('Attributes');

    $results= (new attributes\Filter())->query('
    
        {
            "table":"deviceUserAttributes",
            "show":["authEmailStatus"],
            "filters":[
                {"field":"authorizedEmail","value":"' . $linkEmailAddress . '"}
            ]}
        ');

    echo 'Results: '.print_r($results, true);

?>