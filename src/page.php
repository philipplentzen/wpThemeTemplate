<?php
/**
 * Page
 *
 * @author philippLentzen
 */

get_header();

if ( have_posts() ) :
	echo is_front_page() ? "true" : "false";
	while ( have_posts() ): the_post();
		the_title( '<h1>', '</h1>' );
		the_content();
	endwhile;
else :
	_e( 'Sorry, no posts matched your criteria.', 'textdomain' );
endif;

get_footer();
?>

