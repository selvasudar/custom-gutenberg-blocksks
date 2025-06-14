/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import save from './save';

/**
 * The edit function describes the structure of your block in the editor.
 */
function Edit({ attributes, setAttributes }) {
	const { title, isOpenOnLoad } = attributes;
	const blockProps = useBlockProps({ className: 'cgb-accordion-item' });

	// Use local state for the editor toggle, separate from the saved attribute.
	const [isEditorOpen, setEditorOpen] = useState(isOpenOnLoad);

	const TEMPLATE = [
		['core/paragraph', { placeholder: 'Add content for the accordion body...' }],
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Settings', 'custom-gutenberg-blocks')}>
					<ToggleControl
						label={__('Open by default?', 'custom-gutenberg-blocks')}
						help={
							isOpenOnLoad
								? __('The accordion will be open when the page loads.')
								: __('The accordion will be closed when the page loads.')
						}
						checked={isOpenOnLoad}
						onChange={(value) => setAttributes({ isOpenOnLoad: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="cgb-accordion-title" onClick={() => setEditorOpen(!isEditorOpen)}>
					<RichText
						tagName="span"
						className="cgb-accordion-title-text"
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
						placeholder={__('Enter accordion title...', 'custom-gutenberg-blocks')}
					/>
					<span className={`cgb-accordion-icon ${isEditorOpen ? 'is-open' : ''}`}></span>
				</div>
				{isEditorOpen && (
					<div className="cgb-accordion-content">
						<InnerBlocks template={TEMPLATE} />
					</div>
				)}
			</div>
		</>
	);
}

// Register the block
registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
