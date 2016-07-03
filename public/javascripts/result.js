$(function() {
    var $main = $("#main");
    var years = $main.data('years');
    var expenses = $main.data('expenses');

    var trace = {
        x: years,
        y: expenses,
        type: 'lines+markers'
    };

    var layout = {
        title:'家賃総支払い額',
        xaxis: {
            title: '年齢'
        },
        yaxis: {
            title: '家賃総支払い額'
        },
        height: 400,
        width: 480
    };

    var data = [trace];
    Plotly.newPlot('myDiv', data, layout);
});