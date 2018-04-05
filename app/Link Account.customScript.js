<?php
$linkEmailAddress='nickblackwell82@gmail.com';

echo json_encode(Core::GetUsersource()->emailExists($linkEmailAddress));

?>