<?php
/**
 * Manages all theme inc
 *
 * @author philippLentzen
 */

namespace wpThemeTemplate\inc;


use wpThemeTemplate\inc\traits\Singleton;

class Theme {
	use Singleton;

	protected function __construct() {
		Menu::get_instance();

		$this->setup_hooks();
	}

	protected function setup_hooks() {
		// Register styles
		add_action( 'wp_enqueue_scripts', [ $this, 'register_styles' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ] );

		// Add theme supports
		add_action( 'after_setup_theme', [ $this, 'setup_theme_support' ] );
	}

	public function register_styles() {
		// Register
		wp_register_style( 'styling', get_stylesheet_uri(), [ 'font' ] );
		wp_register_style( 'font', 'https://fonts.googleapis.com/css2?family=Raleway:wght@500;700;900&display=swap' );

		// Enqueue
		wp_enqueue_style( 'styling' );
		wp_enqueue_style( 'font' );
	}

	public function register_scripts() {
		// Register
		wp_register_script( 'script', get_template_directory_uri() . '/script.js', [ 'jquery' ] );

		// Enqueue
		wp_enqueue_script( 'script' );
	}

	public function setup_theme_support() {
		// Title element
		add_theme_support( 'title-tag' );

		// Thumbnails for posts
		add_theme_support( 'post-thumbnails' );

		// Automatic add RSS feed links to head
		add_theme_support( 'automatic-feed-links' );

		// Activate html5
		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'script',
				'style',
			]
		);

		// Gutenberg editor
		add_theme_support( 'wp-block-styles' );

		// Styles
		add_theme_support( 'editor-styles' );
		add_editor_style( 'assets/css/style-editor.css' );
		remove_theme_support( 'core-block-patterns' );
	}
}