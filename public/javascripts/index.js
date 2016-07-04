$(function() {
    $('#btn').on('click', function(evt) {
        var url = '/result';
        var age = $('#age').val();
        var rent = $('#rentExpense').val();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {
                rent: rent,
                age: age,
            },
            timeout: 100000,
            success: function (data) {
                updateExpenseGraph(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error");    
            }
        });
    });

    function updateExpenseGraph(data) {
        var years = data.years;
        var expenses = data.expenses;

        var trace = {
            x: years,
            y: expenses,
            type: 'lines+markers'
        };

        var layout = {
            title:'総支払い額',
            xaxis: {
                title: '年齢'
            },
            yaxis: {
                title: '総支払い額'
            },
            height: 400,
            width: 480
        };

        var plotData = [trace];
        Plotly.newPlot('expenseGraph', plotData, layout);
    }
});