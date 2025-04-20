import { Dimensions } from 'react-native';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeFirstLetterOfEachWord(string) {
  return string
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}

export function getDeviceWidth() {
  return Dimensions.get('window').width;
}

export function getDeviceHeight() {
  return Dimensions.get('window').height;
}
