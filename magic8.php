<?php

/**
 * @link              http://www.peterjohnhunt.com
 * @since             1.0.0
 * @package           magic8
 *
 * @wordpress-plugin
 * Plugin Name:       Magic8
 * Plugin URI:        https://github.com/peterjohnhunt/magic8
 * Description:       Developer input suggestions plugin for easy customizable autofilling
 * Version:           1.0.0
 * Author:            PeterJohn Hunt
 * Author URI:        http://www.peterjohnhunt.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       magic8
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-magic8-activator.php
 */
function activate_magic8() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-magic8-activator.php';
	magic8_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-magic8-deactivator.php
 */
function deactivate_magic8() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-magic8-deactivator.php';
	magic8_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_magic8' );
register_deactivation_hook( __FILE__, 'deactivate_magic8' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-magic8.php';

/**
 * Begins execution of the plugin.
 *
 * @since    1.0.0
 */
function run_magic8() {

	$plugin = new magic8();
	$plugin->run();

}
run_magic8();
