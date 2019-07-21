<?php
    header("Content-Type:text/html;charset=UTF-8");

    $tid = $_GET['tid'];

    $con = mysqli_connect('127.0.0.1',"root","123456");
    if(!$con){
        die("could not connect" . mysqli_error($con));
    }

    mysqli_select_db($con,'loginpage');

    $sql = "delete from teacher where id='$tid'";

    if(!mysqli_query($con,$sql)){
        die('error:'.mysqli_error);
    };
    mysqli_close($con);
    echo '{"status":"ok","code":200}';
?>
