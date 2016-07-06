$(function() {
    $('#btn').on('click', function(evt) {
        var url = '/result';
        var age = $('#age').val();
        var rent = $('#rentExpense').val();
        var loan = $('#loan').val();
        var rate = $('#rate').val();
        var year = $('#year').val();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {
                rent: rent,
                age: age,
                loan: loan * 10000,
                rate: rate / 100,
                year: year,
            },
            timeout: 100000,
            success: function (data) {
                if (data.errors) {
                    displayErrors(data.errors);
                    return;
                }
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
        var loanExpenses = data.loanExpenses;

        var trace = {
            name: "賃貸",
            x: years,
            y: expenses,
            type: 'lines+markers'
        };
        var trace2 = {
            name: "ローン",
            x: years,
            y: loanExpenses,
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

        var plotData = [trace, trace2];
        Plotly.newPlot('expenseGraph', plotData, layout);
    }

    function displayErrors(errors) {
        for (var i in errors) {
            alert(errors[i].msg + "(" + errors[i].value+ ")");
        }
    }
});