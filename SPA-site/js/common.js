//Datepicker ========== complite
$( function() {
    var datepicker = new Datepicker('#datepicker', {
    	inline: true
    });  
});

//Clock ========== complite
$( function() {
	//получить часы
	let time = $('time-now')[0];

    function clock() {
		let dataNow = new Date();

		let hour = dataNow.getHours();
		if(hour < 10) hour = '0' + hour;

		let minete = dataNow.getMinutes();
		if(minete < 10) minete = '0' + minete;

		let sec = dataNow.getSeconds();
		if(sec < 10) sec = '0' + sec;

		let output = `${hour} ${minete} ${sec}`;

		$('#timeHour').text(hour);
		$('#timeMinute').text(minete);
		$('#timeSec').text(sec);
	
	}

	let getClock = setInterval(function(){
		clock()
	}, 1000); 

});

//Open-Close Menu ========== complite
$(function() {

	let reserv = document.getElementById('reservation');
	reserv.addEventListener('click', function(EO){
		let target = EO.target;	
		if(!target.hasAttribute("data-open")) return;
		let c = target.parentNode.parentNode.getElementsByClassName('option-list')[0];
		$(c).toggle()
	});

});

//Hover and onhover ========== complite
$(function() {

	let plusHover = $('h4[data-open]');

	for(let i = 0; i < plusHover.length; i++){
		let plus = plusHover[i];
		plus.addEventListener('mouseover', function(){
			hover(plus);
		});
		plus.addEventListener('mouseout', function(){
			onhover(plus);
		});
	}

	function hover(el){
		let hoverHear = el.parentNode.getElementsByClassName('icon-plus')[0];
		hoverHear.classList.add('transformForPlus');
		hoverHear.classList.remove('transformForPlus2');
	}

	function onhover(el){
		let hoverHear = el.parentNode.getElementsByClassName('icon-plus')[0];
		hoverHear.classList.remove('transformForPlus');
		hoverHear.classList.add('transformForPlus2');
	}

});

//Get full year ========== complite
$(function(){
	//получить день
	var date = new Date( );
	let year = date.getFullYear();
	let month = ''
	

	switch(date.getMonth()){
		case 7:
			month += 'Август ';
			break;
		case 8:
			month += 'Сентябрь ';
	}

	//$('.now-day').append(date.getDate());
	$('.now-monh').append(month);
	$('.now-year').append(year);
});


//========================== Подключение данных - json и их добавление в localeStorage


	$.ajax('../JSON/tableReserv.json', {
		type: 'GET',
		dataType: 'json',
		success: dataLoaded,
		error:errorHandler 
	});

	function dataLoaded(date) {
		if(localStorage.getItem('tableView')) return
		localStorage.setItem('tableView', JSON.stringify(date));
	}

	function errorHandler(jqXHR,statusStr,errorStr) {
		console.log(statusStr+' '+errorStr)
	}

	function infoReserv() {
		let info = [];
		if( localStorage.getItem('reservInfo') ) return
		localStorage.setItem('reservInfo', JSON.stringify(info));
	}

	infoReserv();

	$.ajax('../JSON/products.json', {
		type: 'GET',
		dataType: 'json',
		success: dataLoadedProduct,
		error:errorHandler 
	});

	function dataLoadedProduct(date) {
		if(localStorage.getItem('products')) return
		localStorage.setItem('products', JSON.stringify(date));
	}


















let pageState = {};

let pageStateFilter = [];


$(function(){
	

		
	//========================== Функция которая записывает в УРЛ
	function switchToState(key) {
		let URL = window.location.hash.substr(1);
		let URLsplit = URL.split('_');

		console.log(URL)
		console.log(URLsplit)

		let URLafter = URLsplit.slice(2);
		URLafter.join('_');
		console.log(URLafter)

		let newURL = [];

		newURL[0] = pageState['home'];
		newURL[1] = pageState['cotalog'];

		let URLjoin = newURL.join('_') + '_' + URLafter;
	
		location.hash = URLjoin;
	}

	//========================== Функция которая записывает в объект состояния УРЛА
	function writeInObjState (name) {
		if(name.home) {
			pageState.home = name.home;
		} else if (name.cotalog) {
			pageState.cotalog = name.cotalog;
		}
	}

	//Следим за URL (-.-)
	//window.onhashchange = myHashChange;
	window.addEventListener('hashchange', myHashChange);

	

	function myHashChange() {

		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1);

		if( stateStr != "" ) {
			let parst = stateStr.split("_");
			pageState.home = parst[0];
			pageState.cotalog = parst[1];
		}else {
			pageState.home = 'Home1';
			pageState.cotalog = 'AllProducts';
			switchToState();
		}


		switch (pageState.home) {
			case 'Home1':
				WriteTableReserv('Home1');
				getDayLine();
				break;
			case 'Home2':
				WriteTableReserv('Home2');
				getDayLine();
				break;
			case 'Home3':
				WriteTableReserv('Home3');
				getDayLine();
				break;
		}

		switch (pageState.cotalog) {
			case 'AllProducts':
				getAllProtucts();
				tabsProduct();
				break;
			case 'Crem':
				getTypeProducts('Crem');
				tabsProduct();
				break;	
			case 'Gel':
				getTypeProducts('Gel');
				tabsProduct();
				break;
			case 'Powder':
				getTypeProducts('Powder');
				tabsProduct();
				break;
			case 'Sprey':
				getTypeProducts('Sprey');
				tabsProduct();
				break;
			case 'Shampoo':
				getTypeProducts('Shampoo');
				tabsProduct();
				break;				
		}
	}






	//========================== Отрисовка страниц == СЕКЦИЯ ТАБЛИЦА

		//===================HandelBadr отрисовка
	function WriteTableReserv(name) {
		let tableReserveFromLocal = localStorage.getItem('tableView');
		let parsC = JSON.parse(tableReserveFromLocal);

		let info = $('#table-reserve-item-template-1').html();
		let template = Handlebars.compile(info);
		let html = template(parsC[name]);

		$('.table').html(html);
		writeChecBoxes(parsC);
	}

		//=================== Отрисовка резервов + добавление id резерва
	function writeChecBoxes(name) {
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1).split("_")[0]; //название страницы Home 1-2-3

		name[stateStr]['Barber'].forEach((value, key) => {

			value['box'].forEach((boxValue, boxKey) => {

				if (boxValue == 1) {

					let id = value['id'][boxKey];
					let barberItem = value['data'];
					let items = $('.barber').get();

					items.forEach((valueItem, keyItem) => {

						if (valueItem.getAttribute('data-barber') === barberItem) {	

							let keys = boxKey + 1;
							$(valueItem.parentNode.children[keys]).html(`<div class="box-resirvs" data-selected id="${id}"></div>`);

						}

					});
					
				}

			});

		});	

	}

		//=================== Устанавливаем дату над табл. в зависимости от УРЛА
	function getDayLine() {

		let day = new Date().getDate();
		let datePage = $('.now-day').html();

		if (pageState.home === 'Home1') {
			$('.now-day').html(day++);
		}else if (pageState.home === 'Home2') {
			day += 1;
			$('.now-day').html(day);
		}else {
			day += 2;
			$('.now-day').html(day);
		}

	}



	//========================== Отрисовка страниц == СЕКЦИЯ COTALOG
	function getAllProtucts() {
		let tableReserveFromLocal = localStorage.getItem('products');
		let parsProduct = JSON.parse(tableReserveFromLocal);

		let productsAll = $('#products-all').html();
		let tamplateAllProd = Handlebars.compile(productsAll);


		let itemAllProducts = tamplateAllProd(parsProduct);
		$('.products-right-bar #prods').html(itemAllProducts);
	}

	function getTypeProducts(name) {
		$('.products-right-bar #prods').html('');
		let tableReserveFromLocal = localStorage.getItem('products');
		let parsProduct = JSON.parse(tableReserveFromLocal);

		parsProduct.cotalogs.forEach((value, key) => {

			for(let keyObj in value) {
				let innerHTML = '';

				if(value[keyObj] !== name) continue;

				let productsAll = $('#products-types').html();
				let tamplateAllProd = Handlebars.compile(productsAll);
				let itemAllProducts = tamplateAllProd(value);
				$('.products-right-bar #prods').append(itemAllProducts);
			}		
		});
	}


	//Работа с вкладками товаров
	function tabsProduct () {
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1);
		let parst = stateStr.split("_")[1]; //название страницы Home 1-2-3

		switch(parst) {
			case 'AllProducts':
				chekTabsBrod('AllProducts');
				break;
			case 'Crem':
				chekTabsBrod('Crem');
				break;
			case 'Gel':
				chekTabsBrod('Gel');
				break;	
			case 'Powder':
				chekTabsBrod('Powder');
				break;	
			case 'Sprey':
				chekTabsBrod('Sprey');
				break;	
			case 'Shampoo':
				chekTabsBrod('Shampoo');
				break;					

		}


		function chekTabsBrod (name) {
			let clearTabs = $(`.products-nav`).find('a').get();

			clearTabs.forEach((value) => {
				if ( $(value).hasClass('active-tabs-product') ) {
					$(value).removeClass('active-tabs-product');
				}
				
			});

			let tabs = $(`.products-nav`).find(`a[data-products="${name}"]`);
			$(tabs).addClass('active-tabs-product')

		}

	}



	//========================== Обработка клика Tabs категории
	$('.products-header').on('click', function(EO) {
		let target = EO.target;

		if(target.tagName === 'A') {
			EO.preventDefault();
		}

		if(target.tagName !== 'A') return;

		switch(target.getAttribute('data-products')) {
			case 'AllProducts':
				writeInObjState({'cotalog': 'AllProducts'});
				switchToState({'cotalog': 'AllProducts'});
				break;
			case 'Crem':
				writeInObjState({'cotalog': 'Crem'});
				switchToState();
				break;
			case 'Gel':
				writeInObjState({'cotalog': 'Gel'});
				switchToState({'cotalog': 'Gel'});
				break;
			case 'Powder':
				writeInObjState({'cotalog': 'Powder'});
				switchToState({'cotalog': 'Powder'});
				break;
			case 'Sprey':
				writeInObjState({'cotalog': 'Sprey'});
				switchToState({'cotalog': 'Sprey'});
				break;
			case 'Shampoo':
				writeInObjState({'cotalog': 'Shampoo'});
				switchToState({'cotalog': 'Shampoo'});
				break;				

		}


	});







	
	//========================== Обработка клика next день / before день
		
	$('.right-bar-now-day').on('click', function(EO) {
		let target = EO.target;
		let date = new Date().getDate();
		let limit = date + 1;
		let nowDay = $('.now-day').html();
		let homePage = pageState.home;

		if(target.tagName !== 'I') return;

		if (target.className === 'icon-right-open') {
			setDayNext();
		}else if (target.className === 'icon-left-open') {
			setDayBefore();	
		}

		function setDayNext() {

			if(nowDay > limit ) return;
			homePage++;
			if(homePage > 3) return;

			let dayForObj = pageState.home.substr(0, 4);

			if( pageState.home === 'Home1' ) {
				dayForObj += '2';
				writeInObjState({'home': dayForObj});
				switchToState({'home': dayForObj});

			}else if (pageState.home === 'Home2') {
				dayForObj += '3';
				writeInObjState({'home': dayForObj});
				switchToState({'home': dayForObj});
			}	

		}

		function setDayBefore() {

			if (nowDay <= date) return;

			let dayForObj = pageState.home.substr(0, 4);

			if (pageState.home === 'Home3') {
				dayForObj += '2';
				writeInObjState({'home': dayForObj});
				switchToState({'home': dayForObj});

			}else if (pageState.home === 'Home2') {
				dayForObj += '1';
				writeInObjState({'home': dayForObj});
				switchToState({'home': dayForObj});
			}

		}

	});





	//========================== Запускаем слежку за УРЛом
	myHashChange();





	//==========================

	let target;

	//========================== По клику создаем бокс и записываем в Сторедж обнавленную инфу о Таблице
	$('.table').on('click', function(EO) {	

		target = EO.target;
		if(target.className !== 'table-item-box') return;
		if(target.className === 'box-resirvs') return;

		//========================== Генерация уникального когда для резерва
		let code = generationCode ();
		$(target).html(`<div class="box-resirvs" data-selected id="${code}"></div>`);

			//==========================Показываем форму
		$('.popapForReservOnClick').show(500);

		//========= Узнаем какой контейнер у какого барбера чекнут
		let parentChek = target.parentNode;
		let parentChekChildren = $(parentChek).children().slice(1);
		let nameChekBarber = parentChek.firstElementChild.innerHTML; //Имя барбера
		let arrChekNow = [];  //[0] Барбер  [1] индекс куда записать true

		for(let i = 0; i < parentChekChildren.length; i++) {

			let c = parentChekChildren[i].firstElementChild;
			
			if(c) {
				let antC = c.getAttribute('id');
				if (antC === code) {
					arrChekNow[0] = nameChekBarber;
					arrChekNow[1] = i;
					break;
				}
			}
		}

		console.log(arrChekNow)


		

		//========================== Тут раюотаем с формой
		$('#popap-btn-reserv').on('click', function(EO) {

			let thisForm = EO.target.parentNode;
			let input = $( thisForm ).find('input').get();
			let cRadio = $( thisForm );


			//Валидайия текста и телефона
			let inpTelText = validationForm(input);
			let radio = validRadio(cRadio);
			let chek = validChek(cRadio);
			if(inpTelText || radio || chek) return;


			//Запись данных в оюъект - инфа о клиенте который зарезервировал посещение
			let inputName = $( thisForm ).find('input[type="text"]').val();
			let inputTel = $( thisForm ).find('input[type="tel"]').val();
			let answe = [];
			let inputChek = $( thisForm ).find('input[type="checkbox"]:checked').get().forEach((value)=>{
				
				answe.push($(value).val())
				
			});
			let inputRadio = $( thisForm ).find('input[type="radio"]:checked').val();

			console.log(answe)

			//Добавля. все в новый объект - Код-Имя-Телефон-Выбранные уcлуги
			let infoClientReservFromLocal = localStorage.getItem('reservInfo');
			let parsInfoReserv = JSON.parse(infoClientReservFromLocal);
	
			let pushObj = {};

			pushObj['code'] = code;
			pushObj['name'] = inputName;
			pushObj['tel'] = inputTel;
			pushObj['barber'] = inputRadio;
			pushObj['service'] = answe;
			parsInfoReserv.push(pushObj);
			console.log(pushObj)
			//========================== Добавляем нашу инфу о клиенте в LocaleStarage
			let stringifInfo = JSON.stringify(parsInfoReserv);
			localStorage.setItem('reservInfo', stringifInfo);

			//Закрытие попапа
			$('.popapForReservOnClick').hide(500);

			//Очищаем форму
			input.forEach((vall) => {
				$(vall).val('');
			});

			//Показываем код
			$('#popupCode').show(500);
			$('#popupCode .code-popup').find('h2').html(code)
			$('#popupCode .code-popup').find('button').on('click', ()=>{$('#popupCode').hide(500);});

			//========= Теперь надо  результат положить в  локал стореж в объект tableReserve
			let tableViewFromLocStor = localStorage.getItem('tableView');
			let parsC = JSON.parse(tableViewFromLocStor);

			//========= Узнаем на какой странице мы находимся
			let URLHash = window.location.hash;
			let stateStr = URLHash.substr(1);
			let parst = stateStr.split("_")[0]; //название страницы Home 1-2-3

			//Берем нужный Home > Barber  и проходимся по нему
			//что бы найти нужного и записать true в box
			let BarberObj = parsC[parst]['Barber'];

			BarberObj.forEach((value, key) => {

				if(value['name'] === nameChekBarber) {

					value['box'][arrChekNow[1]] = true;
					value['id'][arrChekNow[1]] = code;

					//и обратно добавляем в localStorage
					localStorage.setItem('tableView', JSON.stringify(parsC));
				}

			});
			

		});		

		$(document).on('click', '.icon-cancel', function(EO) {
			let targetClose = EO.target;
			$(target).html(``);
			$('.popapForReservOnClick').hide(500);

			$(targetClose.parentNode).find('input').get().forEach((value)=>{
				$(value).val('');
			});

		});
			

	});



	//========================== Ф-ця Генерации уникального когда
	function generationCode () {
		let code = 'B';
		for(let i = 0; i < 4; i++) {
			code += Math.round(Math.random() * 10);
		}
		return code;
	}

	//========================== Ф-ци Валидации формы

	function validationForm (massiv) {
		let c;
		massiv.forEach((value) => {

			switch( value.getAttribute('type') ) {
				case 'text': 
					c = valT(value);
					break;
				case 'tel':
					c = valT(value);
					break;	
			}
			if(c === 1) return;
	
		});

		if(c === 1) return true;
		return false;
	}

	function valT (input) {
		let value = input.value;
		let type = input.getAttribute('type');

		if(type === 'text') {

			if( value.length <= 0) {
				input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
				input.setAttribute('placeholder', 'заполните поле');
				return 1;
			}else {
				input.style.border = "3px solid transparent";
				return;
			}
		}else if (type === 'tel') {

			if( value.length <= 0) {
				input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
				input.setAttribute('placeholder', 'заполните поле');
				return 1;
			}else if ( isNaN(value) ) {
				input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
				input.setAttribute('placeholder', 'заполните поле правильно');
				return 1;
			}else {
				input.style.border = "3px solid transparent";
				return;
			}
		}

	}

	function validRadio (radio) {
		
		let ckeckedBox = $(radio).find('input[type="radio"]:checked');

		if(ckeckedBox.length <= 0) {

			$(radio).find('input[type="radio"]').closest('div').find('p').css('color', 'red');
			return 1;
		}
		$(radio).find('input[type="radio"]').closest('div').find('p').css('color', 'inherit');
		return
	}

	function validChek (chek) {
		
		let ckeckedBox = $(chek).find('input[type="checkbox"]:checked');

		if(ckeckedBox.length <= 0) {

			$(chek).find('input[type="checkbox"]').closest('div').find('p').css('color', 'red');
			return 1;
		}
		$(chek).find('input[type="checkbox"]').closest('div').find('p').css('color', 'inherit');
		return
	}


	
	//============ Поиск своего резерва по коду 
		let clear;
		$(document).on('click', '.serch-code', function() {

			if(clear) {
				clearInterval(clear);
			}
			

			let value = $('.serch-code-text').val();
			let addId = '#' + value;
							

			let URLHash = window.location.hash;
			let stateStr = URLHash.substr(1);
			let parst = stateStr.split("_")[0]; //название страницы Home 1-2-3
			

			let tableViewFromLocStor = localStorage.getItem('tableView');
			let parsC = JSON.parse(tableViewFromLocStor);


			for( let parstObj  in parsC) {
				
				parsC[parstObj]['Barber'].forEach((valueBarb, keyBarb) => {
					
					valueBarb['id'].forEach((valueId, keyId) => {
						if(valueId === value) {

							if (parstObj === parst) {

								clear = setInterval(() => {
								
									$(addId).toggleClass('animated jello rubberBand');
									$(addId).addClass('code-box');
									
								}, 900);

								setTimeout(function() {
									clearInterval(clear);
									$(addId).removeClass('animated jello rubberBand');
									$(addId).removeClass('code-box');
								}, 10000);
								return;
							}

							WriteTableReserv(parstObj);
							writeInObjState({home: `${parstObj}` });
							switchToState({home: `${parstObj}` });

							clear = setInterval(() => {
								
								$(addId).toggleClass('animated jello rubberBand');
								$(addId).addClass('code-box');
								
							}, 900);

							setTimeout(function() {
								clearInterval(clear);
								$(addId).removeClass('animated jello rubberBand');
								$(addId).removeClass('code-box');
							}, 10000);
								

							return;
						}
						
					});
					
				});
			}

		});


	


});






//========================== Обработка клика коталога - Типа товаров
$(function(){


	function switchToState(name) {
		let stateString = '';
		let URL = window.location.hash.substr(1);
		let URLsplit = URL.split('_');

		if(name.length === 0) {
			stateString = `${URLsplit[0]}_${URLsplit[1]}_`;
			location.hash = stateString;
			return;
		}


		//console.log(URL)
		//console.log(URLsplit)
		//console.log(name)
		let URLnew = [];
		URLnew[0] = URLsplit[0];
		URLnew[1] = URLsplit[1];


		let i = 2;

		name.forEach((valueFilter, keyFilter) => {
			URLnew[i] = valueFilter;
			i++;
		});
		//console.log(URLsplit)

		
		 stateString = URLnew.join('_');
		//console.log(URLjoin)
		
		location.hash = stateString;

	}

	
	




	//Берем из локала продукты
	let tableReserveFromLocal = localStorage.getItem('products');
	let parsProduct = JSON.parse(tableReserveFromLocal);

	window.addEventListener('hashchange', urlChange);

	function urlChange() {
		putChekCotalog ();

		let URL = window.location.hash.substr(1);
		let substrUrl = URL.split('_').slice(1);
		substrUrl.pop();

		if(substrUrl[0] === 'AllProducts') return;
		

		let filtrePrice = [];
		let filtreOther = [];
		let allProdPrice = { 'cotalogs': [] };

		substrUrl.forEach((value) => {
			if(value === 'price-1' || value === 'price-2' || value === 'price-3') {
				filtrePrice.push(value);
			} else {
				filtreOther.push(value);
			}
		});




		if(filtrePrice.length > 0 && filtreOther.length > 0) {
			includeValueInPricePage(filtrePrice);
			getPriceFilter(filtreOther);
			switchToState(filtrePrice);
			switchToState(filtreOther);
		} else if (filtrePrice.length > 0 && filtreOther.length <= 0) {
			includeValueInPricePage(filtrePrice);
			writeItem(allProdPrice);
			switchToState(filtrePrice);
		} else if (filtrePrice.length <= 0 && filtreOther.length > 0) {
			getNoPriceFilter(filtreOther)
			switchToState(filtreOther);
		} else {
			//writeAllProtucts(parsProduct);
		}


		




		function includeValueInPricePage(massPrice) {

			massPrice.forEach((value) => {

				let priceMax;
				let priceMin;

				if(value === 'price-1') {priceMax = 20; priceMin = 10;};
				if(value === 'price-2') {priceMax = 30; priceMin = 20;};
				if(value === 'price-3') {priceMax = 40; priceMin = 30;};

				parsProduct['cotalogs'].forEach((valueCotalog) => {
					if( parseFloat(valueCotalog['size']) >= priceMin && parseFloat(valueCotalog['size']) <= priceMax) {
						allProdPrice['cotalogs'].push(valueCotalog);
					}
				});

			});

		}

		function getPriceFilter (name) {
			let = allProdPriceFilter = { 'cotalogs': [] };

			name.forEach((value) => {

				let inputName = value.split('-')[0];
				let inputValue = value.split('-')[1];

				

				allProdPrice['cotalogs'].forEach((valuePriceCotal) => {

					if(valuePriceCotal[inputName] === inputValue) {
						allProdPriceFilter['cotalogs'].push(valuePriceCotal);
					}

				});

			});

			writeItem(allProdPriceFilter);
		}

		function getNoPriceFilter (name) {
			let = allProdNo = { 'cotalogs': [] };

			name.forEach((value) => {

				let inputName = value.split('-')[0];
				let inputValue = value.split('-')[1];	

				parsProduct['cotalogs'].forEach((valuePriceCotal) => {

					if(valuePriceCotal[inputName] === inputValue) {
						allProdNo['cotalogs'].push(valuePriceCotal);
					}

				});

			});

			writeItem(allProdNo);

		}
		

		//Слежка за чекнутыми боксами католога
		function putChekCotalog () {
			let URL = window.location.hash.substr(1).split('_');
			let sliceURL = URL.slice(2);
			let input = $('.products-left-bar input[type="checkbox"]').get();
			let chekInput = [];

			if(sliceURL.length === 0 ) {
				//console.log('asd')
				input.forEach((value) => {
					//console.log(value)
					$(value).removeProp('checked');
				});
				return;
			
			}



			sliceURL.forEach((value) => {
				chekInput.push(value);
			});

			

			input.forEach((value) => {
				
				chekInput.forEach((valueChUR) => {
					if(value.value === valueChUR) {
						$(value).attr( 'checked', 'checked');
					} else {
						$(value).removeAttr('checked');
					}
				});

			});
		}

		

	}
	

	urlChange();

	

	

	






	
	

	$('.products-left-bar').on('click', function(EO) {
		if(EO.target.tagName !== 'INPUT') return;

		//Берем все чекнутые инпуты
		let checkInputArr = []; 
		let input = $('.products-left-bar input:checked').get();
		input.forEach((value) => {
			checkInputArr.push(value.value);
		});

		//pageStateFilter = checkInputArr;
		//$('.products-right-bar #prods').html('');
		switchToState(checkInputArr);

	});












































	function writeItem(name) {
		$('.products-right-bar #prods').html('');
		let productsAll = $('#products-types').html();
		let tamplateAllProd = Handlebars.compile(productsAll);
		let itemAllProducts;

		name['cotalogs'].forEach((value) => {
			itemAllProducts = tamplateAllProd(value);
			$('.products-right-bar #prods').append(itemAllProducts);
		})

	}

	function writeAllProtucts() {
		$('.products-right-bar #prods').html('');
		let tableReserveFromLocal = localStorage.getItem('products');
		let parsProduct = JSON.parse(tableReserveFromLocal);

		let productsAll = $('#products-all').html();
		let tamplateAllProd = Handlebars.compile(productsAll);

		let itemAllProducts = tamplateAllProd(parsProduct);
		$('.products-right-bar #prods').html(itemAllProducts);
	}


});





























//Comments
$(function(){
	let JsonComments = {
		'user': [
			{'name': 'Alex', 'txt': 'Chance too good. God level bars. Im so proud of LifeOfDesiigner 1 song in the country. Panda! Dont be scared of the truth because we need to restart the human foundation in truth I stand with the most humility. We are so blessed!'},
			{'name': 'Camber', 'txt': 'Hello guys, nice to have you on the platform! There will be a lot of great stuff coming soon. We will keep you posted for the latest news.'},
			{'name': 'Tina', 'txt': 'Hello guys, nice to have you on the platform!'},
			{'name': 'Andrew', 'txt': 'Hello guys'},
			{'name': 'Tina Andrew', 'txt': 'nice to have you on the platform!'},
			{'name': 'Tim Ande', 'txt': 'niceplatform!'},
			{'name': 'Andrew', 'txt': 'Hello guys'}
		]
	};

	function baseComment() {
		let jsComment = $('#comments-media').html();
		let template = Handlebars.compile(jsComment);
		$('.media-wrapp').html('');
		for(let i = 0; i < 3; i++) {
			let date = template(JsonComments['user'][i]);
			
			$('.media-wrapp').append(date);
		}
	}

	baseComment();

	

	$(document).on('click', '.btn-more', function(EO) {
		
		writeNewComment();
	});

	

	function writeNewComment() {
		let jsComment = $('#comments-media').html();
		let template = Handlebars.compile(jsComment);
		let target = $('.media-wrapp');
		let lengMedia = $(target).find('.media').length;
		let premedia = lengMedia + 2;
		
		for(let i = lengMedia; i < premedia; i++) {

			if(lengMedia >= JsonComments['user'].length) return;

			if(premedia > JsonComments['user'].length) {
				let difference = JsonComments['user'].length - premedia;
				for(let p = i; p < difference; p++) {
					let date = template(JsonComments['user'][p]);
					$('.media-wrapp').append(date);
				}
				return;
			}

			let date = template(JsonComments['user'][i]);
			$('.media-wrapp').append(date);
		}
	}


	//Доюавление нового комента
	$(document).on('click', '.add-comment', function(EO) {
		let area = $('#exampleBlogPost').val();
		if(!area) return;

		//Добавляем в объект новогый комент ---- это пока что неизвестный пользователь
		let setUser = {};
		setUser['name'] = 'user';
		setUser['txt'] = area;
		JsonComments['user'].unshift(setUser);

		baseComment();
		$('#exampleBlogPost').val('');

	});

	//Визуал текса ареа
	$(document).on('focus', '#exampleBlogPost', function(EO) {
		$('label[for="exampleBlogPost"]').animate( {'font-size':10} ,300);
        $(EO.target).css('border-bottom', '2px solid #9c27b0');
         
	});

	$(document).on('focusout', '#exampleBlogPost', function(EO) {
		$('label[for="exampleBlogPost"]').animate( {'font-size':16} ,300);
        $(EO.target).css('border-bottom', '2px solid #9c27b038');
	});

});
























