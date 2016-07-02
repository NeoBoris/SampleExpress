$(function() {
    var $main = $("#main");
    var years = $main.data('years');
    var expenses = $main.data('expenses');
    var expensesByYear = [];
    for (var i = 0; i < years.length; i++) {
        expensesByYear[i] = new Array(years[i], expenses[i]);
    }
    jQuery . jqplot(
        'jqPlot-sample',
        [
            expensesByYear
        ]
    );
});