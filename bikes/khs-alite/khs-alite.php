<!DOCTYPE html>
<html>
  <head>
    <link href="/style/main.css" type="text/css" rel="stylesheet">
    <link href="/style/bike.css" type="text/css" rel="stylesheet">
    <link href="/style/navbar.css" type="text/css" rel="stylesheet">
    <link href="/style/content.css" type="text/css" rel="stylesheet">
    <link href="/style/link-trans.css" type="text/css" rel="stylesheet">
    <title>the-khs-alite-100</title>
    <link 
      href="https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap" 
      rel="stylesheet">
  </head>
  <body>
    
    <?php require 'header.html'; ?>
      
    <div class="dividor-top"></div>
      <h1 id="title">
        <span>The KHS Alite 100</span>
      </h1>
    <div class="dividor-bottom"></div>
    
    <div class=intro_image>
      <img src="/resources/photos/khs/khs.full.low.jpg"
           srcset="/resources/photos/khs/khs.full.low.jpg 600w,
                   /resources/photos/khs/khs.full.med.jpg 900w,
                   /resources/photos/khs/khs.full.high.jpg 1200w"
           title="The KHS Alite 100"
           alt="A photo of the KHS Alite 100.">
    </div>

    <div class="dividor-top"></div>
    <h2>The Origin</h2>
    <div class="dividor-bottom"></div>

    <div class="content">
      <?php include("origin.html"); ?>
    </div>
      
    <div class="dividor-top"></div>
    <h2>The Upgrades</h2>
    <div class="dividor-bottom"></div>
      
    <div class="content">
      <?php include("upgrades.html"); ?>
    </div>
        
    <div class="dividor-top"></div>
    <h2>The Future</h2>
    <div class="dividor-bottom"></div>
    
    <div class="content">
      <?php include("future.html"); ?>
    </div>
  </body>

  <?php require 'footer.html'; ?>

</html>
<script> </script>
