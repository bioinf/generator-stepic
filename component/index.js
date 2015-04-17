'use strict';
var util = require('util');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var fs = require('fs');


var ComponentGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.log('Hi! Let\'s create a component.');

    this.on('end', function () {
      this.log('All done!');
      this.log(chalk.yellow('Don\'t forget to add component files to one of builds (coffee/app/coffee/builds)'));
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    var prompts = [{
      name: 'name',
      message: 'Enter new component\'s name:',
      filter: function( val ) { return val.trim().replace(' ', '-').replace(/(^-|-$)/g, ''); },
      validate: function(value) {
        value = value.trim().replace(' ', '-');
        if (value.match(/([\da-z]+-)+[\da-z]+/i)){
          return true;
        } else {
          return "Wrong naming. Example: `cool-component`";
        }
      }
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.slug_name = this._.slugify(props.name);
      this.class_name = this._.classify(this.slug_name);

      done();
    }.bind(this));
  },

  files: function () {
    var path = 'coffee/app/components/' + this.slug_name + '/';
    this.mkdir(path);
    this.template('component.coffee', path + this.slug_name + '.coffee');
    this.template('component-test.coffee', path + this.slug_name + '-test.coffee');
    this.template('style.scss', path + this.slug_name + '.scss');
    this.template('template.hbs.ignore', path + this.slug_name + '.hbs.ignore');
    fs.appendFileSync('scss/all_styles.scss', '@import "' + path + this.slug_name + '.scss";\n');
    // this.log(this.name);
  }
});

module.exports = ComponentGenerator;
