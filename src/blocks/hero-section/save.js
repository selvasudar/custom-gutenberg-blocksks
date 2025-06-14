/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
export default function save({ attributes }) {
	const { title, description, mediaUrl } = attributes;
	const blockProps = useBlockProps.save();

	const heroStyle = {
		backgroundImage: `url(${mediaUrl})`,
	};

	return (
		<div {...blockProps} style={heroStyle} data-block="hero-section-selva">
			<div className="hero-section-overlay"></div>
			<div className="hero-section-content">
				<RichText.Content
					tagName="h2"
					value={title}
					className="hero-section-title"
				/>
				<RichText.Content
					tagName="p"
					value={description}
					className="hero-section-description"
				/>
			</div>
		</div>
	);
}
