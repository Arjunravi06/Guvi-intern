<?php

ini_set("display_errors", "1");
ini_set("display_startup_errors", "1");
error_reporting(E_ALL);

  
    if(isset($_POST['submit']));
    {
        $fname = $_POST['firstname'];
        $lname = $_POST['lastname'];
        $email = $_POST['email'];
        $newpassword = $_POST['newpassword'];
        $cnfpassword = $_POST['cnfpassword'];
    
    }
 
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "sampledb";


    $con = mysqli_connect($host, $username, $password, $dbname);

   
    if (!$con)
    {
        die("Connection failed!" . mysqli_connect_error());
    }

    $sql = "INSERT INTO info (fname, lname, email, newpassword, cnfpassword) VALUES ('$fname', '$lname', '$email', '$newpassword', '$cnfpassword')";

    $rs = mysqli_query($con, $sql);
    if($rs)
    {
        echo "Entries added!";
    }

    mysqli_close($con);

?>