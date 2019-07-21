<?php

    // 文件上传
    $data = $_FILES;

//    var_dump($data);

    // 进行处理,文件保存在硬盘上面
    $fileName = $data["lifephoto"]["name"];
    $tmp = $data["lifephoto"]["tmp_name"];

    // 要把从服务器的一个临时位置存储到img目录下
    $url = "../img/".$fileName;
    move_uploaded_file($tmp,$url);

    $arr = array("url" => $url);
    echo json_encode($arr);

?>
