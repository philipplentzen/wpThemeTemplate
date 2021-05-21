<?php
/**
 * Manages all menu function
 *
 * @author philippLentzen
 */

namespace wpThemeTemplate\inc;


use wpThemeTemplate\inc\traits\Singleton;

class Menu {
	use Singleton;

	protected function __construct() {
		$this->setup_hooks();
	}

	protected function setup_hooks() {
		// Register menus
		add_action( 'init', [ $this, 'register_menus' ] );
	}

	public function register_menus() {
		register_nav_menus( [
			'plentzenTemplate-main-menu' => esc_html__( 'Main Menu', 'plentzenTemplate' ),
			'plentzenTemplate-footer-menu' => esc_html__( 'Footer Menu', 'plentzenTemplate' ),
		] );
	}
}