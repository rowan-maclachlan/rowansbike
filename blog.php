<?php require_once( 'couch/cms.php' ); ?>
<cms:template title='Blog' clonable='1' commentable='1'>
	<cms:editable name='blog_content' type='richtext' />
	
	<cms:editable name='blog_image'
		crop='1'
		width='610'
		height='150'
		type='image'
	/>
	
	<cms:folder name="touring" title="Bicycle Touring" />
	
</cms:template>

<cms:if k_is_page >
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>rowansbike | blog</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<!-- Stylesheets -->
	<link rel="stylesheet" href="/style/main.css" />
	<link rel="stylesheet" href="/style/blog.css" />

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
    <?php require 'header.html'; ?>
		
		<!-- Column 1 /Content -->
		<!-- Blog Post -->
		<div class="post">
			<!-- Post Title -->
			<h3 class="title"><a href="<cms:show k_page_link />"><cms:show k_page_title /></a></h3>
			<!-- Post Title -->
			<cms:if k_page_foldertitle >
				<cms:set my_category=k_page_foldertitle />
			<cms:else />
				<cms:set my_category='Uncategorised' />
			</cms:if>
      <p class="sub">
        <a href="#"><cms:show my_category /></a> &bull; <cms:date k_page_date format='jS M, y'/> &bull; <a href="#"><cms:show k_comments_count /> Comments</a>
      </p>
			<!-- Post Title -->
			<img class="thumb" src="<cms:show blog_image />" alt=""/>
			<!-- Post Content -->
			<cms:show blog_content />
			<!-- Post Links -->
			<div>
				<a href="<cms:link masterpage='blog.php' />">Back to Blog</a>
				<a href="#commentform">Discuss this post</a>
      </div>
    </div>
			
			<!-- Comment's List -->
			<h3>Comments</h3>
			
			<cms:if k_comments_count >
			<ol class="commentlist">
				<cms:comments page_id=k_page_id order='asc' limit='5' paginate='1' >
				<li class="comment"> 
					<div class="gravatar"> 
						<cms:gravatar email="<cms:show k_comment_author_email />" size="60" />
						<a name="<cms:show k_comment_anchor />">
					</div> 
					<div class="comment_content"> 
						<div class="clearfix">
							<cite class="author_name"><a href=""><cms:show k_comment_author /></a></cite>       
							<div class="comment-meta commentmetadata"><cms:date k_comment_date format='F j, Y'/> at <cms:date k_comment_date format='h:ia'/></a></div> 
						</div>
						<div class="comment_text"> 
							<p><cms:show k_comment /></p> 
						</div> 
					</div> 
				</li> 
				<cms:paginator />
				</cms:comments>
			</ol> 
			<cms:else />
				No comments.
			</cms:if>
			
			<!-- Comment Form -->
			<cms:embed 'comments_form.html' />

		</div>
	
		<!-- Column 2 / Sidebar -->
		<cms:embed 'blog_sidebar.html' />
		
		<!-- Footer -->
    <?php require 'footer.html'; ?>
	</div><!--end wrapper-->

</body>
</html>
<cms:else />
	<cms:embed 'blog_list.php' />
</cms:if>

<?php COUCH::invoke(); ?>