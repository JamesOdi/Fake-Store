import { Image } from 'react-native';

export default function ProductImage({ imageUrl, imageWidth }) {
  return (
    <Image
      source={{ uri: imageUrl, cache: 'only-if-cached' }}
      style={{
        width: imageWidth,
        height: imageWidth,
      }}
      resizeMode='contain'
    />
  );
}
