GetPlugin('Attributes');
$values=(new attributes\Record('markerAttributes'))->distinctValues('type');

$parameters=array();
foreach($values as $type){

    if((!$type)||$type==""){
        $type='?';
    }
    
    $name='cluster-'.strtolower(str_replace(' ', '-', str_replace(',', '', str_replace('/', '', str_replace('?', '', $type)))));
    $parameters[$name]=json_decode(json_encode(
        array(
                'name'=>$name,
                "type"=> "color",
                "default"=>"rgb(0,0,0)",
                "label"=>"Color For ".$type
            )
        
        
    ));
    
}


return (object) $parameters;