<?php

$linkEmailAddress='nickblackwell82@gmail.com';
$users=Core::GetUsersource()->emailExists($linkEmailAddress);
if(!empty($users)){
    echo 'Should link devices to: ! '.json_encode($users);
}else{
    echo 'No real account to link!';
}

GetPlugin('Attributes');

    $results= (new attributes\Filter())->query('
    
        {
            "table":"deviceUserAttributes",
           
            "filters":[
                {"field":"authorizedEmail","value":"' . $linkEmailAddress . '"},
                {"field":"authEmailStatus","value":"approved"}
            ]}
        ');

    echo 'Results: '.print_r($results, true);

?>