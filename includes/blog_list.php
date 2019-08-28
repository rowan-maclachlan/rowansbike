<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>rowansbike | Blog</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<!-- Stylesheets -->
  <link href="/style/main.css" type="text/css" rel="stylesheet">
  <link href="/style/navbar.css" type="text/css" rel="stylesheet">
  <link href="/style/read-more.css" type="text/css" rel="stylesheet">
  <link href="/style/link-trans.css" type="text/css" rel="stylesheet">
  <link href="/style/content.css" type="text/css" rel="stylesheet">
  <link href="/style/blog.css" type="text/css" rel="stylesheet">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap" rel="stylesheet">
	<!-- Scripts -->
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
	<!--[if IE 6]>
	<script src="js/DD_belatedPNG_0.0.8a-min.js"></script>
	<script>
	  /* EXAMPLE */
	  DD_belatedPNG.fix('.button');
	  
	  /* string argument can be any CSS selector */
	  /* .png_bg example is unnecessary */
	  /* change it to what suits you! */
	</script>
	<![endif]-->
</head>

<body>
	<!-- Navigation Menu -->
  <cms:embed 'header.html' />
		
	<!-- Blog Post -->
	<cms:pages masterpage='blog.php' 
				folder=k_folder_name 
				start_on=k_archive_date 
				stop_before=k_next_archive_date 
				paginate='1' 
				limit='8' >
					
	<div class="post">
		<!-- Post Title -->
	  <div class="title-wrapper">
	    <h2 class="title">
        <a href="<cms:show k_page_link />"><cms:show k_page_title /></a>
      </h2>
    </div>
		<!-- Post Info -->
		<cms:if k_page_foldertitle >
			<cms:set my_category=k_page_foldertitle />
		<cms:else />
			<cms:set my_category='Uncategorised' />
		</cms:if>
    <cms:embed 'sub.php' />
		<!-- Post Image -->
    <div class="blog-image">
		  <img alt="<cms:show first_alt />" src="<cms:show first_image />" />
    </div>
		<!-- Post Content -->
    <div class="content">
		  <cms:excerptHTML count='75' ignore='img'><cms:show blog_content /></cms:excerptHTML>
    </div>
		<!-- Read More Button -->
    <div class="read-more link-trans">
      <a href="<cms:show k_page_link />">Read More...</a>
    </div>
	</div>
			
	<cms:if k_paginated_bottom >
		<!-- Blog Navigation -->
		<div class="blog_nav">
			<cms:if k_paginate_link_next >
      <div class="blog_nav_button link-trans" id="prev_posts">
				<a href="<cms:show k_paginate_link_next />">&lt;&lt; Older Posts</a>
      </div>
			</cms:if>
					
			<cms:if k_paginate_link_prev >
      <div class="blog_nav_button link-trans" id="next_posts">
				<a href="<cms:show k_paginate_link_prev />">Newer Posts >></a>
      </div>
			</cms:if>
		</div>
	</cms:if>
		
	</cms:pages >
		
	<!-- Column 2 / Sidebar -->
	<cms:embed 'blog_sidebar.html' />
		
  <!-- Footer -->
  <cms:embed 'footer.html' />
		
</body>
</html>
