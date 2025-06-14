/**
 * WordPress dependencies
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the frontend markup.
 *
 * We are using the native HTML <details> and <summary> elements for a
 * JavaScript-free, accessible accordion.
 */
export default function save({ attributes }) {
	const { title, isOpenOnLoad } = attributes;
	const blockProps = useBlockProps.save({
		className: 'cgb-accordion-item',
	});

	return (
		<details {...blockProps} open={isOpenOnLoad}>
			<summary className="cgb-accordion-title">
				<RichText.Content
					tagName="span"
					className="cgb-accordion-title-text"
					value={title}
				/>
				<span className="cgb-accordion-icon"></span>
			</summary>
			<div className="cgb-accordion-content">
				<InnerBlocks.Content />
			</div>
		</details>
	);
}
