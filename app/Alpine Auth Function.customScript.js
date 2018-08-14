<?php

/**
 *  call this function with
 */


$testAddresses=array(
    'nickblackwell82@gmail.com',
    'nickblackwell82+1@gmail.com',
    'nickblackwell82+2@gmail.com',
    'nickblackwell82+3@gmail.com',
    'nickblackwell82+4@gmail.com',
    'nickblackwell82+5@gmail.com',
    'nickblackwell82+6@gmail.com',
    'nickblackwell82+7@gmail.com',
);


Emit('onAttemptAlpineAuth', array('args'=>func_get_args()));



$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://www.alpineclubofcanada.ca/Asi.Scheduler_DEV/token', array(
    'form_params' => array(
        'grant_type'=>'password',
        'username'=>'', 
        'password'=>''
    )
));

if($response->getStatusCode()!==200){

   Emit('onAttemptAlpineAuth', array('args'=>func_get_args()));

   return; 
}

print_r($response->getBody()."");

echo "Args: ".json_encode(func_get_args());

?>