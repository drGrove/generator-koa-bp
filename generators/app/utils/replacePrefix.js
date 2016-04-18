'use strict';

/**
 * Replace sourceFolder with destFolder in filePath
 * if filePath has an soureFolder as prefix
 * choose longest match if there are mutliple prefixes that match
 * @param {string} filePath File path to be altered
 * @param {object} folderPairs Hash of pairs of sourceFolder:destFolder
 * @return {string} new file path
 */
/* istanbul ignore next */
module.exports = function replacePrefix(filePath, folderPairs) {
  var bestMatch = '';
  console.log('pairs: ', folderPairs);
  folderPairs.forEach(function(destFolder, sourceFolder) {
    if (filePath.indexOf(sourceFolder) === 0 && sourceFolder.length > bestMatch.length) {
      bestMatch = sourceFolder;
    }
  });

  if (bestMatch.length) {
    return filePath.replace(bestMatch, folderPairs[bestMatch]);
  } else {
    return filePath;
  }
};
