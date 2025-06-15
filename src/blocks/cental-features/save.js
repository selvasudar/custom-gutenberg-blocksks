// save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { heading, description, imageUrl } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} className="features-section">
      <div className="text-center">
        <RichText.Content tagName="h1" value={heading} className="features-heading" />
        <RichText.Content tagName="p" value={description} className="features-description" />
      </div>
      <div className="feature-image">
        <img src={imageUrl} alt="Feature" />
      </div>
    </div>
  );
}
