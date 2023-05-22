<?php
declare(strict_type=1);

try {

}catch (Exception $e) {
    echo "<p class='error'>";
    echo "Något gick JÄTTEfel<br>";
    echo $e->getMessage();
    echo "</p>";
}


exit;