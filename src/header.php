<?php
/**
 * Header
 *
 * @author philippLentzen
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( "charset" ); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
}
?>
<header>
    <div class="logo">
        <div>LOGO</div>
    </div>
    <button id="full-page-navigation">
        <span></span>
        <span></span>
        <span></span>
    </button>
	<?php wp_nav_menu( [
		'theme_location'  => 'plentzenTemplate-main-menu',
		'container'       => 'nav',
		'container_class' => 'header',
		'container_id'    => 'main-menu',
		'menu_id'         => '',
		'menu_class'      => 'menu-list'
	] ) ?>
</header>
<main>
