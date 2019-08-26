<DOCTYPE html>
<html>

<head>
  <link href="../style/main.css" type="text/css" rel="stylesheet">
  <link href="../style/tour.css" type="text/css" rel="stylesheet">
  <link href="../style/bike.css" type="text/css" rel="stylesheet">
  <title>the-tour</title>
  <meta name="description" content="Rowan's bicycle tour" />
  <meta name="keywords" content="bike, touring, blog, bike-tour, bike-packing" />
  <meta http-equiv="author" content="Rowan MacLachlan" />
</head>

<body>
  <?php require 'header.html'; ?>

  <div class="bike-title-wrapper">
    <div class="dividor-top"></div>
    <h1 id="title">
      <span style="font-family:'Liberty Island'">THE TOUR</span>
    </h1>
    <div class="dividor-bottom"></div>
  </div>

  <div id=game-container>
    <!-- <div class="game-header"></div> -->
    <canvas id="background" width="800px" , height="400px"></canvas>
    <canvas id="terrain" width="800px" , height="400px"></canvas>
    <canvas id="ui" width="800px" , height="400px"></canvas>
    <!-- <div class="game-footer"></div> -->
  </div>
  <?php require 'footer.html'; ?>
</body>
<script type="module" src="./tour.js"></script>
<noscript>To play this game, please enable javascript for this site.</noscript>

</html>
