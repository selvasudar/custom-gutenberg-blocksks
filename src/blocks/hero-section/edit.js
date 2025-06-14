/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json'; // Imports block.json
import save from './save'; // Import the save function

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 */
function Edit({ attributes, setAttributes }) {
	const { title, description, mediaUrl, mediaId } = attributes;
	const blockProps = useBlockProps();

	const onSelectMedia = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
		});
	};

	const onRemoveMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: 'https://placehold.co/1920x1080/4F46E5/FFFFFF?text=Upload+an+Image',
		});
	};

	const heroStyle = {
		backgroundImage: `url(${mediaUrl})`,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Background Settings', 'custom-gutenberg-blocks')}>
					<div className="editor-styles-wrapper">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								allowedTypes={['image']}
								value={mediaId}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{mediaId ? __('Change Image', 'custom-gutenberg-blocks') : __('Choose Image', 'custom-gutenberg-blocks')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{mediaId !== 0 && (
							<Button onClick={onRemoveMedia} isDestructive style={{ marginTop: '10px' }}>
								{__('Remove Image', 'custom-gutenberg-blocks')}
							</Button>
						)}
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} style={heroStyle}>
				<div className="hero-section-overlay"></div>
				<div className="hero-section-content">
					<RichText
						tagName="h2"
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
						placeholder={__('Enter title here...', 'custom-gutenberg-blocks')}
						className="hero-section-title"
					/>
					<RichText
						tagName="p"
						value={description}
						onChange={(newDescription) => setAttributes({ description: newDescription })}
						placeholder={__('Enter description here...', 'custom-gutenberg-blocks')}
						className="hero-section-description"
					/>
				</div>
			</div>
		</>
	);
}

// Register the block
registerBlockType(metadata.name, {
    edit: Edit,
    save: save, // Pass the imported save function
});
