<!DOCTYPE html>
<html>
  <head>
    <link href="./style/main.css" type="text/css" rel="stylesheet">
    <link href="./style/read-more.css" type="text/css" rel="stylesheet">
    <link href="./style/link-trans.css" type="text/css" rel="stylesheet">
    <title>rowans-bike</title>
    <meta name="description"
          content="A collection of work on Rowan's bicycles" />
    <meta name="keywords"
          content="bike, bikes, blog, cambio, rino, cambio-rino, 10-speed, bicycle touring, touring" />
    <meta http-equiv="author"
          content="Rowan MacLachlan" />
    <!-- Font for title -->
    <link
      href="https://fonts.googleapis.com/css?family=Expletus+Sans:700i&display=swap"
      rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/css?family=Lobster&display=swap"
      rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap"
      rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/css?family=Sonsie+One&display=swap"
      rel="stylesheet">
  </head>
  <body>

    <?php require 'header.html'; ?>

    <div id="title-page">
      <div id="title-wrapper">
        <div id="title-band">
          <div id="dividor-top-title"></div>
          <h1 id="title">
            <span style="font-family:'Liberty Island'">ROWAN'S BIKE</span>
          </h1>
          <div id="dividor-bottom-title"></div>
        </div>
        <div id="catchphrase">
          <p>The trials and tribulations of an amateur bike-programmer/web-mechanic.</p>
        </div>
      </div>
    </div>

    <div class="dividor-top"></div>
    <h2>The KHS Alite 100</h2>
    <div class="dividor-bottom"></div>
    <div class="bike" id="khs-alite">
      <div class="bike-img">
          <img id="khs-img"
               src="resources/photos/khs/khs.mobile.low.jpg"
               srcset="resources/photos/khs/khs.mobile.low.jpg 600w,
                       resources/photos/khs/khs.mobile.med.jpg 900w,
                       resources/photos/khs/khs.mobile.high.jpg 1200w"
               title="The KHS Alite 100"
               alt="A photo of the KHS Alite 100.">
      </div>
      <div class="bike-content">
        <?php include("bikes/khs-alite/origin.html"); ?>
      </div>
      <div class="read-more link-trans">
        <a href="/bikes/khs-alite/khs-alite.php">Read more...</a>
      </div>
    </div>

    <div class=dividor-top></div>
    <h2>The Cambio Rino</h2>
    <div class=dividor-bottom></div>
    <div class="bike" id="cambio-rino">
      <div class="bike-img">
          <img id="cambio-img"
               src="resources/photos/cambio/cambio.mobile.low.jpg"
               srcset="resources/photos/cambio/cambio.mobile.low.jpg 600w,
                       resources/photos/cambio/cambio.mobile.med.jpg 900w,
                       resources/photos/cambio/cambio.mobile.high.jpg 1200w"
               title="The Cambio Rino"
               alt="A photo of the Cambio Rino bicycle.">
      </div>
      <div class="bike-content">
        <?php include("bikes/cambio-rino/origin.html"); ?>
      </div>
      <div class="read-more link-trans">
        <a href="/bikes/cambio-rino/cambio-rino.php">Read more...</a>
      </div>
    </div>

    <div class=dividor-top></div>
    <h2>The Beekay Mirage</h2>
    <div class=dividor-bottom></div>
    <div class="bike" id="beekay-mirage">
      <div class="bike-img">
          <img id="beekay-img"
               src="resources/photos/beekay/beekay.mobile.low.jpg"
               srcset="resources/photos/beekay/beekay.mobile.low.jpg 600w,
                       resources/photos/beekay/beekay.mobile.med.jpg 900w,
                       resources/photos/beekay/beekay.mobile.high.jpg 1200w"
               title="The Beekay Mirage"
               alt="A photo of the Beekay Mirage bicycle.">
      </div>
      <div class="bike-content">
        <?php include("bikes/beekay-mirage/origin.html"); ?>      
      </div>
      <div class="read-more link-trans">
        <a href="/bikes/beekay-mirage/beekay-mirage.php">Read more...</a>
      </div>
    </div>

    <div class=dividor-top></div>
    <h2>The Nova</h2>
    <div class=dividor-bottom></div>
    <div class="bike" id="nova">
      <div class="bike-img">
          <img id="nova-img"
               src="resources/photos/nova/nova.mobile.low.jpg"
               srcset="resources/photos/nova/nova.mobile.low.jpg 600w,
                       resources/photos/nova/nova.mobile.med.jpg 900w,
                       resources/photos/nova/nova.mobile.high.jpg 1200w"
               title="The Nova"
               alt="A photo of the Nova bicycle.">
      </div>
      <div class="bike-content">
        <?php include("bikes/nova/origin.html"); ?>
      </div>
      <div class="read-more link-trans">
        <a href="/bikes/nova/nova.php">Read more...</a>
      </div>
    </div>

    <div class=dividor-top></div>
    <h2>The Bianchi Volpe</h2>
    <div class=dividor-bottom></div>
    <div class="bike" id="bianchi">
      <div class="bike-img">
        <img id="bianchi-img"
             src="resources/photos/bianchi/bianchi.mobile.low.jpg"
             srcset="resources/photos/bianchi/bianchi.mobile.low.jpg 600w,
                     resources/photos/bianchi/bianchi.mobile.med.jpg 900w,
                     resources/photos/bianchi/bianchi.mobile.high.jpg 1200w"
             title="The Bianchi Volpe"
             alt="A photo of the unfinished Bianchi Volpe in a workstand.">
      </div>
      <div class="bike-content">
        <?php include("bikes/bianchi-volpe/origin.html"); ?>
      </div>
      <div class="read-more link-trans">
        <a href="/bikes/bianchi-volpe/bianchi-volpe.php">Read more...</a>
      </div>
    </div>

    <?php require 'footer.html'; ?>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  </body>
</html>

