
import {utilify} from '../utils/vendor.utilify';
import vtexHelpers from '../utils/vtex-helpers';

const globalHelpers = utilify.globalHelpers;

if ( typeof window !== 'object' ) {
  global.window = global;
  global.window.navigator = {};
}

if ( 'rivets' in window ) {
  rivets.formatters.formatPrice = (target) => vtexHelpers.formatPrice(target);
  rivets.formatters.getResizedImage = (src, width, height) => vtexHelpers.getResizedImage(src, width, height);
  rivets.formatters.getResizedImageByRatio = (src, type, newSize, aspectRatio) => vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
  rivets.formatters.replaceBreakLines = (target) => vtexHelpers.replaceBreakLines(target);
  rivets.formatters.prefix = (val, prefix) => prefix + val;
  rivets.formatters.slugifyText = (val) => globalHelpers.slugifyText(val);

  rivets.formatters.productImgSize = rivets.formatters.getResizedImage;
  rivets.formatters.getResizeImage = rivets.formatters.getResizedImage;
  rivets.formatters.getResizeImageByRatio = rivets.formatters.getResizedImageByRatio;
  rivets.formatters.productImgSizeByRatio = rivets.formatters.getResizedImageByRatio;
}
