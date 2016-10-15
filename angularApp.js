var app = angular.module('MyNewApp', [])

app.factory('stats', [function() {
    var o = {
        statTitles: ['name', 'team', 'games', 'goals', 'assists'],
        playerStats: [
            {"fow%":"21.6","rank":"1","name":"Patrick Kane","year":"2015-16","team":"CHI","pos":"R","games":"82","goals":"46","assists":"60","points":"106","plus":"17","pim":"30","pt/g":"1.29","ppg":"17","ppp":"37","shg":"0","shp":"0","gwg":"9","otg":"1","s":"287","s%":"16","toi/g":"20:24","shifts/g":"24","_id":"58024f0696c4842bd080b5e4"},{"fow%":"47.3","rank":"2","name":"Jamie Benn","year":"2015-16","team":"DAL","pos":"L","games":"82","goals":"41","assists":"48","points":"89","plus":"7","pim":"64","pt/g":"1.09","ppg":"17","ppp":"30","shg":"2","shp":"5","gwg":"5","otg":"1","s":"247","s%":"16.6","toi/g":"20:01","shifts/g":"26.7","_id":"58024f0696c4842bd080b5e5"},{"fow%":"51.7","rank":"3","name":"Sidney Crosby","year":"2015-16","team":"PIT","pos":"C","games":"80","goals":"36","assists":"49","points":"85","plus":"19","pim":"42","pt/g":"1.06","ppg":"10","ppp":"24","shg":"0","shp":"0","gwg":"9","otg":"2","s":"248","s%":"14.5","toi/g":"20:28","shifts/g":"26.4","_id":"58024f0696c4842bd080b5e6"},{"fow%":"53","rank":"4","name":"Joe Thornton","year":"2015-16","team":"SJS","pos":"C","games":"82","goals":"19","assists":"63","points":"82","plus":"25","pim":"54","pt/g":"1","ppg":"8","ppp":"29","shg":"0","shp":"0","gwg":"6","otg":"0","s":"121","s%":"15.7","toi/g":"18:21","shifts/g":"23.9","_id":"58024f0696c4842bd080b5e7"},{"fow%":"0","rank":"5","name":"Erik Karlsson","year":"2015-16","team":"OTT","pos":"D","games":"82","goals":"16","assists":"66","points":"82","plus":"-2","pim":"50","pt/g":"1","ppg":"1","ppp":"26","shg":"0","shp":"0","gwg":"3","otg":"2","s":"248","s%":"6.5","toi/g":"28:58:00","shifts/g":"27.1","_id":"58024f0696c4842bd080b5e8"},{"fow%":"55","rank":"6","name":"Joe Pavelski","year":"2015-16","team":"SJS","pos":"C","games":"82","goals":"38","assists":"40","points":"78","plus":"25","pim":"30","pt/g":"0.95","ppg":"12","ppp":"28","shg":"0","shp":"0","gwg":"11","otg":"1","s":"224","s%":"17","toi/g":"19:48","shifts/g":"25.2","_id":"58024f0696c4842bd080b5e9"},{"fow%":"40","rank":"7","name":"Johnny Gaudreau","year":"2015-16","team":"CGY","pos":"L","games":"79","goals":"30","assists":"48","points":"78","plus":"4","pim":"20","pt/g":"0.99","ppg":"6","ppp":"21","shg":"0","shp":"0","gwg":"6","otg":"3","s":"217","s%":"13.8","toi/g":"19:55","shifts/g":"24.9","_id":"58024f0696c4842bd080b5ea"},{"fow%":"35.7","rank":"8","name":"Blake Wheeler","year":"2015-16","team":"WPG","pos":"R","games":"82","goals":"26","assists":"52","points":"78","plus":"8","pim":"49","pt/g":"0.95","ppg":"3","ppp":"17","shg":"2","shp":"4","gwg":"5","otg":"2","s":"256","s%":"10.2","toi/g":"19:47","shifts/g":"25.6","_id":"58024f0696c4842bd080b5eb"}
        ]
    };

    return o;
}])

app.controller('MainCtrl', [
    '$scope', 'stats',
    function($scope, stats) {
        $scope.statTitles = stats.statTitles;
        $scope.playerStats = stats.playerStats;

        $scope.orderStat = 'goals';
        $scope.sortReverse = true;
        $scope.changeSortTitle = function(newOrder) {
            if ($scope.orderStat === newOrder) {
                $scope.sortReverse = !$scope.sortReverse;
            }
            else {
                $scope.orderStat = newOrder;
                $scope.sortReverse = true;
            }
        };
        $scope.getOrderStat = function(val) {
            return val[$scope.orderStat];
        };
    }]);
            
