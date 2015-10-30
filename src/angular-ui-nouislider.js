'use strict';
angular.module('ui.nouislider', []).directive('nouiSlider', function() {
    return {
        restrict: 'AE',
        scope: {
            start: '@',
            min: '@',
            max: '@',
            step: '@',
            connect: '@',
            behaviour: '@',
            ngModel: '=',
            options: '='
        },
        link: function(scope, element, attributes) {
            var isMultiHandle = false;

            // Build up options to pass to nouislider from the scope
            var options = scope.options || {};

            if (!scope.start) {
                if (!options.start) {
                    options.start = [scope.min || 0];
                }
            } else if (!Array.isArray(scope.start)) {
                options.start = [scope.start];
            } else {
                options.start = scope.start;
                isMultiHandle = scope.start.length > 1;
            }

            if (scope.min
                && scope.max
                && (!scope.options || !scope.options.range)) {
                options.range = {
                    'min': [scope.min],
                    'max': [scope.max]
                };
            }

            if (scope.step) {
                options.step = step;
            }

            if (scope.connect) {
                options.connect = scope.connect;
            }

            if (scope.behaviour) {
                options.behaviour = scope.behaviour;
            }

            // create the slider
            noUiSlider.create(element, options);

            // bind the value to ngModel (two-way)
            element.noUiSlider.on('update', function(values, handle) {
                return scope.$apply(function() {
                    scope.ngModel = isMultiHandle ? values : values[handle];
                });
            });

            scope.$watch('ngModel', function (newValue) {
                slider.noUiSlider.set(newValue);
            });

            // if scope.options changes, recreate the slider with the new options
            scope.$watch('options', function(newOptions) {
                if (element.noUiSlider) {
                    var values = element.noUiSlider.get();
                    element.noUiSlider.destroy();

                    // if the new options don't specify start (or it's the same as the last time
                    // the slider was created), use the current slider value
                    if (!newOptions.start || angular.equals(newOptions.start == options.start)) {
                        newOptions.start = Array.isArray(values)
                            ? values
                            : [Number(values)];
                    } else {
                        isMultiHandle = Array.isArray(newOptions.start) && newOptions.start.length > 1;
                    }

                    // merge changes into the options object
                    angular.merge(options, newOptions);
                    noUiSlider.create(updateSlider, options);

                    element.noUiSlider.on('update', function(values, handle) {
                        return scope.$apply(function() {
                            scope.ngModel = isMultiHandle ? values : values[handle];
                        });
                    });
                }
            });
        }
    };
});