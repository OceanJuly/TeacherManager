<?php
		  header("Content-Type:text/html;charset=utf-8");

          $username = $_POST["username"];
          $age = $_POST["age"];
          $lesson = $_POST["lesson"];
          $lifephoto = $_POST["lifephoto"];
          $other = $_POST["other"];

          $con = mysqli_connect("127.0.0.1","root","123456");
          if(!$con){
              die('could not connect' . mysqli_error($con));
          }

          mysqli_select_db($con,'loginpage');
          $sql = "insert into teacher (username,age,lesson,lifephoto,other) values('$username','$age','$lesson','$lifephoto','$other')";
          if(!mysqli_query($con,$sql)){
              die('error:' . mysqli_error($con));
          };
          mysqli_close($con);
          echo '{"status": "ok","code": 200}';
?>
