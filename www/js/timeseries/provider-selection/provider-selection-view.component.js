angular.module('n52.core.timeseries')
    .component('swcProviderSelectionView', {
        template: require('./provider-selection-view.component.html'),
        controller: ['settingsService', 'providerSelection', '$state', 'previousTimeseriesState',
            function(settingsService, providerSelection, $state, previousTimeseriesState) {

                this.selectedProvider = providerSelection.selectedProvider;

                var createFilter = () => {
                    var filter = {
                        valueTypes: 'quantity'
                    };
                    return filter;
                };

                this.$onInit = () => {
                    this.providerList = settingsService.restApiUrls;
                    this.providerBlacklist = settingsService.providerBlackList;
                    this.providerFilter = createFilter();
                };

                this.providerSelected = (provider) => {
                    providerSelection.selectProvider(provider);
                    if (previousTimeseriesState.state) {
                        $state.go(previousTimeseriesState.state);
                    } else {
                        $state.go('timeseries.map-selection');
                    }
                };
            }
        ]
    })
    .service('providerSelection', ['statusService',
        function(statusService) {
            var timeseriesProviderStatusParameter = 'timeseriesProvider';

            this.selectedProvider = statusService.status[timeseriesProviderStatusParameter];

            this.selectProvider = (provider) => {
                this.selectedProvider = provider;
                statusService.status[timeseriesProviderStatusParameter] = provider;
            };
        }
    ]);
