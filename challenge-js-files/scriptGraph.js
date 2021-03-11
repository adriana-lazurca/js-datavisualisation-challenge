// INSERT GRAPH

function createCanvasAfterElement(idElement, idCanvas) {
    var element = document.getElementById(idElement);
    var canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("id", idCanvas);
    canvasElement.setAttribute("style", "height: 200px;");
    element.insertAdjacentElement("afterend", canvasElement);
    return canvasElement;
}

var canvasElement = createCanvasAfterElement("firstHeading", "liveChart")

setInterval(function () {
    //Create the XHR Object with AJAX
    let xhr = new XMLHttpRequest;
    //Call the open function, GET-type of request, url, true-asynchronous
    xhr.open('GET', 'https://canvasjs.com/services/data/datapoints.php?date=' + new Date().getTime(), true);

    //call the onload 
    xhr.onload = function () {
        //check if the status is 200(means everything is okay)
        if (this.status === 200) {
            //return server response as an object with JSON.parse
            let dataFromArray = JSON.parse(this.responseText);

            let dataX = dataFromArray.map(subArray => subArray[0]);
            let dataY = dataFromArray.map(subArray => subArray[1]);

            var chartData = {
                labels: dataX,
                datasets: [{
                    label: 'Real-time Update',
                    data: dataY,
                    borderColor: generateRandomColor(),
                    borderWidth: 5,
                    fill: false
                }]
            }

            var liveChart = new Chart(canvasElement, {
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
        }
    }
    xhr.send();
}, 1000);


