import { Asset, Font } from 'expo';
import { Image } from 'react-native';

export default function cacheAssetsAsync({ files = [], fonts = [] }) {
  return Promise.all([...cacheFiles(files), ...cacheFonts(fonts)]);
}
function cacheFiles(files) {
  return files.map(file => {
    if (typeof file === 'string') {
      return Image.prefetch(file);
    } else {
      return Asset.fromModule(file).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
