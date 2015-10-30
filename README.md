# angular-ui-nouislider
Angular directive for the nouislider control (http://refreshless.com/nouislider)

### Requires:
* angular ~1.4.0
* nouislider ~8.1.0

### Example:
```
  angular.module('yourApp', ['ui.nouislider']);
  
  <div noui-slider ng-model="ctrl.boundValue" min="0" max="100"></div>
```

### Installation:
* Install from Bower with `bower install angular-ui-nouislider`
* Add scripts and styles to your html:
```
<link rel="stylesheet" href="bower_components/nouislider/distribute/nouislider.min.css" />
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/nouislider/distribute/nouislider.js"></script>
<script src="bower_components/angular-ui-nouislider/src/angular-ui-nouislider.js"></script>
```
* Add the dependency `ui.nouislider` to your angular module:
```
var app = angular.module('yourApp', ['ui.nouislider']);
```

### Attributes:
* ng-model : number or Array of number : binds to the value of the slider. If there are two handles, this will be an array with the two values in
* start : number or Array of number : the starting value of the slider. This can be an array of two numbers to specify a two-handled slider.
* min : number : min value of slider
* max : number : max value of slider
* step : number : step for slider
* connect: as per noui docs
* behaviour: as per noui docs
* orientation: as per noui docs
* options: this will be passed directly as the settings to noui, but other attributes will take precedence values in here

