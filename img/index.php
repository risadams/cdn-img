<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CDN for Ris Adams.</title>
</head>

<body>
  <h1>Hi there 👋</h1>
  <p>
    This isn't somewhere you should be.
    Chances are you meant to visit <a href='https://risadams.com'>risadams.com</a>.
    <br />
    I will be sending you there in <span id="countdown">10</span> seconds!
  </p>
  <script type="text/javascript">
    // Total seconds to wait
    var seconds = 10;

    function countdown() {
      seconds = seconds - 1;
      if (seconds < 0) {
        window.location = "https://risadams.com";
      } else {
        document.getElementById("countdown").innerHTML = seconds;
        window.setTimeout("countdown()", 1000);
      }
    }
    countdown();
  </script>
</body>

</html>