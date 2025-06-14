<?php
/**
 * Plugin Name:       Custom Gutenberg Blocks
 * Description:       A plugin to add custom Gutenberg blocks with a scalable structure.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           1.0
 * Author:            Selvakumar Duraipandian
 * Author URI:		  https://linkedin.com/in/selvakumarduraipandian
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-gutenberg-blocks
 *
 * @package           custom-gutenberg-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * This function also registers the blocks themselves, making sure the editor script
 * and styles are associated with each block.
 */
function cgb_register_all_blocks() {

	// 1. Find the asset file.
	$script_asset_path = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm install` and `npm run build` for the "Custom Gutenberg Blocks" plugin first.'
		);
	}
	$script_asset = require $script_asset_path;

	// 2. Register the main script for the editor.
	wp_register_script(
		'cgb-block-editor-script', // A unique handle for our script.
		plugins_url( 'build/index.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	// 3. Register the main stylesheet for the editor and frontend.
	wp_register_style(
		'cgb-block-style', // A unique handle for our stylesheet.
		plugins_url( 'build/index.css', __FILE__ ),
		[], // No dependencies.
		$script_asset['version']
	);

	// 4. Scan the 'src/blocks' directory and register each block.
	$blocks_dir = plugin_dir_path( __FILE__ ) . 'src/blocks/';
	if ( ! is_dir( $blocks_dir ) ) {
		return;
	}

	$block_folders = scandir( $blocks_dir );
	foreach ( $block_folders as $folder ) {
		if ( '.' === $folder || '..' === $folder ) {
			continue;
		}

		$block_path = $blocks_dir . $folder;
		if ( is_dir( $block_path ) ) {
			// 5. Register the block and associate it with our registered script and style.
			// This tells WordPress that when this block is used, it needs to load our main JS and CSS files.
			register_block_type(
				$block_path,
				[
					'editor_script' => 'cgb-block-editor-script', // The handle of our script.
					'style'         => 'cgb-block-style',         // The handle of our style.
					'editor_style'  => 'cgb-block-style',         // Use the same style for the editor.
				]
			);
		}
	}
}
add_action( 'init', 'cgb_register_all_blocks' );
