<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://www.peterjohnhunt.com
 * @since      1.0.0
 *
 * @package    magic8
 * @subpackage magic8/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * @package    magic8
 * @subpackage magic8/public
 * @author     PeterJohn Hunt <info@peterjohnhunt.com>
 */
class magic8_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/magic8-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/min/magic8-public-min.js', array( 'jquery' ), $this->version, true );
		wp_localize_script( $this->plugin_name, 'magic8_ajax_vars', array('url' => admin_url( 'admin-ajax.php' ),'nonce' => wp_create_nonce( 'ajax-nonce' )));

	}

	public function magic8() {
		$nonce = $_POST['nonce'];
	    if ( ! wp_verify_nonce( $nonce, 'ajax-nonce' ) ){
	        die ( 'Nope!' );
	    }

		$name = ((isset($_REQUEST['name']) && $_REQUEST['name']) ? '_'.$_REQUEST['name'] : '');

	    $options = apply_filters( 'magic8_options'.$name, array());

	    $html = '';

	    foreach ($options as $option) {
	        $html .= '<li>'.$option.'</li>';
	    }

	    wp_send_json_success( array('html' => $html, 'count' => count($options)) );

	    exit;
	}

}
