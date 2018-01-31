GetPlugin('Maps');

return array("items"=>(new spatial\Features())->getLayer($layer)->addUserInfo()->get());