<?php
  //start a session -- needed for Securimage Captcha check
  session_start();

  //add you e-mail address here
  define("MY_EMAIL", "contact@argaus.fr");
  define("EMAIL_SUBJECT", "Formulaire site web");

  //a map of fields to include in email, along with if they are required or not
  //aparently in PHP, arrays (maps) can't be constants?
  $fields_req =  array("name" => true, "title" => false, "phone" => false, "message" => true);

  /**
   * Sets error header and json error message response.
   *
   * @param  String $messsage error message of response
   * @return void
   */
  function errorResponse ($messsage) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => $messsage)));
  }

  /**
   * Pulls posted values for all fields in $fields_req array.
   * If a required field does not have a value, an error response is given.
   *
   * @param [Array] $fields_req a map of field name to required
   */
  function setMessageBody ($fields_req) {
    $message_body = "";
    foreach ($fields_req as $name => $required) {
      if ($required && empty($name)) {
        errorResponse("$name est vide.");
      } else {
        $message_body .= ucfirst($name) . ":  " . $_POST[$name] . "\n";
      }
    }
    return $message_body;
  }

  $email = $_POST['email'];

  header('Content-type: application/json');
  //do some simple validation. this should have been validated on the client-side also
  if (empty($email)) {
  	errorResponse('Email ou message est vide.');
  }

  //do Captcha check, make sure the submitter is not a robot:)...
  include_once './vender/securimage/securimage.php';
  $securimage = new Securimage();
  if (!$securimage->check($_POST['captcha_code'])) {
    errorResponse('Le code de sécurité est invalide.');
  }

  //try to send the message
  if(mail(MY_EMAIL, EMAIL_SUBJECT, setMessageBody($fields_req), "From: $email")) {
  	echo json_encode(array('message' => 'Votre message a bien été envoyé.'));
  } else {
  	header('HTTP/1.1 500 Internal Server Error');
  	echo json_encode(array('message' => "Erreur lors de l'envoi du mail."));
  }
?>
