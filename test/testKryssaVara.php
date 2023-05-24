<?php
declare(strict_types=1);
require_once "../php/funktioner.php";

try {
    // Skapa handle till cURL för att läsa svaret
    $ch=curl_init('http://localhost/Shoppinglista/php/kryssaVara.php');

    //Se till att vi får svaret som en sträng
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //Anropen till sidan som ska testas
    //Fel metod
    echo "<p class='info'>Test fel metod</p>";
    felMetod($ch);

    //id saknas i anropet
    echo "<p class='info'>ID saknas i anropet</p>";
    idSaknas($ch);

    //id felaktigt (inte en siffra)
    echo "<p class='info'>Felaktigt id (inte en siffra)</p>";
    idBokstav($ch);

    //id felaktigt (-1)
    echo "<p class='info'> Felaktigt id (-1)</p>";
    idNegativt($ch);

    //angivet id saknas
    echo "<p class='info'>Angivet id saknas</p>";
    idFinnsInte($ch);

    //OK - sätt kryss


    //OK - ta bort kryss


}catch (Exception $e) {
    echo "<p class='error'>";
    echo "Något gick JÄTTEfel<br>";
    echo $e->getMessage();
    echo "</p>";
} finally {
    curl_close($ch);
}

function idFinnsInte($curlHandle) {
    //Koppla mot databas och starta transaktion
    $db=connectDB();
    $db->beginTransaction();

    //Skapa en ny post
    $id=skapaVara("test");

    //Radera den nya posten
    raderaVara($id);

    //Sätt anropsmetod till POST
    curl_setopt($curlHandle, CURLOPT_POST, true);

    //Lägg data till anropet
    $data=['id' => $id];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);

    //Skicka anrop
    $jsonSvar=curl_exec($curlHandle);
    $status=curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    //Kontrollera svar och skiv ut resultat
    if($status===400) {
        echo "<p class='ok'>Förväntat svar 400</p>";
    } else {
        echo "<p class='error'>Fick status=status istället för förväntat 400</p>";
    }

    //Rulla tillbaka alla transaktioner
    $db->rollBack();
}


function idNegativt($curlHandle) {
    //Sätt anropsmetod till POST
    curl_setopt($curlHandle, CURLOPT_POST, true);

    //Lägg till data till anropet
    $data=['id' => -1];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, true);

    //Skicka anrop
    $jsonSvar=curl_exec($curlHandle);
    $status=curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    //Kontrollera svar och skriv ut resultat
    if($status===400) {
        echo "<p class='ok'>Fick förväntat svar 400</p>";
    }else {
        echo "<p class='error'>Fick status=$status istället för förväntat 400</p>";
    }
}


function idBokstav($curlHandle) {
    //Sätt anropsmetod till POST
    curl_setopt($curlHandle, CURLOPT_POST, true);

    //Lägg till data till anropet
    $data=['id' => "id"];
    curl_setopt($curlHandle, CURLOPT_POSTFIELDS, true);

    //Skicka anrop
    $jsonSvar=curl_exec($curlHandle);
    $status=curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    //Kontrollera svar och skriv ut resultat
    if($status===400) {
        echo "<p class='ok'>Fick förväntat svar 400</p>";
    }else {
        echo "<p class='error'>Fick status=$status istället för förväntat 400</p>";
    }

}


function idSaknas($curlHandle) {
    //Sätt anropsmetod till POST
    curl_setopt($curlHandle, CURLOPT_POST, true);

    //Anropa och ta hand om svaret
    $jsonSvar=curl_exec($curlHandle);
    $status=curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);

    //Kontrollera svar och skriv ut text
    if($status===400) {
        echo "<p class='ok'>Förväntat svar 400</p>";
    } else {
        echo "<p class='error'>Svar med status=$status istället för förväntat 400</p>";
    }

}