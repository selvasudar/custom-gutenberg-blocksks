// edit.js
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import { registerBlockType } from '@wordpress/blocks';

function Edit({ attributes, setAttributes }) {
  const { heading, description, imageUrl } = attributes;
  const blockProps = useBlockProps();

  const onSelectImage = (media) => {
    setAttributes({ imageUrl: media.url });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Feature Image', 'custom-gutenberg-blocks')}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={["image"]}
              render={({ open }) => (
                <Button onClick={open} isPrimary>
                  {__('Choose/Replace Image', 'custom-gutenberg-blocks')}
                </Button>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps} className="features-section">
        <div className="text-center">
          <RichText
            tagName="h1"
            value={heading}
            onChange={(val) => setAttributes({ heading: val })}
            placeholder={__('Enter heading...', 'custom-gutenberg-blocks')}
            className="features-heading"
          />
          <RichText
            tagName="p"
            value={description}
            onChange={(val) => setAttributes({ description: val })}
            placeholder={__('Enter description...', 'custom-gutenberg-blocks')}
            className="features-description"
          />
        </div>
        <div className="feature-image">
          <img src={imageUrl} alt="Feature" />
        </div>
      </div>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save,
});