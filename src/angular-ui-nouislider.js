'use strict';
angular.module('ui.nouislider', []).directive('nouiSlider', function() {
    return {
        restrict: 'A',
        scope: {
            start: '@',
            min: '@',
            max: '@',
            step: '@',
            connect: '@',
            behaviour: '@',
            orientation: '@',
            ngModel: '=',
            options: '='
        },
        link: function(scope, element, attributes) {
            var slider = element[0];
            var isMultiHandle = false;
            var options = scope.options || {};

            if (!scope.start) {
                if (!options.start) {
                    options.start = Number(scope.min) || 0;
                }
            } else if (!Array.isArray(scope.start)) {
                options.start = Number(scope.start);
            } else {
                options.start = scope.start;
                isMultiHandle = scope.start.length > 1;
            }

            if (scope.min
                && scope.max
                && (!scope.options || !scope.options.range)) {
                options.range = {
                    'min': Number(scope.min),
                    'max': Number(scope.max)
                };
            }

            if (scope.step)
                options.step = Number(scope.step);

            if (scope.connect)
                options.connect = scope.connect;

            if (scope.behaviour)
                options.behaviour = scope.behaviour;

            if (scope.orientation)
                options.orientation = scope.orientation;

            // create the slider
            noUiSlider.create(slider, options);

            // bind the value to ngModel (two-way)
            var onUpdate = function(values, handle) {
                scope.$apply(function() {
                    scope.ngModel = isMultiHandle ? values : Number(values[handle]);
                });
            };
            slider.noUiSlider.on('slide', onUpdate);

            scope.$watch('ngModel', function (newValue) {
                if (newValue) {
                    var values = slider.noUiSlider.get();
                    if (!Array.isArray(values)) {
                        values = Number(values);
                    }
                    if (!angular.equals(values, newValue)) {
                        slider.noUiSlider.set(newValue);
                    }
                }
            });

            // if scope.options changes, recreate the slider with the new options
            scope.$watch('options', function(newOptions) {
                if (newOptions && slider.noUiSlider) {
                    var values = slider.noUiSlider.get();
                    slider.noUiSlider.destroy();

                    // if the new options don't specify start (or it's the same as the last time
                    // the slider was created), use the current slider value
                    if (!newOptions.start || angular.equals(newOptions.start == options.start)) {
                        newOptions.start = Array.isArray(values)
                            ? values
                            : [Number(values)];
                    } else {
                        isMultiHandle = Array.isArray(newOptions.start) && newOptions.start.length > 1;
                    }

                    // merge changes into the options object and recreate the slider
                    angular.merge(options, newOptions);
                    noUiSlider.create(slider, options);
                    slider.noUiSlider.on('slide', onUpdate);
                }
            });
        }
    };
});
