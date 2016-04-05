'use strict';

module.exports = function(KoaBP) {
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
