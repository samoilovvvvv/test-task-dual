const currencySelect = document.getElementById('select');
const input = document.querySelector('.input');

const date = [];
let temp = [];
let currency = [];
let nameCurrency = ['.USD', '.EUR', '.RUB']
let currencyUSD = [];
let currencyEUR = [];
let currencyRUB = [];

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

    date.push(trueDate);

    for(let i = 0; i < 6; i++){
        today.setTime(today.getTime() - 24*60*60*1000);
        trueDate = dateHandling(today);
        date.push(trueDate);
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

window.addEventListener('load', () => {
    getDate();
   
    date.reverse().forEach((element) => {
       getData(`${URL}145?ondate=${element}&periodicity=0`, data => {
        currency.push(JSON.parse(data));
       });

       getData(`${URL}292?ondate=${element}&periodicity=0`, data => {
        currency.push(JSON.parse(data));
       });

       getData(`${URL}298?ondate=${element}&periodicity=0`, data => {
        currency.push(JSON.parse(data));
       });
    })
    
    currency.forEach(element => {
        element.temp = element.Date.slice(0, -9).replace(/-/g, '');
        if(element.Cur_ID === 145) currencyUSD.push(element);
        if(element.Cur_ID === 292) currencyEUR.push(element);
        if(element.Cur_ID === 298) currencyRUB.push(element);
    })

    currency.sort((a, b) => {
        if (a.temp > b.temp) {
            return 1;
          }
          if (a.temp < b.temp) {
            return -1;
          }
          return 0;
    });

    let ctx = chart.getContext('2d');
    let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: [date[0], date[1], date[2], date[3], date[4], date[5], date[6]],
                datasets:[{
                    label: 'Курс(byn)',
                    data: [currencyUSD[0].Cur_OfficialRate, currencyUSD[1].Cur_OfficialRate, currencyUSD[2].Cur_OfficialRate, currencyUSD[3].Cur_OfficialRate, currencyUSD[4].Cur_OfficialRate, currencyUSD[5].Cur_OfficialRate, currencyUSD[6].Cur_OfficialRate]
                }]
            },
        });

        date.forEach((element, index) => {
            $('.date').eq(index).text(element);
        })

        currencyEUR.forEach((element, index) => {
            $('.EURc').eq(index).text(element.Cur_OfficialRate)
        })

        currencyUSD.forEach((element, index) => {
            $('.USDc').eq(index).text(element.Cur_OfficialRate)
        })

        currencyRUB.forEach((element, index) => {
            $('.RUBc').eq(index).text(element.Cur_OfficialRate)
        })
        
        
        maxMinFind(document.querySelectorAll('.EURc'));
        maxMinFind(document.querySelectorAll('.USDc'));
        maxMinFind(document.querySelectorAll('.RUBc'));
        
})
    

currencySelect.addEventListener('change', () => {

    document.getElementById('container').innerHTML = '&nbsp;';
    document.getElementById('container').insertAdjacentHTML('afterbegin', '<canvas id="chart" width="700" height="500"></canvas>');
    const chart = document.getElementById('chart');

    if(changeCurrency(currencySelect) === '145'){
        let ctx = chart.getContext('2d');
        let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: [date[0], date[1], date[2], date[3], date[4], date[5], date[6]],
                datasets:[{
                    label: 'Курс(byn)',
                    data: [currencyUSD[0].Cur_OfficialRate, currencyUSD[1].Cur_OfficialRate, currencyUSD[2].Cur_OfficialRate, currencyUSD[3].Cur_OfficialRate, currencyUSD[4].Cur_OfficialRate, currencyUSD[5].Cur_OfficialRate, currencyUSD[6].Cur_OfficialRate]
                }]
            },
        });
    } else if(changeCurrency(currencySelect) === '292'){
        let ctx = chart.getContext('2d');
        let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: [date[0], date[1], date[2], date[3], date[4], date[5], date[6]],
                datasets:[{
                    label: 'Курс(byn)',
                    data: [currencyEUR[0].Cur_OfficialRate, currencyEUR[1].Cur_OfficialRate, currencyEUR[2].Cur_OfficialRate, currencyEUR[3].Cur_OfficialRate, currencyEUR[4].Cur_OfficialRate, currencyEUR[5].Cur_OfficialRate, currencyEUR[6].Cur_OfficialRate]
                }]
            },
        });
    } else if(changeCurrency(currencySelect) === '298'){
        let ctx = chart.getContext('2d');
        let lineChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: [date[0], date[1], date[2], date[3], date[4], date[5], date[6]],
                datasets:[{
                    label: 'Курс(byn)',
                    data: [currencyRUB[0].Cur_OfficialRate, currencyRUB[1].Cur_OfficialRate, currencyRUB[2].Cur_OfficialRate, currencyRUB[3].Cur_OfficialRate, currencyRUB[4].Cur_OfficialRate, currencyRUB[5].Cur_OfficialRate, currencyRUB[6].Cur_OfficialRate]
                }]
            },
        });
    }
    
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