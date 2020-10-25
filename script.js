const currencySelect = document.getElementById('select');
const input = document.querySelector('.input');

let dateForChart = [];
let dateForTable = [];
let temp = [];
let currencyForChart = [];
let currencyForTable = [];
let nameCurrency = ['.USD', '.EUR', '.RUB']
let currencyUSDForChart = [];
let currencyEURForChart = [];
let currencyRUBForChart = [];
let currencyArrForChart = [];
let currencyUSDArrForChart = [];
let currencyEURArrForChart = [];
let currencyRUBArrForChart= [];
let currencyUSDForTable = [];
let currencyEURForTable= [];
let currencyRUBForTable = [];
let currencyArrForTable = [];
let currencyUSDArrForTable = [];
let currencyEURArrForTable = [];
let currencyRUBArrForTable = [];

const PROXY = 'https://cors-anywhere.herokuapp.com/',
    URL = 'https://www.nbrb.by/api/exrates/rates/'

const changeCurrency = select => {
    let index = select.selectedIndex;
    return select.options[index].value;
}

const getData = async (url, callback) => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);

    xhr.addEventListener('load', () => {

		if (xhr.status === 200) {
			callback(xhr.response);
		} else {
			console.log(xhr.status);
		}

	});

	xhr.send();
}

const getDate = () => {
    let today = new Date();
    
    let trueDate = dateHandling(today);

    dateForChart.push(trueDate);
    dateForTable.push(trueDate);

    for(let i = 0; i < 6; i++){
        today.setTime(today.getTime() - 24*60*60*1000);
        trueDate = dateHandling(today);
        dateForChart.push(trueDate);
        dateForTable.push(trueDate);
    }
    
}

const dateHandling = date => {
    let transformDate = new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    let transformDay = transformDate.slice(0, 2);
    let transformMonth = transformDate.slice(3, 5);
    let transformYear = transformDate.slice(6);

    return `${transformYear}-${dateCheck(transformMonth)}-${dateCheck(transformDay)}`;
}

const dateCheck = n => {
    if(n[0] === '0') {
        return n[1];
    } else return n;
}

const maxMinFind = elements => {
    let min = null,
        max = null;
    elements.forEach(element => {
        let number = parseFloat(element.textContent, 10);
        if(max === null || max < number){
            max = number
        }

        if(min === null || min > number){
            min = number
        }
    })
    let minStr = min.toString();
    let maxStr = max.toString();
    elements.forEach(element => {
        if(element.textContent === minStr){
            element.classList.add('min');
        }

        if(element.textContent === maxStr){
            element.classList.add('max');
        }
    })
}

const drawChart = (nameCarrency, labels, currency) => {

    if(nameCarrency === '145'){
        let ctx = chart.getContext('2d');
        let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: labels,
                datasets:[{
                    label: 'Курс(byn)',
                    data: currency[0]
                }]
            },
        });
    } else if(nameCarrency === '292'){
        let ctx = chart.getContext('2d');
        let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: labels,
                datasets:[{
                    label: 'Курс(byn)',
                    data: currency[1]
                }]
            },
        });
    } else if(nameCarrency === '298'){
        let ctx = chart.getContext('2d');
        let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: labels,
                datasets:[{
                    label: 'Курс(byn)',
                    data: currency[2]
                }]
            },
        });
    }
}

window.addEventListener('load', () => {
    getDate();
    
    dateForChart.reverse().forEach((element) => {
       getData(`${URL}145?ondate=${element}&periodicity=0`, data => {
        currencyForChart.push(JSON.parse(data));
        currencyForTable.push(JSON.parse(data));
       });

       getData(`${URL}292?ondate=${element}&periodicity=0`, data => {
        currencyForChart.push(JSON.parse(data));
        currencyForTable.push(JSON.parse(data));
       });

       getData(`${URL}298?ondate=${element}&periodicity=0`, data => {
        currencyForChart.push(JSON.parse(data));
        currencyForTable.push(JSON.parse(data));
       });
    })
    
    currencyForChart.forEach(element => {
        element.temp = element.Date.slice(0, -9).replace(/-/g, '');
        if(element.Cur_ID === 145) currencyUSDForChart.push(element);
        if(element.Cur_ID === 292) currencyEURForChart.push(element);
        if(element.Cur_ID === 298) currencyRUBForChart.push(element);
    })

    currencyForTable.forEach(element => {
        element.temp = element.Date.slice(0, -9).replace(/-/g, '');
        if(element.Cur_ID === 145) currencyUSDForTable.push(element);
        if(element.Cur_ID === 292) currencyEURForTable.push(element);
        if(element.Cur_ID === 298) currencyRUBForTable.push(element);
    })

    for(let i = 0; i < currencyUSDForChart.length; i++){
        currencyUSDArrForChart.push(currencyUSDForChart[i].Cur_OfficialRate)
     }

     for(let i = 0; i < currencyEURForChart.length; i++){
        currencyEURArrForChart.push(currencyEURForChart[i].Cur_OfficialRate)
    }

    for(let i = 0; i < currencyRUBForChart.length; i++){
        currencyRUBArrForChart.push(currencyRUBForChart[i].Cur_OfficialRate)
    }

    for(let i = 0; i < currencyUSDForTable.length; i++){
        currencyUSDArrForTable.push(currencyUSDForTable[i].Cur_OfficialRate)
     }

     for(let i = 0; i < currencyEURForTable.length; i++){
        currencyEURArrForTable.push(currencyEURForTable[i].Cur_OfficialRate)
    }

    for(let i = 0; i < currencyRUBForTable.length; i++){
        currencyRUBArrForTable.push(currencyRUBForTable[i].Cur_OfficialRate)
    }

    currencyArrForChart.push(currencyUSDArrForChart);
    currencyArrForChart.push(currencyEURArrForChart);
    currencyArrForChart.push(currencyRUBArrForChart);

    currencyArrForTable.push(currencyUSDArrForTable);
    currencyArrForTable.push(currencyEURArrForTable);
    currencyArrForTable.push(currencyRUBArrForTable);

    let ctx = chart.getContext('2d');
    let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: dateForChart,
                datasets:[{
                    label: 'Курс(byn)',
                    data: [currencyUSDForChart[0].Cur_OfficialRate, currencyUSDForChart[1].Cur_OfficialRate, currencyUSDForChart[2].Cur_OfficialRate, currencyUSDForChart[3].Cur_OfficialRate, currencyUSDForChart[4].Cur_OfficialRate, currencyUSDForChart[5].Cur_OfficialRate, currencyUSDForChart[6].Cur_OfficialRate]
                }]
            },
        });
        // таблица

        for(let i = 0; i < dateForTable.length; i++){
            $('#date').append('<td class="date">' + dateForTable.reverse()[i] + '</td>');
        }

        for(let i = 0; i < currencyEURArrForTable.length; i++){
            $('.EUR').append('<td class="EURc">' + currencyEURArrForTable[i] + '</td>');
        }

        for(let i = 0; i < currencyUSDArrForTable.length; i++){
            $('.USD').append('<td class="USDc">' + currencyUSDArrForTable[i] + '</td>');
        }

        for(let i = 0; i < currencyRUBArrForTable.length; i++){
            $('.RUB').append('<td class="RUBc">' + currencyRUBArrForTable[i] + '</td>');
        }
                
        maxMinFind(document.querySelectorAll('.EURc'));
        maxMinFind(document.querySelectorAll('.USDc'));
        maxMinFind(document.querySelectorAll('.RUBc'));
        
})
    

currencySelect.addEventListener('change', () => {

    document.getElementById('container').innerHTML = '&nbsp;';
    document.getElementById('container').insertAdjacentHTML('afterbegin', '<canvas id="chart" width="700" height="500"></canvas>');
    const chart = document.getElementById('chart');

    drawChart(changeCurrency(currencySelect), dateForChart, currencyArrForChart);
    
});

input.addEventListener('input', () => {

    const filterCurrency = nameCurrency.filter(item => {
        return item.includes(input.value.toUpperCase());
    });

    if(input.value !== ''){
        for(let i = 0; i < filterCurrency.length; i++){
            if($(filterCurrency[i]).hasClass('hidden')){
                $(filterCurrency[i]).removeClass('hidden');
            } 
            
            $(filterCurrency[i])
            .addClass('notHidden')
            .closest('.table')
            .find('tr[class]')
            .not(filterCurrency[i])
            .addClass('hidden');
    
            if($(filterCurrency[i]).hasClass('notHidden')){
                $(filterCurrency[i]).removeClass('hidden');
            }
        }
    }

    for(let i = 0; i < filterCurrency.length; i++){
        $(filterCurrency[i]).removeClass('hidden');
    }
});

document.querySelector('.button1').addEventListener('click', () => {
    dateForChart = [];
    currencyForChart = [];
    currencyUSDForChart = [];
    currencyEURForChart = [];
    currencyRUBForChart = [];
    currencyArrForChart = [];
    currencyUSDArrForChart = [];
    currencyEURArrForChart = [];
    currencyRUBArrForChart = [];

    let dateStart = document.querySelector('#start-date').value;
    let dateEnd = document.querySelector('#end-date').value;
    

    dateStart = Date.parse(dateStart);
    dateEnd = Date.parse(dateEnd);

    let out = document.querySelector('#out');

    for(let i = dateStart; i <= dateEnd; i+= 24*60*60*1000){
        let year = new Date(i).toISOString().substr(0, 10).slice(0, 4)
        let month = new Date(i).toISOString().substr(0, 10).slice(5, 7);
        let day = new Date(i).toISOString().substr(0, 10).slice(8);
        

        month = dateCheck(month);
        day = dateCheck(day);

        dateForChart.push(year + '-' + month + '-' + day);
    }
    
    dateForChart.forEach((element) => {
        getData(`${URL}145?ondate=${element}&periodicity=0`, data => {
         currencyForChart.push(JSON.parse(data));
        });
 
        getData(`${URL}292?ondate=${element}&periodicity=0`, data => {
         currencyForChart.push(JSON.parse(data));
        });
 
        getData(`${URL}298?ondate=${element}&periodicity=0`, data => {
         currencyForChart.push(JSON.parse(data));
        });
     })
     
     currencyForChart.forEach(element => {
         element.temp = element.Date.slice(0, -9).replace(/-/g, '');
         if(element.Cur_ID === 145) currencyUSDForChart.push(element);
         if(element.Cur_ID === 292) currencyEURForChart.push(element);
         if(element.Cur_ID === 298) currencyRUBForChart.push(element);
     })

    for(let i = 0; i < currencyUSDForChart.length; i++){
        currencyUSDArrForChart.push(currencyUSDForChart[i].Cur_OfficialRate)
     }

    for(let i = 0; i < currencyEURForChart.length; i++){
        currencyEURArrForChart.push(currencyEURForChart[i].Cur_OfficialRate)
    }

    for(let i = 0; i < currencyRUBForChart.length; i++){
        currencyRUBArrForChart.push(currencyRUBForChart[i].Cur_OfficialRate)
    }

     currencyArrForChart.push(currencyUSDArrForChart);
     currencyArrForChart.push(currencyEURArrForChart);
     currencyArrForChart.push(currencyRUBArrForChart);

    drawChart(changeCurrency(currencySelect), dateForChart, currencyArrForChart);
})

document.querySelector('.button2').addEventListener('click', () => {
    dateForTable = [];
    currencyForTable = [];
    currencyUSDForTable = [];
    currencyEURForTable = [];
    currencyRUBForTable = [];
    currencyArrForTable = [];
    currencyUSDArrForTable = [];
    currencyEURArrForTable = [];
    currencyRUBArrForTable = [];

    let dateStart = document.querySelector('#start-date2').value;
    let dateEnd = document.querySelector('#end-date2').value;

    dateStart = Date.parse(dateStart);
    dateEnd = Date.parse(dateEnd);

    for(let i = dateStart; i <= dateEnd; i+= 24*60*60*1000){
        let year = new Date(i).toISOString().substr(0, 10).slice(0, 4)
        let month = new Date(i).toISOString().substr(0, 10).slice(5, 7);
        let day = new Date(i).toISOString().substr(0, 10).slice(8);
        

        month = dateCheck(month);
        day = dateCheck(day);
        console.log(year + '-' + month + '-' + day);
        dateForTable.push(year + '-' + month + '-' + day);
    }
    
    dateForTable.forEach((element) => {
        getData(`${URL}145?ondate=${element}&periodicity=0`, data => {
         currencyForTable.push(JSON.parse(data));
        });
 
        getData(`${URL}292?ondate=${element}&periodicity=0`, data => {
         currencyForTable.push(JSON.parse(data));
        });
 
        getData(`${URL}298?ondate=${element}&periodicity=0`, data => {
         currencyForTable.push(JSON.parse(data));
        });
     })
     
     currencyForTable.forEach(element => {
         element.temp = element.Date.slice(0, -9).replace(/-/g, '');
         if(element.Cur_ID === 145) currencyUSDForTable.push(element);
         if(element.Cur_ID === 292) currencyEURForTable.push(element);
         if(element.Cur_ID === 298) currencyRUBForTable.push(element);
     })

    for(let i = 0; i < currencyUSDForTable.length; i++){
        currencyUSDArrForTable.push(currencyUSDForTable[i].Cur_OfficialRate)
     }

    for(let i = 0; i < currencyEURForTable.length; i++){
        currencyEURArrForTable.push(currencyEURForTable[i].Cur_OfficialRate)
    }

    for(let i = 0; i < currencyRUBForTable.length; i++){
        currencyRUBArrForTable.push(currencyRUBForTable[i].Cur_OfficialRate)
    }
    
    $('.date').remove();
    $('.EURc').remove();
    $('.USDc').remove();
    $('.RUBc').remove();


    for(let i = 0; i < dateForTable.length; i++){
        $('#date').append('<td class="data">' + dateForTable[i] + '</td>');
    }
 
    for(let i = 0; i < currencyEURArrForTable.length; i++){
        $('.EUR').append('<td class="EURc">' + currencyEURArrForTable[i] + '</td>');
    }

    for(let i = 0; i < currencyUSDArrForTable.length; i++){
        $('.USD').append('<td class="USDc">' + currencyUSDArrForTable[i] + '</td>');
    }

    for(let i = 0; i < currencyRUBArrForTable.length; i++){
        $('.RUB').append('<td class="RUBc">' + currencyRUBArrForTable[i] + '</td>');
    }
    
    maxMinFind(document.querySelectorAll('.EURc'));
    maxMinFind(document.querySelectorAll('.USDc'));
    maxMinFind(document.querySelectorAll('.RUBc'));
})