<?php
    header("Content-Type:text/html;charset=UTF-8");

    /*
        客户端必须给两个参数

        page 当前页
        pageSize 每页显示多少条
    */

    $pageNum = $_GET['page'];
    $pageSize = $_GET['pageSize'];

    $startIndex = ($pageNum-1)*$pageSize;
    $endIndex = $pageSize;

    $con = mysqli_connect('127.0.0.1',"root","123456");
    if(!$con){
        die("could not connect" . mysqli_error($con));
    }

    mysqli_select_db($con,'loginpage');

    $sql = "select * from teacher limit ".$startIndex.",".$endIndex;

	$result = mysqli_query($con,$sql);

	$list = array();

	while($row=mysqli_fetch_array($result)){
		$item=array(
			"id" => $row['id'],
			"username" => $row['username'],
			"age" => $row['age'],
			"lesson" => $row['lesson'],
			"lifephoto" => $row['lifephoto'],
			"other" => $row['other'],
		);
		array_push($list,$item);
	}

	//如果是分页的数据，我们传递到客户端的数据格式必须是
//	{
//	    "rows": [具体的记录]
//	    "totle": 8
//	}

    $json = array("rows"=>$list,"total"=>15);

	echo json_encode($json);
?>
