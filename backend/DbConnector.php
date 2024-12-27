<?php
class DbConnector {
    private $host = "localhost";
    private $dbuser = "root";
    private $dbname = "customer";
    private $dbpw = "";

    public function getConnection() {
        $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->dbname;

        try {
            $con = new PDO($dsn, $this->dbuser, $this->dbpw);
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $con;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}
?>
