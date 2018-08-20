$result=(new core\DefaultAjaxTreeController())->executeTask('mapitem_delete',(object)array('mapitemId'=>$json->item));

if(is_array($result)){
    $result['text']='Successfully Deleted Item';
}

return $result;