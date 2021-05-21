<?php
/**
 * theme inc
 *
 * @author philippLentzen
 */

if ( ! defined( "THEME_DIR_PATH" ) ) {
	define( "THEME_DIR_PATH", untrailingslashit( get_template_directory() ) );
}

require_once THEME_DIR_PATH . "/inc/helpers/autoloader.php";

function get_theme_instance() {
	\wpThemeTemplate\inc\Theme::get_instance();
}

get_theme_instance();