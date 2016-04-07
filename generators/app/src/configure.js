'use strict';

/**
 * @param {!yeoman.Generator} KoaBP generator
 * @export
 */
module.exports = function(KoaBP) {
  /**
   * Writes metadata files and configures environment
   * @function
   */
  KoaBP.prototype.configuring = function() {
    this.fs.copy(
      this.templatePath('config/**'),
      this.destinationPath(),
      { globOptions:
        { dot: true
        }
      }
    );
    this.fs.copy(
      this.templatePath('lib/**'),
      this.destinationPath('lib/'),
      { globOptions:
        { dot: true
        }
      }
    );
  };
};
