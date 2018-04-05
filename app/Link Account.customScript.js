<?php

$linkEmailAddress='nickblackwell82@gmail.com';
$users=Core::GetUsersource()->emailExists($linkEmailAddress);
if(!empty($users))

echo 'Should Link Account! '.json_encode($users);

?>