/**
 * This is the main entry point for the plugin's JavaScript.
 *
 * It imports all the blocks from the `blocks` directory so that
 * webpack can process them.
 *
 * When a new block is created, it needs to be imported here.
 */

// Import the Hero Section block
import './blocks/hero-section/edit';
import './blocks/hero-section/style.scss';
import './blocks/hero-section/editor.scss';
// Import the Accordion block
import './blocks/accordion/edit';
import './blocks/accordion/style.scss';
import './blocks/accordion/editor.scss';

import './blocks/cental-features/edit';
import './blocks/cental-features/style.scss';
import './blocks/cental-features/editor.scss';
