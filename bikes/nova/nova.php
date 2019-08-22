<!DOCTYPE html>
<html>
  <head>
    <link href="/style/main.css" type="text/css" rel="stylesheet">
    <link href="/style/bike.css" type="text/css" rel="stylesheet">
    <title>the-nova</title>
  </head>
  <body>
    
    <?php require 'header.html'; ?>
      
    <div class="bike-title-wrapper">
      <div id="dividor-top-title"></div>
      <h1 id="title">
          The Nova
      </h1>
      <div id="dividor-bottom-title"></div>
    </div>
    
    <div class=intro_image>
      <img src="/resources/photos/nova/nova.full.low.jpg"
           srcset="/resources/photos/nova/nova.full.low.jpg 600w,
                   /resources/photos/nova/nova.full.med.jpg 900w,
                   /resources/photos/nova/nova.full.high.jpg 1200w"
           title="The Nova"
           alt="A photo of the Nova.">
    </div>

    <div class="dividor-top"></div>
    <h2>The Origin</h2>
    <div class="dividor-bottom"></div>
      
    <div class="bike-content">
      <?php require 'origin.html'; ?>
    </div>

    <div class="dividor-top"></div>
    <h2>The Upgrades</h2>
    <div class="dividor-bottom"></div>
      
    <div class="bike-content">
      <p></p>
    </div>
    
    <div class="dividor-top"></div>
    <h2>The Future</h2>
    <div class="dividor-bottom"></div>
    
    <div class="bike-content">
      <p></p>
    </div>
  </body>
</html>
<script> </script>