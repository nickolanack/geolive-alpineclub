<?php 
    $ua = strtolower($_SERVER['HTTP_USER_AGENT']);
    if(stripos($ua,'android') !== false) { // && stripos($ua,'mobile') !== false) {
    	header('Location: https://play.google.com/store/');
    	exit();
    }
    
    if(stripos($ua,'iphone') !== false||stripos($ua,'ipod') !== false||stripos($ua,'ipad') !== false) { // && stripos($ua,'mobile') !== false) {
    	header('Location: https://itunes.apple.com/ca/app/');
    	exit();
    }


?>


<a href="">IOS App</a>
<a href="">Android App</a>