$set=GetWidget('mobile-app-markers')->getIconsetData();

if(!key_exists('markerAttributes', $feature->attributes)){
    Emit('onSaveFeatureCustomScriptNotValid', array('does not contain `markerAttributes`', $feature, $set));
    return;
}

if(!key_exists('type', $feature->attributes->markerAttributes)){
    Emit('onSaveFeatureCustomScriptNotValid', array('does not contain `type`', $feature, $set));
    return;
}

$type= $feature->attributes->markerAttributes->type;

if(!in_array($type, $set->names)){
    Emit('onSaveFeatureCustomScriptNotValid', array('does not contain type:'.$type, $feature, $set));
    return;
}

$index=array_search($type, $set->names);
$url=$set->icons[$index];

$feature->marker->style=$url."?thumb=64x64";

Emit('onSaveFeatureCustomScript', array($url, $feature));

return $feature;