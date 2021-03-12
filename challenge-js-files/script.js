//CREATE CHART I
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

function getYears(tableId) {
    let rows = document.querySelectorAll(`#${tableId} tbody tr`);
    let yearsRow = rows[0];
    let yearsCells = yearsRow.querySelectorAll("th");

    var years = [];

    for (let indexCell = 0; indexCell < yearsCells.length; indexCell++) {
        let cell = yearsCells[indexCell];
        let cellValue = parseInt(cell.innerHTML);

        var isNumber = !isNaN(cellValue);
        if (isNumber) {
            years.push(cellValue);
        }
    }
    return years;
}

function readCountries(tableId) {
    var rows = document.querySelectorAll(`#${tableId} tbody tr`);
    var countries = [];
    for (let indexRow = 1; indexRow < rows.length; indexRow++) {
        var country = getCountryFromRow(rows[indexRow]);
        countries.push(country);
    }
    return countries;
}

var years = getYears("table1");

var countries = readCountries("table1");

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

//create Canvas
function createCanvasBeforeElement(idElement, idCanvas) {
    var element = document.getElementById(idElement);
    var canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("id", idCanvas);
    canvasElement.setAttribute("style", "height: 400px;");
    element.parentNode.insertBefore(canvasElement, element);
    return canvasElement;
}

var crimesChartCanvas = createCanvasBeforeElement("table1", "crimesChart");

//create chart
var crimesChart = new Chart(crimesChartCanvas, {
    type: 'line',
    data: chartData,
    pointBackgroundColor: "black",
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            onClick: function (event, legendItem) {
                var otherCountries = crimesChart.data.datasets.filter(country => country.label != legendItem.text);
                var displayedCountry = crimesChart.data.datasets.find(country => country.label == legendItem.text);
                displayedCountry.hidden = false;

                otherCountries.forEach(country => {
                    country.hidden = true;
                });
                crimesChart.update();
            }
        }

    }
});


//CREATE CHART II

//read table and get data
function getYearsHomicide(tableId) {
    let rows = document.querySelectorAll(`#${tableId} thead tr`);
    let yearsRow = rows[0];
    let yearsCells = yearsRow.querySelectorAll("th");

    var years = [];

    for (let indexCell = 2; indexCell < yearsCells.length; indexCell++) {
        let cell = yearsCells[indexCell];
        let cellValue = cell.innerHTML;

        years.push(cellValue);
    }
    return years;
}

function getCountryFromRowHomicide(row) {
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

function readCountriesHomicide(tableId) {
    var rows = document.querySelectorAll(`#${tableId} tbody tr`);
    var countries = [];
    for (let indexRow = 0; indexRow < rows.length; indexRow++) {
        var country = getCountryFromRowHomicide(rows[indexRow]);
        countries.push(country);
    }
    return countries;
}

var yearsHomicide = getYearsHomicide("table2");
var countriesHomicide = readCountriesHomicide("table2");

var chartDataHomicide = {
    labels: yearsHomicide,
    datasets: generateLinesChart(countriesHomicide)
}

//create Canvas
var homicideChartCanvas = createCanvasBeforeElement("table2", "crimesChartHomicide");

//create chart
var homicideChart = new Chart(homicideChartCanvas, {
    type: 'bar',
    data: chartDataHomicide,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            onClick: function (event, legendItem) {
                var otherCountries = homicideChart.data.datasets.filter(country => country.label != legendItem.text);
                var displayedCountry = homicideChart.data.datasets.find(country => country.label == legendItem.text);
                displayedCountry.hidden = false;

                otherCountries.forEach(country => {
                    country.hidden = true;
                });
                homicideChart.update();
            }
        }



    }
});


