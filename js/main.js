const request = require('request');
let str = '';

let arrOfSrc = [];

request('https://dou.ua/', function (error, response, body) {
  console.error('error:', error); 
  console.log('statusCode:', response && response.statusCode); 

  const getHTML = (htmlBody) => {
    for ( let i = htmlBody.indexOf('<h3>Советуем почитать</h3>'); i < htmlBody.indexOf('<footer'); i++) {
      str = `${str}${htmlBody[i]}`;  // тут получам отрезок кода с раздела "советуем почитать"
    }
    let arrayOfStrings = str.split(' '); // из строки получаем массив без пробелов
    const result = arrayOfStrings.filter((item) => {  // фильтруем массив для получения элементов которые содержат ссылку на картинку
      if (item.includes('srcset')){
        return item;
      }
    });
    
    // функция в которой убираем все лишнее и получаем массив из 6 ссылок на картинки
    const getSrcFromString = (arr) => { 
      for ( let k = 0; k < 6 ; k++){
        let strSrc = '';
        for ( let r = arr[k].indexOf('h'); r < arr[k].length; r++) {
          strSrc = `${strSrc}${arr[k][r]}`; 
        }
        arrOfSrc[k] = strSrc;
      } 
    }
    getSrcFromString(result);
    console.log(arrOfSrc);
  }  

  getHTML(body);
  
});










