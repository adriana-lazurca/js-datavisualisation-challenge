function getCountryFromRow(row) {
    let cells = row.querySelectorAll('td');

    var country = {
        name: cells[0].innerText,
        crimesNr: []
    };

    for (let indexCell = 1; indexCell < cells.length; indexCell++) {
        let cell = cells[indexCell];
        let cellValue = parseInt(cell.innerHTML);
        country.crimesNr.push(cellValue);
    }

    return country;
}

function getYearsFromRow(row) {
    let cells = row.querySelectorAll('th');
    var years = [];

    for (let indexCell = 2; indexCell < cells.length; indexCell++) {
        let cell = cells[indexCell];
        let cellValue = parseInt(cell.innerHTML);
        years.push(cellValue);
    }
    return years;
}

var countries = [];
var years = [];

function readTable(tableId) {
    var rows = document.querySelectorAll(`#${tableId} tr`);
    for (let indexRow = 1; indexRow < rows.length; indexRow++) {
        if (indexRow > 1) {
            var country = getCountryFromRow(rows[indexRow]);
            countries.push(country);
        }
        else {
            years = getYearsFromRow(rows[indexRow]);
        }
    }
}

readTable("table1");

function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function generateLinesChart(array) {
    var chartDataSets = [];

    for (let i = 0; i < array.length; i++) {
        var objectChart = {
            label: array[i].name,
            data: array[i].crimesNr,
            borderColor: generateRandomColor(),
            borderWidth: 1,
            fill: false
        };
        chartDataSets.push(objectChart);
    }
    return chartDataSets;
}

var chartData = {
    labels: years,
    datasets: generateLinesChart(countries)
}

// chart
var crimesChartElement = document.getElementById('crimesChart');

var crimesChart = new Chart(crimesChartElement, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]

        }
    }
});
