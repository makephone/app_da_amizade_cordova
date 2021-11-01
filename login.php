<?php
if(isset($_GET["nome"])&& isset($_GET["email"])&& isset($_GET["senha"])){
$nome=$_GET["nome"];
$email=$_GET["email"];	
$senha=$_GET["senha"];
$id=null;

$consulta="INSERT INTO `usuario` (id,nome,email,senha) VALUES (?,?,?,?)";


try {
	 $dbh = new PDO('mysql:host=host;dbname=nomebanco','usuario','senha');
    //$dbh = new PDO('mysql:host=localhost;dbname=meupet','root','');
    $statement = $dbh->prepare($consulta);
    $statement->execute([$id,$nome,$email,$senha]);

 
} catch (PDOException $e) {
    
    die();
}

}




















if(isset($_GET["email"])&&isset($_GET["senha"])){

$email=$_GET["email"];
$senha=$_GET["senha"];


$consulta="SELECT * FROM `usuario` WHERE `email` =? AND `senha` =? ";

try {
    $dbh = new PDO('mysql:host=host;dbname=nomebanco','usuario','senha');
    $statement = $dbh->prepare($consulta);
	$statement ->bindValue(1,$email);
	$statement ->bindValue(2,$senha);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results,true);
	

	print($json);
	
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

}
?>