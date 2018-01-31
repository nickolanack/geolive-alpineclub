GetPlugin('Maps');

return array("items"=>(new spatial\Features())->listLayerItems($layer)->addUserInfo()->get());