<!DOCTYPE html>
<html>
  <head>
    <link href="/style/main.css" type="text/css" rel="stylesheet">
    <link href="/style/bike.css" type="text/css" rel="stylesheet">
    <link href="/style/navbar.css" type="text/css" rel="stylesheet">
    <link href="/style/content.css" type="text/css" rel="stylesheet">
    <link href="/style/link-trans.css" type="text/css" rel="stylesheet">
    <title>the-nova</title>
    <link 
      href="https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap" 
      rel="stylesheet">
  </head>
  <body>
    
    <?php require 'header.html'; ?>
      
    <div class="dividor-top"></div>
      <h1 id="title">
        <span>The Nova</span>
      </h1>
    <div class="dividor-bottom"></div>
    
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
      
    <div class="content">
      <?php include("origin.html"); ?>
    </div>

    <div class="dividor-top"></div>
    <h2>The Upgrades</h2>
    <div class="dividor-bottom"></div>
      
    <div class="content">
      <p></p>
    </div>
    
    <div class="dividor-top"></div>
    <h2>The Future</h2>
    <div class="dividor-bottom"></div>
    
    <div class="content">
      <p></p>
    </div>

    <?php require 'footer.html'; ?>

  </body>
</html>
<script> </script>
