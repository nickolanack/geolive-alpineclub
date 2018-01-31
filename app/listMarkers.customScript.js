GetPlugin('Maps');

return array("items"=>(new spatial\Features())->listLayerItems($layer)->withUserAccessFilter()->addUserInfo()->get());