window.onload = function () {
	// let data = [
	// 	{
	// 		ssid: 3,
	// 	},
	// 	{
	// 		ssid: 2,
	// 	},
	// 	{
	// 		ssid: 1,
	// 	},
	// 	{
	// 		ssid: 3,
	// 	},
	// ];
	// //[1,2,3,4,4,4,5,4,1,5,4].filter(item => item === 4).length // 5

	// // let obj3 = data.filter((item) => item.ssid === 3).length;
	// console.log(obj3);

	//!general functions
	function hiding(show_el, style, hide_el = null) {
		if (style == 'inline' && hide_el == null) {
			show_el.style.display = 'inline-block';
		}
		if (style == 'inline' && hide_el !== null) {
			show_el.style.display = 'inline-block';
			hide_el.style.display = 'none';
		}
		if (style == 'block') {
			show_el.style.display = 'block';
			hide_el.style.display = 'none';
		}
		if (style == 'flex' && hide_el) {
			show_el.style.display = 'flex';
			hide_el.style.display = 'none';
		}
		if (style == 'flex' && hide_el == null) {
			show_el.style.display = 'flex';
		}
		if (style == 'none') {
			show_el.style.display = 'none';
		}
	}

	//  class Hiding {
	// 	constructor(show_el, hide_el) {
	// 	  this.show_el = show_el;
	// 	  this.hide_el = hide_el;
	// 	}

	// 	singleFlexShow() {
	// 		show_el.style.display = 'flex'
	// 	}

	//     singleBlockShow() {
	// 		show_el.style.display = 'block'
	// 	}

	//     singleHide() {
	// 		show_el.style.display = 'none'
	// 	}

	//     doubleFlexShow() {
	//         show_el.style.display = 'flex';
	//         hide_el.style.display = 'none';
	// 	}

	//     doubleBlockShow() {
	//         show_el.style.display = 'blok';
	//         hide_el.style.display = 'none';
	// 	}

	//     doubleHide() {
	//         show_el.style.display = 'none';
	//         hide_el.style.display = 'none';
	//     }
	// }

	//slider cards
	let productCard = document.querySelector('.product-card-swiper');
	let productCardSwiper;
	if (productCard) {
		productCardSwiper = new Swiper('.product-card-swiper', {
			watchOverflow: true,
			slidesPerView: 1,
			navigation: {
				nextEl: '.product-card-swiper-next',
				prevEl: '.product-card-swiper-prev',
			},
		});
	}
	//remove all childs
	function removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}
	//mask plagin
	$('.telephoneInput')
		.click(function () {
			if ($(this).val().includes('_')) {
				$(this).setCursorPosition(5);
			}
			//$(this).val('9');
		})
		.mask('+380(99)9999999');
	$('.telephoneInput').mask('+380(99)9999999');
	//mask plagin fix center
	$.fn.setCursorPosition = function (pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	//!Header scroll
	(function () {
		window.oldScrollY = window.scrollY;
		document.onscroll = (e) => {
			let res = window.oldScrollY > window.scrollY ? 1 : 2;
			window.oldScrollY = window.scrollY;

			let head = document.querySelector('header');

			if (res == 2 && window.scrollY > 400) {
				head.style.transform = 'translateY(-100%)';
			} else if (res == 1) {
				head.style.transform = 'translateY(0)';
			}

			if (res == 2 && window.scrollY > 1500) {
				document.getElementById('topBtn').style.display = 'flex';
			} else {
				document.getElementById('topBtn').style.display = 'none';
			}
		};

		document.getElementById('topBtn').onclick = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		};
	})();

	//!header search
	(function () {
		let searchIcon = document.querySelector('.header-search');
		let searchWrap = document.querySelector('.header__search-wrapper');
		let searchInput = document.querySelector('.search-input');

		if (searchIcon) {
			async function getSearchRes() {
				try {
					let data = {
						filter_name: searchInput.value,
					};

					$.ajax({
						url: `index.php?route=common/search/autocomplete/`,
						type: 'get',
						data: data,
						dataType: 'json',
						success: function (data) {
							console.log(data);

							data.map((i) => {
								document
									.querySelector('.search__results-container')
									.insertAdjacentHTML(
										'beforeend',
										`<a href="${i.href}">${i.name}</a>`
									);
							});
						},
						error: function (err) {
							throw new Error(err);
						},
					});

					// const res = await fetch('/...', {
					// 	method: 'POST',
					// 	headers: {
					// 		'Content-Type': 'text/plain;charset=UTF-8',
					// 	},
					// 	body: searchInput.value,
					// });

					// if (res.status == 200) {
					// 	const data = await res.json();
					// 	console.log(data);

					// 	data.map((i) => {
					// 		document
					// 			.querySelector('.search__results-container')
					// 			.insertAdjacentHTML(
					// 				'beforeend',
					// 				`<a href="${i.href}">${i.title}</a>`
					// 			);
					// 	});
					// } else {
					// 	throw new Error(response.status);
					// }
				} catch (err) {
					console.log(err);
				}
			}

			function toggle() {
				//!переделать функцию для логина, для мобильного меню
				//searchIcon.style.transform = 'scale(0.5)';
				searchIcon.classList.toggle('_icon-search');
				searchIcon.classList.toggle('_icon-cancel');
				searchIcon.classList.toggle('rotate-anim');
				searchWrap.classList.toggle('show-effect');
			}

			searchInput.addEventListener('input', function (e) {
				let searchLength = searchInput.value.length;

				if (searchLength >= 3) {
					getSearchRes();
				}
			});

			document.addEventListener('click', function (e) {
				let target = e.target;
				let itsSearch =
					target == searchWrap || searchWrap.contains(target);
				let itsBtn = target == searchIcon;
				let isActive = searchWrap.classList.contains('show-effect');

				if (!itsSearch && !itsBtn && isActive) {
					toggle();
				}
			});

			searchIcon.addEventListener('click', (e) => {
				toggle();
				searchInput.focus();
			});
		}
	})();

	//! auth
	(function () {
		let unknownUser = document.querySelector('.unknown-user');
		let authWrapper = document.querySelector('.auth__wrapper');
		let unknownMobile = document.querySelector(
			'.menu__mobile-unregistered'
		);
		let personalWrapper = document.querySelector('.personal__wrapper');
		let menuIcon = document.querySelector('.menu__icon');
		let menuModal = document.querySelector('.menu__mobile-modal');
		let bodyModal = document.querySelector('#menu__mobile-modal');
		let checkoutAuth = document.querySelector('.auth__wrapper-checkout');
		let numberCont = document.querySelector('.number__container');
		let codeCont = document.querySelector('.code__container');
		let resTel = document.querySelector('.code__container-text');
		let refreshBtn = document.querySelector('.refresh-form');
		let codeInput;
		let userPhone;
		let trueCode;
		let refreshTimeout;
		let refreshTimeoutModal;
		//let refreshBtnModal = document.querySelector('.modal__refresh-code');
		let numberInput;
		let location;
		let BGModal = document.querySelector('#menu__mobile-modal');

		//inform about size in shops
		let infoAvailability = document.querySelector('#infoAvailability');
		if (infoAvailability) {
			let confirmTelBtn = document.querySelector(
				'.modal__inform-inform-tel'
			);
			let sendCode = document.querySelector('.modal__send-code');
			let capcha = document.querySelector('.modal__inform-capcha');
			let modalSubmit = document.querySelector('.modal__inform');
			// let refreshTimeoutModal;

			document
				.querySelector('.modal__back-number')
				.addEventListener('click', (e) => {
					getStartCondition();
					clearTimeout(refreshTimeoutModal);
					resetCode();
				});

			async function resetCode() {
				$.ajax({
					url: `index.php?route=account/login/turboSmsClearAttemps`,
					type: 'post',
					data: userPhone,
					dataType: 'json',
					success: function () {
						document.querySelector('.modal__inform-code').value =
							'';
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			document
				.querySelector('.modal__refresh-code')
				.addEventListener('click', (e) => {
					resetCode();
					setTimeout(
						() =>
							sendNumber(
								userPhone,
								document.querySelector(
									'.spinner-inform-continer'
								)
							),
						400
					);
					clearTimeout(refreshTimeoutModal);
					document.querySelector(
						'.modal__refresh-code'
					).style.display = 'none';
					refreshTimeoutModal = setTimeout(
						() =>
							(document.querySelector(
								'.modal__refresh-code'
							).style.display = 'block'),
						60000
					);
				});

			confirmTelBtn.addEventListener('click', (e) => {
				let spinnerInform = document.querySelector(
					'.spinner-inform-continer'
				);
				let hideEl = document.querySelector('.inform-tel');
				let confirmTelInput =
					document.querySelector('#telephoneInform');
				let value = confirmTelInput.value;

				if (
					value !== '' &&
					!value.includes('_') &&
					capcha.value == ''
				) {
					let number = value.replace('(', '').replace(')', '');
					userPhone = {
						phone: number,
					};
					// sendNumber(data, spinnerInform, hideEl);
					sendNumber(userPhone, spinnerInform);
					confirmTelBtn.disabled = true;
				}
			});

			sendCode.addEventListener('click', (e) => {
				let modalCode = document.querySelector('.modal__inform-code');

				if (modalCode.value.length == 6 && capcha.value == '') {
					sendCode.setAttribute('disabled', true);
					let data = {
						sms_code: modalCode.value,
						opencart_code: trueCode,
						phone: userPhone,
					};
					sendModalCode(data);
				}
			});

			modalSubmit.addEventListener('submit', (e) => {
				e.preventDefault();

				if (capcha.value == '') {
					let name = document.querySelector(
						'.modal__inform-name'
					).value;
					let tel = document.querySelector('#telephoneInform').value;
					let id = document.querySelector(
						'.modal__notification-radio:checked'
					).value;

					let way;
					if (id == 1) {
						way = 'telephone';
					} else {
						way = 'sms';
					}

					let product = document.querySelector(
						'.modal__inform-main-body'
					);
					let product_id = product
						.querySelector('.card__description-size')
						.getAttribute('data-confirm');
					let size = product.querySelector(
						'.card__description-size'
					).textContent;

					let data = {
						user_name: name,
						user_telephone: tel,
						method_information: way,
						method_id: id,
						product_id: product_id,
						size: size,
					};

					sendStockStatusInform(data);
				}
			});

			$('#infoAvailability').on('hidden.bs.modal', function (e) {
				getStartCondition();
			});

			function getStartCondition() {
				document.querySelector(
					'.modal__inform-main-body'
				).style.display = 'block';
				document.querySelector(
					'.modal__inform-success-body'
				).style.display = 'none';

				document.querySelector('.modal__inform-wrapper').style.display =
					'none';
				document.querySelector(
					'.modal__notification-container'
				).style.display = 'none';
				document.querySelector(
					'.modal__inform-inform-tel'
				).style.display = 'block';
				document.querySelector('.inform-name').style.display = 'none';
				document.querySelector('.modal__inform-code').value = '';
				document
					.querySelector('.modal__send-code')
					.removeAttribute('disabled');
				document
					.querySelector('.modal__inform-inform-tel')
					.removeAttribute('disabled');
				document
					.querySelector('#telephoneInform')
					.removeAttribute('readonly');
				document.querySelector('#telephoneInform').value = '';
				document.querySelector('.modal__inform-name').value = '';
				document
					.querySelector('.modal__notification-submit')
					.removeAttribute('disabled');
				document.querySelector('.modal__error-number').style.display =
					'none';
				document.querySelector('.modal__refresh-code').style.display =
					'none';
				document.querySelector(
					'.modal-availability-error'
				).style.display = 'none';

				document.querySelector(
					'.spinner-inform-continer'
				).style.display = 'none';
				clearTimeout(refreshTimeoutModal);
			}

			function sendStockStatusInform(data) {
				$.ajax({
					url: `index.php?route=product/product/stockStatusReport`,
					type: 'post',
					data: data,
					dataType: 'json',
					beforeSend: function () {
						document.querySelector(
							'.spinner-inform-continer'
						).style.display = 'flex';
					},
					success: function (data) {
						document.querySelector(
							'.spinner-inform-continer'
						).style.display = 'none';
						document.querySelector(
							'.modal__inform-main-body'
						).style.display = 'none';
						document.querySelector(
							'.modal__inform-success-body'
						).style.display = 'flex';
						//console.log(data);
					},
					error: function (thrownError) {
						document.querySelector(
							'.spinner-inform-continer'
						).style.display = 'none';
						document.querySelector(
							'.modal__inform-main-body'
						).style.display = 'none';
						document.querySelector(
							'.modal-availability-error'
						).style.display = 'block';
						//getStartCondition();
						throw new Error(thrownError);
					},
				});
			}
		}

		async function sendModalCode(data) {
			$.ajax({
				url: `index.php?route=account/login/turboSmsCheckCode`,
				type: 'post',
				data: data,
				dataType: 'json',
				beforeSend: function () {
					document.querySelector(
						'.spinner-inform-continer'
					).style.display = 'flex';
				},
				success: function (data) {
					document.querySelector(
						'.spinner-inform-continer'
					).style.display = 'none';
					//console.log(data);
					if (data.code_matching) {
						document.querySelector(
							'.modal__inform-inform-tel'
						).style.display = 'none';
						document.querySelector(
							'.modal__inform-wrapper'
						).style.display = 'none';
						document.querySelector(
							'.modal__notification-container'
						).style.display = 'block';
						document.querySelector('.inform-name').style.display =
							'flex';
					} else if (!data.code_matching && data.try_count <= 5) {
						document
							.querySelector('.modal__send-code')
							.removeAttribute('disabled');
						document
							.querySelector('.modal__inform-code')
							.classList.add('error-input');
						setTimeout(
							() =>
								document
									.querySelector('.modal__inform-code')
									.classList.remove('error-input'),
							5000
						);
						document.querySelector(
							'.modal__error-number'
						).style.display = 'block';
						document.querySelector(
							'.modal__error-number'
						).textContent = data.code_error;
						// setTimeout(
						// 	() => document.querySelector('.modal__error-number').textContent = '',
						// 	10000
						// );
					} else if (!data.code_matching && data.try_count > 5) {
						document
							.querySelector('.modal__send-code')
							.removeAttribute('disabled');
						document
							.querySelector('.modal__inform-code')
							.classList.add('error-input');
						setTimeout(
							() =>
								document
									.querySelector('.modal__inform-code')
									.classList.remove('error-input'),
							5000
						);
						document.querySelector(
							'.modal__error-number'
						).style.display = 'block';
						document.querySelector(
							'.modal__error-number'
						).textContent = data.code_error;
						// setTimeout(
						// 	() => document.querySelector('.modal__error-number').textContent = '',
						// 	10000
						// );

						document.querySelector(
							'.modal__refresh-code'
						).style.display = 'block';
					}
				},
				error: function (thrownError) {
					document.querySelector(
						'.spinner-inform-continer'
					).style.display = 'none';
					document
						.querySelector('.modal__send-code')
						.removeAttribute('disabled');
					document
						.querySelector('.modal__inform-code')
						.classList.add('error-input');
					setTimeout(
						() =>
							document
								.querySelector('.modal__inform-code')
								.classList.remove('error-input'),
						5000
					);
					throw new Error(thrownError);
				},
			});
		}

		if (unknownUser) {
			//form show
			unknownMobile.addEventListener('click', (e) => {
				if (getComputedStyle(authWrapper).display == 'none') {
					menuModal.classList.toggle('active-modal');
					bodyModal.classList.toggle('active-modal');
					personalWrapper.classList.toggle('show-effect');
					BGModal.classList.toggle('show-effect'); //
				} else {
					menuModal.classList.toggle('active-modal');
					bodyModal.classList.toggle('active-modal');
					authWrapper.classList.toggle('show-effect');
					BGModal.classList.toggle('show-effect'); //
				}
			});

			unknownUser.addEventListener('click', (e) => {
				if (getComputedStyle(authWrapper).display == 'none') {
					personalWrapper.classList.toggle('show-effect');
					BGModal.classList.toggle('show-effect'); //
				} else {
					authWrapper.classList.toggle('show-effect');
					BGModal.classList.toggle('show-effect'); //
				}
			});
		}

		//!сделать универсальным
		if (unknownUser) {
			document.addEventListener('click', function (e) {
				if (getComputedStyle(authWrapper).display == 'none') {
					let target = e.target;
					let itsContainer =
						target == personalWrapper ||
						personalWrapper.contains(target);
					let itsBtn = target == unknownUser;
					let isActive =
						personalWrapper.classList.contains('show-effect');

					if (
						!itsContainer &&
						!itsBtn &&
						isActive &&
						!e.target.classList.contains(
							'menu__mobile-unregistered'
						)
					) {
						personalWrapper.classList.toggle('show-effect');
						BGModal.classList.toggle('show-effect'); //
					}
				} else {
					let target = e.target;
					let itsContainer =
						target == authWrapper || authWrapper.contains(target);
					let itsBtn = target == unknownUser;
					let isActive =
						authWrapper.classList.contains('show-effect');

					if (
						!itsContainer &&
						!itsBtn &&
						isActive &&
						!e.target.classList.contains(
							'menu__mobile-unregistered'
						)
					) {
						authWrapper.classList.toggle('show-effect');
						BGModal.classList.toggle('show-effect'); //
					}
				}
			});
		}

		if (unknownUser || checkoutAuth) {
			//form submit
			let numberForm = document.getElementById('numberForm');
			numberInput = numberForm.getElementsByTagName('input');
			let codeForm = document.getElementById('codeForm');
			codeInput = codeForm.getElementsByTagName('input');
			let spinner = document.querySelector('.spinner-number');

			document
				.querySelector('.back-number')
				.addEventListener('click', (e) => {
					numberCont.style.display = 'block';
					codeCont.style.display = 'none';
					document
						.querySelector('.send-tel')
						.removeAttribute('disabled');
					document
						.querySelector('.send-code-btn')
						.removeAttribute('disabled');
					clearTimeout(refreshTimeout);
					refreshBtn.style.display = 'none';
					document.querySelector('.code-error-block').textContent =
						'';
					// hiding(
					// 	codeInput[0].parentNode,
					// 	'block',
					// 	document.querySelector('.code__container-title-error')
					// );
					resetCode();
				});

			refreshBtn.addEventListener('click', (e) => {
				resetCode();
				setTimeout(
					() => sendNumber(userPhone, spinner, numberInput[0]),
					400
				);

				clearTimeout(refreshTimeout);
				refreshBtn.style.display = 'none';
				refreshTimeout = setTimeout(
					() => (refreshBtn.style.display = 'block'),
					60000
				);
			});

			numberForm.addEventListener('submit', function (e) {
				e.preventDefault();
				let numberValue = numberInput[0].value;

				if (
					numberValue !== '' &&
					!numberValue.includes('_') &&
					numberInput[1].value == ''
				) {
					let number = numberValue.replace('(', '').replace(')', '');
					userPhone = {
						phone: number,
					};

					document.querySelector('.send-tel').disabled = true;
					sendNumber(userPhone, spinner, numberInput[0]);
				}
			});

			codeForm.addEventListener('submit', function (e) {
				e.preventDefault();
				let codeValue = codeInput[0].value;

				if (codeValue.length == 6 && codeInput[1].value == '') {
					let data = {
						sms_code: codeValue,
						opencart_code: trueCode,
						phone: userPhone,
					};
					sendCode(data);
				}
			});
		}

		async function resetCode() {
			$.ajax({
				url: `index.php?route=account/login/turboSmsClearAttemps`,
				type: 'post',
				data: userPhone,
				dataType: 'json',
				success: function () {
					codeInput[0].value = '';
				},
				error: function (err) {
					throw new Error(err);
				},
			});
		}

		async function sendNumber(userPhone, spinner, hideEl = null) {
			$.ajax({
				url: `index.php?route=account/login/turboSmsGetCode`,
				type: 'post',
				data: userPhone,
				dataType: 'json',
				beforeSend: function () {
					hiding(spinner, 'inline', hideEl);
				},
				success: function (data) {
					console.log(data);

					if (data.send_sms === true && hideEl) {
						numberCont.style.display = 'none';
						codeCont.style.display = 'block';
						resTel.textContent = `+${data.phone}`;
						trueCode = data.send_code;
						userPhone = data.phone;
						location = data.location;

						//show refresh btn after 60 sec.
						refreshTimeout = setTimeout(
							() => (refreshBtn.style.display = 'block'),
							60000
						);

						hiding(hideEl, 'block', spinner);
					} else if (data.send_sms === true && !hideEl) {
						hiding(spinner, 'none', null);
						let telephoneInform =
							document.querySelector('#telephoneInform');
						telephoneInform.setAttribute('readonly', true);
						document.querySelector(
							'.modal__inform-wrapper'
						).style.display = 'block';

						trueCode = data.send_code;
						userPhone = data.phone;

						refreshTimeoutModal = setTimeout(
							() =>
								(document.querySelector(
									'.modal__refresh-code'
								).style.display = 'block'),
							60000
						);
					}
				},
				error: function (err) {
					if (hideEl) {
						hideEl.classList.add('error-input');
						setTimeout(
							() => hideEl.classList.remove('error-input'),
							5000
						);
						document
							.querySelector('.send-tel')
							.removeAttribute('disabled');
						hiding(hideEl, 'block', spinner);
					} else if (!hideEl) {
						document
							.querySelector('.modal__inform-inform-tel')
							.removeAttribute('disabled');
						hiding(spinner, 'none', null);
						let telephoneInform =
							document.querySelector('#telephoneInform');
						telephoneInform.classList.add('error-input');
						setTimeout(
							() =>
								telephoneInform.classList.remove('error-input'),
							5000
						);
					}
					throw new Error(err);
				},
			});
		}

		async function sendCode(data) {
			$.ajax({
				url: `index.php?route=account/login/turboSmsCheckCode`,
				type: 'post',
				data: data,
				dataType: 'json',
				beforeSend: function () {
					hiding(
						document.querySelector('.spinner-code'),
						'inline',
						codeInput[0].parentNode
					);
					document.querySelector('.send-code-btn').disabled = true;
				},
				success: function (data) {
					//console.log(data);
					if (
						data.code_matching === true &&
						data.is_auth === false &&
						unknownUser
					) {
						authWrapper.style.display = 'none';
						personalWrapper.classList.toggle('show-effect');
						//BGModal.classList.toggle('show');
						document.getElementById('telephone').value =
							data.telephone;
						document.getElementById('codePerson').value = data.code;
					} else if (
						(data.code_matching === false && data.try_count <= 5) ||
						(data.is_auth === true &&
							data.code_matching === false &&
							data.try_count <= 5)
					) {
						document
							.querySelector('.send-code-btn')
							.removeAttribute('disabled');
						hiding(
							codeInput[0].parentNode,
							'block',
							document.querySelector('.spinner-code')
						);
						codeInput[0].classList.add('error-input');
						setTimeout(
							() => codeInput[0].classList.remove('error-input'),
							5000
						);
						document.querySelector(
							'.code-error-block'
						).textContent = data.code_error;
					} else if (
						(data.code_matching === false && data.try_count > 5) ||
						(data.is_auth === true &&
							data.code_matching === false &&
							data.try_count > 5)
					) {
						hiding(
							codeInput[0].parentNode,
							'block',
							document.querySelector('.spinner-code')
						);
						document
							.querySelector('.send-code-btn')
							.removeAttribute('disabled');
						codeInput[0].classList.add('error-input');
						setTimeout(
							() => codeInput[0].classList.remove('error-input'),
							5000
						);
						document.querySelector(
							'.code-error-block'
						).textContent = data.try_error;
						refreshBtn.style.display = 'block';
					} else if (
						data.is_auth === true &&
						data.code_matching === true
					) {
						document.querySelector('.location-login').value =
							location;
						// hiding(
						// 	codeInput[0].parentNode,
						// 	'block',
						// 	document.querySelector('.spinner-code')
						// );
						document.getElementById('codeForm').submit();
					} else if (data.is_auth === false && !unknownUser) {
						hiding(
							codeInput[0].parentNode,
							'block',
							document.querySelector('.spinner-code')
						);

						hiding(
							document.querySelector(
								'.code__container-title-error'
							),
							'block',
							codeInput[0].parentNode
						);
						clearTimeout(refreshTimeout);
						refreshBtn.style.display = 'none';
						document.querySelector(
							'.code-error-block'
						).textContent = '';
					}
				},
				error: function (err) {
					hiding(
						codeInput[0].parentNode,
						'block',
						document.querySelector('.spinner-code')
					);
					document
						.querySelector('.send-code-btn')
						.removeAttribute('disabled');
					codeInput[0].classList.add('error-input');
					setTimeout(
						() => codeInput[0].classList.remove('error-input'),
						5000
					);
					throw new Error(err);
				},
			});
		}

		if (unknownUser) {
			let personalForm = document.querySelector('#personal-data');
			personalForm.addEventListener('submit', function (e) {
				e.preventDefault();
				if (
					personalForm.querySelector('input[name="chekoutPersone"]')
						.value == ''
				) {
					personalForm.submit();
				}
			});
		}
		//}

		//? mob menu
		if (menuIcon) {
			let femaleSub = document.querySelector('#female-mob-sub');
			let maleSub = document.querySelector('#male-mob-sub');
			let childSub = document.querySelector('#child-mob-sub');

			menuIcon.addEventListener('click', (e) => {
				menuModal.classList.toggle('active-modal');
				bodyModal.classList.toggle('active-modal');
			});
			//!сделать универсальным
			document.addEventListener('click', function (e) {
				if (
					e.target.classList.contains('active-modal') ||
					e.target.classList.contains('menu__mobile-close')
				) {
					menuModal.classList.toggle('active-modal');
					bodyModal.classList.toggle('active-modal');
				}

				if (
					e.target.classList.contains('female-js') ||
					e.target.parentNode.classList.contains('female-js')
				) {
					femaleSub.classList.toggle('show-effect');
				}

				if (
					e.target.classList.contains('male-js') ||
					e.target.parentNode.classList.contains('male-js')
				) {
					maleSub.classList.toggle('show-effect');
				}

				if (
					e.target.classList.contains('child-js') ||
					e.target.parentNode.classList.contains('child-js')
				) {
					childSub.classList.toggle('show-effect');
				}

				if (e.target.classList.contains('menu__mob-sub-title')) {
					e.target.parentNode.classList.toggle('show-effect');
				}
			});
		}
	})();
	//! SWIPERs
	(function () {
		//* nuot page modal slider
		let nuotModals = document.querySelectorAll('.nuot-modal-swiper');
		if (nuotModals.length > 0) {
			let sliders = [];
			nuotModals.forEach((i) => {
				let next = i.parentNode.querySelector(
					'.nuot-modal-swiper-next'
				);
				let prev = i.parentNode.querySelector(
					'.nuot-modal-swiper-prev'
				);
				let scrollbar = i.parentNode.querySelector(
					'.nuot-modal-scrollbar'
				);

				const nuotModalSwiper = new Swiper(i, {
					watchOverflow: true,
					spaceBetween: 20,
					slidesPerView: 2,
					navigation: {
						nextEl: next,
						prevEl: prev,
					},
					scrollbar: {
						el: scrollbar,
						draggable: true,
					},
					breakpoints: {
						1024: {
							watchOverflow: true,
							spaceBetween: 57,
							slidesPerView: 2,
							navigation: {
								nextEl: next,
								prevEl: prev,
							},
							scrollbar: {
								el: scrollbar,
								draggable: true,
							},
						},
						520: {
							watchOverflow: true,
							spaceBetween: 12,
							slidesPerView: 2,
							navigation: {
								nextEl: next,
								prevEl: prev,
							},
							scrollbar: {
								el: scrollbar,
								draggable: true,
							},
						},
					},
				});

				sliders.push(nuotModalSwiper);
			});

			let nuoItems = document.querySelectorAll('.gallery-nuo-item');
			nuoItems.forEach((i) => {
				i.addEventListener('click', (e) => {
					setTimeout(() => {
						if (Array.isArray(sliders)) {
							sliders.map((i) => {
								i.update();
							});
						} else {
							sliders.update();
						}
					}, 400);
				});
			});

			// if (Array.isArray(productCardSwiper)) {
			// 	productCardSwiper.map((i) => {
			// 		i.update();
			// 	});
			// } else {
			// 	productCardSwiper.update();
			// }

			// $('#myModal').on('hidden.bs.modal', function (event) {
			// 	// сделайте что-нибудь...
			// })
		}
		//*new collection
		let newСollection = document.querySelector('.new-collection-slider');
		if (newСollection) {
			if (window.matchMedia('(max-width: 520px)').matches) {
				swiperInit();
			}

			function swiperInit() {
				const newCollectionSwiper = new Swiper(
					'.new-collection-slider',
					{
						pagination: {
							el: '.new-collection-pagination',
						},
						// autoplay: {
						// 	delay: 5000,
						// },
						watchOverflow: true,
						breakpoints: {
							521: {
								slidesPerView: 3,
							},
						},
					}
				);
			}
		}
		//*sale
		let sale = document.querySelector('.sale__swiper');
		if (sale) {
			const saleSwiper = new Swiper('.sale__swiper', {
				watchOverflow: true,
				pagination: {
					el: '.sale-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					769: {
						navigation: {
							nextEl: '.sale-swiper-next',
							prevEl: '.sale-swiper-prev',
						},
						pagination: {
							el: '.sale-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.sale-swiper-scrollbar',
							draggable: true,
						},
					},
				},
			});
		}
		//*blog
		let blog = document.querySelector('.blog__swiper');
		if (blog) {
			const blogSwiper = new Swiper('.blog__swiper', {
				watchOverflow: true,
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					el: '.blog-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					769: {
						spaceBetween: 20,
						navigation: {
							nextEl: '.blog-swiper-next',
							prevEl: '.blog-swiper-prev',
						},
						pagination: {
							el: '.blog-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.blog-swiper-scrollbar',
							draggable: true,
						},
						slidesPerView: 2,
					},
					641: {
						slidesPerView: 2,
					},
				},
			});
		}
		//*slider-cards ang similar ???
		let newBlock = document.querySelector('.slider-cards__swiper');
		if (newBlock) {
			const newBlockSwiper = new Swiper('.slider-cards__swiper', {
				watchOverflow: true,
				slidesPerView: 2,
				spaceBetween: 0,
				pagination: {
					el: '.slider-cards-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					1440: {
						slidesPerView: 4,
						navigation: {
							nextEl: '.slider-cards-swiper-next',
							prevEl: '.slider-cards-swiper-prev',
						},
						pagination: {
							el: '.slider-cards-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.slider-cards-swiper-scrollbar',
							draggable: true,
						},
					},
					1170: {
						slidesPerView: 3,
						navigation: {
							nextEl: '.slider-cards-swiper-next',
							prevEl: '.slider-cards-swiper-prev',
						},
						pagination: {
							el: '.slider-cards-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.slider-cards-swiper-scrollbar',
							draggable: true,
						},
					},
					769: {
						spaceBetween: 6,
						slidesPerView: 2,
						navigation: {
							nextEl: '.slider-cards-swiper-next',
							prevEl: '.slider-cards-swiper-prev',
						},
						pagination: {
							el: '.slider-cards-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.slider-cards-swiper-scrollbar',
							draggable: true,
						},
					},
				},
			});
		}
		//*slider also-buy
		let also = document.querySelector('.also-buy__swiper');
		if (also) {
			const alsoBlockSwiper = new Swiper('.also-buy__swiper', {
				watchOverflow: true,
				slidesPerView: 2,
				spaceBetween: 0,
				pagination: {
					el: '.also-buy-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					1440: {
						slidesPerView: 4,
						navigation: {
							nextEl: '.also-buy-swiper-next',
							prevEl: '.also-buy-swiper-prev',
						},
						pagination: {
							el: '.also-buy-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.also-buy-swiper-scrollbar',
							draggable: true,
						},
					},
					1170: {
						slidesPerView: 3,
						navigation: {
							nextEl: '.also-buy-swiper-next',
							prevEl: '.also-buy-swiper-prev',
						},
						pagination: {
							el: '.also-buy-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.also-buy-swiper-scrollbar',
							draggable: true,
						},
					},
					769: {
						spaceBetween: 6,
						slidesPerView: 2,
						navigation: {
							nextEl: '.also-buy-swiper-next',
							prevEl: '.also-buy-swiper-prev',
						},
						pagination: {
							el: '.also-buy-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.also-buy-swiper-scrollbar',
							draggable: true,
						},
					},
				},
			});
		}
		//*slider recently
		let recently = document.querySelector('.recently-watched__swiper');
		if (recently) {
			const recentlyBlockSwiper = new Swiper(
				'.recently-watched__swiper',
				{
					watchOverflow: true,
					slidesPerView: 2,
					spaceBetween: 0,
					pagination: {
						el: '.recently-swiper-pagination',
						type: 'bullets',
					},
					breakpoints: {
						1440: {
							slidesPerView: 4,
							navigation: {
								nextEl: '.recently-swiper-next',
								prevEl: '.recently-swiper-prev',
							},
							pagination: {
								el: '.recently-swiper-pagination',
								type: 'fraction',
							},
							scrollbar: {
								el: '.recently-swiper-scrollbar',
								draggable: true,
							},
						},
						1170: {
							slidesPerView: 3,
							navigation: {
								nextEl: '.recently-swiper-next',
								prevEl: '.recently-swiper-prev',
							},
							pagination: {
								el: '.recently-swiper-pagination',
								type: 'fraction',
							},
							scrollbar: {
								el: '.recently-swiper-scrollbar',
								draggable: true,
							},
						},
						769: {
							spaceBetween: 6,
							slidesPerView: 2,
							navigation: {
								nextEl: '.recently-swiper-next',
								prevEl: '.recently-swiper-prev',
							},
							pagination: {
								el: '.recently-swiper-pagination',
								type: 'fraction',
							},
							scrollbar: {
								el: '.recently-swiper-scrollbar',
								draggable: true,
							},
						},
					},
				}
			);
		}
		//*slider product card
		let product = document.querySelector('.product-swiper ');
		if (product && window.matchMedia('(max-width: 1024px)').matches) {
			const productSwiper = new Swiper('.product-swiper', {
				breakpoints: {
					769: {
						watchOverflow: true,
						//width: 768,
						spaceBetween: 5,
						slidesPerView: 2,
						// pagination: {
						// 	el: '.product-slider-pagination',
						// 	type: 'bullets',
						// },
					},
				},
				slidesPerView: 1,
				pagination: {
					el: '.product-slider-pagination',
					type: 'bullets',
				},
			});
		}
	})();

	//! review
	(function () {
		//open reviewer form
		let reviewListener = document.querySelector('.add-review-listener');
		if (reviewListener) {
			let reviewCont = document.querySelector('.review__continer');

			reviewListener.addEventListener('click', (e) => {
				//reviewCont.style.display = 'block';
				reviewCont.classList.toggle('show-review-continer');
				reviewListener
					.querySelector('._icon-cancel')
					.classList.toggle('rotate');
			});

			let reviewForm = document.querySelector('.review-form');
			if (reviewForm) {
				reviewForm.addEventListener('submit', (e) => {
					e.preventDefault();
					let textInput = reviewForm.querySelector('#reviewer');
					let nameInput = reviewForm.querySelector('#reviewerName');
					let telInput = reviewForm.querySelector('#telephoneInput');
					let raitingInput =
						reviewForm.querySelector('input:checked');
					let telErr = document.querySelector('.review__errors-tel');
					let raitingErr = document.querySelector(
						'.review__errors-raiting'
					);
					let otherErr = document.querySelector(
						'.review__errors-other'
					);
					let success = document.querySelector('.review-success');
					let product = document.querySelector('.buy__container');
					let productId = product.getAttribute('data-id');
					let reviewBtn = document.querySelector('.review-btn');

					if (nameInput.value == '' || telInput.value == '') {
						showError(otherErr);
					} else if (!raitingInput) {
						showError(raitingErr);
					} else if (telInput.value.includes('_')) {
						showError(telErr);
					} else {
						reviewBtn.disabled = true;

						let data = {
							name: nameInput.value,
							telephone: telInput.value,
							text: textInput.value,
							rating: raitingInput.value,
						};

						$.ajax({
							url: `index.php?route=product/product/write&product_id=${productId}`,
							type: 'post',
							data: data,
							dataType: 'json',
							success: function (data) {
								nameInput.value = '';
								telInput.value = '';
								textInput.value = '';
								raitingInput.checked = false;
								reviewBtn.disabled = false;
								reviewForm.style.display = 'none';
								success.style.display = 'block';
							},
							error: function (err) {
								nameInput.classList.add('error-input');
								telInput.classList.add('error-input');
								textInput.classList.add('error-input');
								reviewBtn.disabled = false;

								setTimeout(() => {
									nameInput.classList.remove('error-input');
									telInput.classList.remove('error-input');
									textInput.classList.remove('error-input');
								}, 5000);
								throw new Error(err);
							},
						});
					}
				});

				function showError(item) {
					item.style.display = 'block';
					setTimeout(() => {
						item.style.display = 'none';
					}, 4000);
				}
			}
		}
		//reviewer show more...
		let reviewerMore = document.querySelectorAll('.reviewer-more');
		if (reviewerMore.length > 0) {
			let ratingLink = document.querySelector(
				'.card__description__rating-link'
			);
			ratingLink.addEventListener('click', (e) => {
				setTimeout(() => {
					reviewerMore.forEach((i) => {
						let previous = i.previousElementSibling;
						//console.log(i.previousElementSibling.clientHeight);
						if (previous.clientHeight === 64) {
							i.style.display = 'block';
						}

						i.addEventListener('click', (e) => {
							initAction();
						});

						previous.addEventListener('click', (e) => {
							initAction();
						});

						function initAction() {
							if (previous.clientHeight === 64) {
								previous.style.maxHeight = '350px';
								i.style.color = '#EEEAE7';
							} else {
								previous.style.maxHeight = '64px';
								i.style.color = '#555555';
							}
						}
					});
				}, 400);
			});
		}
	})();

	//! basket
	(function () {
		let headerbag = document.querySelector('.header-bag');
		let basketModal = document.querySelector('#menu__mobile-modal');
		let basketWrapp;
		let closeBasket;
		let basketContinue;
		let orderPage = document.querySelector('.ordering__wrapper');
		let infoAvailability = document.getElementById('infoAvailability');

		if (headerbag) {
			basketWrapp = document.querySelector('.header__basket-wrapper');
			closeBasket = basketWrapp.querySelector('.close-basket');
			basketContinue = basketWrapp.querySelector(
				'.basket__submit-continue'
			);
		}

		// show/close basket
		if (headerbag) {
			headerbag.addEventListener('click', (e) => {
				if (e.target.classList.contains('header-bag')) {
					basketWrapp.classList.toggle('show-effect');
					basketModal.classList.toggle('active-modal-basket');
				}
				isEmpty();
			});

			closeBasket.addEventListener('click', (e) => {
				basketWrapp.classList.toggle('show-effect');
				basketModal.classList.toggle('active-modal-basket');
			});

			basketContinue.addEventListener('click', (e) => {
				basketWrapp.classList.toggle('show-effect');
				basketModal.classList.toggle('active-modal-basket');
			});

			document.addEventListener('click', function (e) {
				let target = e.target;
				detectClickOut(basketWrapp, headerbag, target);
			});
		}

		//working functions
		//! доработать функцию!
		function detectClickOut(container, icon, target) {
			let itsContainer =
				target == container || container.contains(target);
			let itsBtn = target == icon;
			let isActive = container.classList.contains('show-effect');

			if (!itsContainer && !itsBtn && isActive) {
				basketWrapp.classList.toggle('show-effect');
				basketModal.classList.toggle('active-modal-basket');
			}
		}

		function isEmpty() {
			let basketContent = document.querySelectorAll('.basket__item');

			if (orderPage && basketContent.length == 0) {
				window.location.replace(window.location.origin);
			} else if (!orderPage && basketContent.length == 0) {
				basketWrapp.querySelector('.basket__empty').style.display =
					'block';
				basketWrapp.querySelector(
					'.basket__count-container'
				).style.display = 'none';
				basketWrapp.querySelector(
					'.basket__submit-cont'
				).style.display = 'none';
			} else if (!orderPage && basketContent.length !== 0) {
				basketWrapp.querySelector('.basket__empty').style.display =
					'none';
				basketWrapp.querySelector(
					'.basket__count-container'
				).style.display = 'block';
				basketWrapp.querySelector(
					'.basket__submit-cont'
				).style.display = 'flex';
			}
		}

		function setToBasketIcon(sum) {
			let basket = document.querySelector('.products-total');
			removeAllChildNodes(basket);

			if (sum > 0) {
				basket.insertAdjacentHTML('beforeend', `(${sum})`);
			}
		}

		function setChecoutData(data) {
			// let totalWithPromo = document.querySelector('.item-total');
			let totalWithOutPromo = document.querySelector('.item-sum');
			// let totalItems = document.querySelector('.item-count-number');
			document.querySelector('.item-count-number').textContent =
				data.products_total_count;

			if (data.sale_total_price == 0) {
				totalWithOutPromo.textContent = data.product_total_price;
			} else {
				totalWithOutPromo.textContent = data.sale_total_price;
			}
			//console.log(data);
		}

		function showBasketModal() {
			let universal = document.querySelector('#universalModal');
			universal.querySelectorAll('.universalModal').forEach((i) => {
				i.style.display = 'none';
			});
			document.querySelector('.importantSizeModal').style.display =
				'block';
			$('#universalModal').modal();
		}

		//add to basket
		// init with main button
		let addBtn = document.querySelector('.buy__container-btn');
		if (addBtn) {
			addBtn.addEventListener('click', (e) => {
				let mainSizes = document.querySelector('.main-sizes');
				let active = mainSizes.querySelector('.active-size');
				if (active) {
					let id = active.parentNode.getAttribute('data-id');
					let size = active.textContent;
					let shop = active.getAttribute('data-shop');

					if (size == 'ONE') {
						addAjax(id, shop);
					} else {
						addAjax(id, shop, size);
					}

					shopAddAjax(shop);
					active.classList.toggle('active-size');
				} else {
					showBasketModal();
				}
			});
		}
		// init with reserve button
		let reserveBtn = document.querySelectorAll('.city__reserve');
		if (reserveBtn.length > 0) {
			reserveBtn.forEach((i) => {
				i.addEventListener('click', (e) => {
					let active = i.parentNode.querySelector('.active-size');
					if (active) {
						let id = i.parentNode.getAttribute('data-id');
						let size = active.textContent;
						let shop = i.parentNode.getAttribute('data-shop');

						if (size == 'ONE') {
							addAjax(id, shop);
						} else {
							addAjax(id, shop, size);
							//console.log(id, size);
						}

						shopAddAjax(shop);
						active.classList.toggle('active-size');
						$('#availability').modal('toggle');
					} else {
						$('#availability').modal('toggle');
						showBasketModal();
					}
				});
			});
		}
		//init add
		document.querySelectorAll('[data-stock-status]').forEach((i) => {
			i.addEventListener('click', (e) => {
				let stockStatus = i.getAttribute('data-stock-status');
				let parent = i.parentNode;
				let clList = parent.classList;
				let id = parent.getAttribute('data-id');
				let shop = parent.getAttribute('data-shop');
				let size = i.textContent;
				let clazz;
				let citySizes =
					i.parentNode.parentNode.parentNode.classList.contains(
						'city__sizes'
					);
				let cityShop =
					i.parentNode.parentNode.parentNode.getAttribute(
						'data-shop'
					);
				let cityId =
					i.parentNode.parentNode.parentNode.getAttribute('data-id');

				if (
					window.matchMedia('(min-width: 640px)').matches &&
					clList.contains('product__sizes-container')
				) {
					clazz = 11;
					isStokStatus(clazz);
				} else if (clList.contains('product__buy-container')) {
					clazz = 12;
					isStokStatus(clazz);
				} else if (
					clList.contains('card__description__sizes-block') &&
					!citySizes
				) {
					clazz = 13;
					isStokStatus(clazz);
				} else if (citySizes) {
					clazz = 14;
					isStokStatus(clazz);
				} else if (clList.contains('buy__container')) {
					clazz = 15;
					isStokStatus(clazz);
				} else if (clList.contains('city__sizes')) {
					$('#availability').modal('hide');
					clazz = 16;
					isStokStatus(clazz);
				} else if (clList.contains('table__btns-container')) {
					clazz = 17;
					isStokStatus(clazz);
				}
				//сделать глобально
				function isStokStatus(clazz) {
					if (stockStatus == 1 && (clazz == 13 || clazz == 14)) {
						i.parentNode
							.querySelectorAll('.card__description-size')
							.forEach((i) => {
								i.classList.remove('active-size');
							});
						i.classList.toggle('active-size');
					} else if (stockStatus == 1 && clazz == 12) {
						shopAddAjax(shop);
						addAjax(id, shop);
					} else if (stockStatus == 1 && clazz == 11) {
						shopAddAjax(shop);
						addAjax(id, shop, size);
					} else if (stockStatus == 2 && clazz == 13) {
						if (size == 'ONE') {
							preOrder(id, shop);
						} else {
							preOrder(id, shop, size);
						}
					} else if (stockStatus == 2 && clazz == 12) {
						preOrder(id, shop);
					} else if (stockStatus == 2 && clazz == 11) {
						preOrder(id, shop, size);
					} else if (stockStatus == 3 && clazz == 12) {
						informAbout(id);
					} else if (stockStatus == 3 && clazz == 11) {
						informAbout(id, size);
					} else if (stockStatus == 3 && clazz == 13) {
						if (size == 'ONE') {
							informAbout(id);
						} else {
							informAbout(id, size);
						}
					} else if (
						(stockStatus == 2 && clazz == 14) ||
						(stockStatus == 3 && clazz == 14)
					) {
						preOrder(cityId, cityShop, size);
						$('#availability').modal('hide');
					} else if (
						(stockStatus == 1 && clazz == 15) ||
						(stockStatus == 1 && clazz == 17)
					) {
						shopAddAjax(shop);
						addAjax(id, shop);
					} else if (
						(stockStatus == 2 && clazz == 15) ||
						(stockStatus == 2 && clazz == 17)
					) {
						preOrder(id, shop);
					} else if (
						(stockStatus == 3 && clazz == 15) ||
						(stockStatus == 3 && clazz == 17)
					) {
						informAbout(id);
					} else if (stockStatus == 1 && clazz == 16) {
						shopAddAjax(shop);
						addAjax(id, shop);
					} else if (
						(stockStatus == 2 && clazz == 16) ||
						(stockStatus == 3 && clazz == 16)
					) {
						preOrder(id, shop);
					}
				}
			});
		});
		// //init informAbout checkout page
		// if (orderPage) {
		// 	let basketInform = document.querySelectorAll('.basket__inform');
		// 	basketInform.forEach((i) => {
		// 		i.addEventListener('click', (e) => {
		// 			console.log('order page inform me');
		// 		});
		// 	});
		// }

		function informAbout(id, size = 'ONE') {
			let showSize = infoAvailability.querySelector('.pre-size');
			removeAllChildNodes(showSize);

			showSize.insertAdjacentHTML(
				'afterbegin',
				`<button type="button" class="card__description-size" data-confirm=${id}>${size}</button>`
			);

			$(infoAvailability).modal();
		}

		function preOrder(id, shop, size = 'ONE') {
			let modal = document.querySelector('#preOrderModal');
			let basketSize = modal.querySelector('.pre-size');
			removeAllChildNodes(basketSize);

			basketSize.insertAdjacentHTML(
				'afterbegin',
				`<button type="button" class="card__description-size" data-shop="${shop}" data-confirm=${id}>${size}</button>`
			);

			$('#preOrderModal').modal();
		}

		let confirm = document.querySelector('.confirm__pre-order');
		if (confirm) {
			confirm.addEventListener('click', (e) => {
				let confirmItem = document.querySelector('[data-confirm]');
				let confirmId = confirmItem.getAttribute('data-confirm');
				let shopId = confirmItem.getAttribute('data-shop');
				let confirmSize = confirmItem.textContent;

				if (confirmSize == 'ONE') {
					addAjax(confirmId, shopId);
				} else {
					addAjax(confirmId, shopId, confirmSize);
				}

				shopAddAjax(shopId);
			});
		}

		//shop ajax
		function shopAddAjax(shop) {
			let data = {
				shop_id: shop,
			};

			$.ajax({
				url: 'index.php?route=product/product/resorvedOfflineProduct',
				type: 'post',
				data: data,
				dataType: 'json',
				success: function (data) {
					console.log('ok');
				},
				error: function (err) {
					throw new Error(err);
				},
			});
		}

		function addAjax(id, shop, size = '') {
			let data = {
				product_id: id,
				quantity: 1,
				shop_id: shop,
				option: {
					[id]: size,
				},
			};

			$.ajax({
				url: 'index.php?route=checkout/cart/add',
				type: 'post',
				data: data,
				dataType: 'json',
				success: function (data) {
					basketRendering(data);
				},
				error: function (err) {
					throw new Error(err);
				},
			});
		}

		function basketRendering(data) {
			let basketContainer = document.querySelector('.basket__items');
			let basketTotal = document.querySelector(
				'.basket__count-container'
			);
			removeAllChildNodes(basketContainer);
			removeAllChildNodes(basketTotal);

			basketTotal.insertAdjacentHTML(
				'beforeend',
				`
				<div class="basket__count">
                    <div class="basket__count-title">${data.total[0].product_total_title}</div>
                    <div class="basket__count-price">${data.total[0].product_total_price}</div>
                </div>
			`
			);

			data.cart.forEach((i) => {
				basketContainer.insertAdjacentHTML(
					'beforeend',
					`
					<div class="basket__item">
						<a href="${i.product_href}" class="basket__img">
							<img src="${i.product_thumb}" alt="">
						</a>
						<div class="basket__info">
							<div class="basket__info-title">
								<a href="${i.product_href}" class="basket__info-title-text">${i.product_name}</a>
								<div role="button" class="_icon-cancel" data-remove-id=${i.cart_id}></div>
							</div>
							<div class="basket__info-art">Арт. ${i.product_sku}</div>
							<div class="basket__info__details">
								<div class="basket__info__details-sub">
									<div class="basket__info__details-size">${i.product_size}</div>
									<div class="basket__info__details-amount">
										<div class="spinner-basket-container">
											<div class="spinner-border spinner-basket" role="status">
												<span class="sr-only">Загрузка...</span>
											</div>
										</div>
										<button class="step stepDown" type="button" data-edit-id="${i.cart_id}">-</button>
										<input type="number" min="1" max="${i.max}" value="${i.product_quantity}" readonly="" class="details-amount">
										<button class="step stepUp" type="button" data-edit-id="${i.cart_id}">+</button>
									</div>
								</div>
								<div class="basket__info__price">
									<div class="basket__info__price-title">${i.product_title}</div>
									<div class="basket__info__price-cost">${i.product_price}</div>
								</div>
							</div>
						</div>
					</div>
				`
				);
			});

			basketWrapp.classList.toggle('show-effect');
			basketModal.classList.toggle('active-modal-basket');

			setToBasketIcon(data.total[0].products_total_count);
			removeInit();
			isEmpty();
			stepEdit();
		}

		//init editing
		function stepEdit() {
			let step = document.querySelectorAll('.step');

			if (step.length > 0) {
				step.forEach((i) => {
					i.addEventListener('click', (e) => {
						let value =
							i.parentNode.querySelector('.details-amount').value;
						let id = i.getAttribute('data-edit-id');

						if (
							i.classList.contains('stepUp') &&
							!i.classList.contains('disabled-item')
						) {
							editAjax(value, id, '+', i);
						}

						if (i.classList.contains('stepDown')) {
							editAjax(value, id, '-', i);
						}
					});
				});
			}
		}
		stepEdit();

		function editAjax(quantity, id, step, i) {
			let spinnerEl = i.parentNode.querySelector(
				'.spinner-basket-container'
			);

			let promo = '';
			let certificate = '';
			let magazineId = '';

			if (document.querySelector('.shopping__inform-promo')) {
				promo = document.querySelector('.shopping__inform-promo').value;
			}

			if (document.querySelector('.shopping__inform-certificate')) {
				certificate = document.querySelector(
					'.shopping__inform-certificate'
				).value;
			}

			if (orderPage) {
				magazineId =
					i.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
						'data-magazine-id'
					);
			}

			let data = {
				quantity: quantity,
				key: id,
				step: step,
				promo: promo,
				certificate: certificate,
				shop_id: magazineId,
			};

			console.log(magazineId);

			$.ajax({
				url: 'index.php?route=checkout/cart/edit',
				type: 'post',
				data: data,
				dataType: 'json',
				beforeSend: function () {
					hiding(spinnerEl, 'flex');
				},
				// complete: function() {
				// 	$('#loader').hide();
				// },
				success: function (data) {
					hiding(spinnerEl, 'none');
					if (data.is_max) {
						i.classList.add('disabled-item');
					} else {
						let stepUpBtn = i.parentNode.querySelector('.stepUp');
						stepUpBtn.classList.remove('disabled-item');

						if (orderPage) {
							setEditdata(data, i);
							setChecoutData(data);
							//вывести в функцию
							// let parentShops = document.querySelector('.shop-method');
							// parentShops.querySelector('.steps-day-v1').style.display = 'none';
							// parentShops.querySelector('.steps-day-v3').style.display = 'none';

							// let parentDelivers = document.querySelector('.other-method');
							// parentDelivers.querySelector('.steps-day-v2').style.display = 'none';
							// parentDelivers.querySelector('.steps-day-v3').style.display = 'none';
						} else {
							setEditdata(data, i);
							setToBasketIcon(data.products_total_count);
						}
					}
				},
				error: function (err) {
					hiding(spinnerEl, 'none');
					throw new Error(err);
				},
			});
		}

		function setEditdata(data, i) {
			let basketTotalPrice = document.querySelector(
				'.basket__count-price'
			);

			if (data.value > 0) {
				let input = i.parentNode.querySelector('.details-amount');
				let itemTotalPrice =
					i.parentNode.parentNode.parentNode.querySelector(
						'.basket__info__price-cost'
					);

				input.value = data.value;
				basketTotalPrice.innerHTML = data.product_total_price;
				itemTotalPrice.innerHTML = data.product_total;
			} else {
				i.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
				basketTotalPrice.innerHTML = data.product_total_price;
			}
			isEmpty();
		}

		//init deleting
		function removeInit() {
			let removeItem = document.querySelectorAll('[data-remove-id]');

			if (removeItem.length > 0) {
				removeItem.forEach((i) => {
					i.addEventListener('click', (e) => {
						if (orderPage) {
							confirmRemove(i);
						} else {
							removeAjax(i.getAttribute('data-remove-id'), i);
						}
					});
				});
			}
		}
		removeInit();

		function confirmRemove(i) {
			let confirm =
				i.parentNode.parentNode.parentNode.querySelector(
					'.confirm__basket'
				);
			confirm.style.display = 'flex';

			document.addEventListener('click', function (e) {
				let target = e.target;
				let itsSearch = target == confirm || confirm.contains(target);
				let itsBtn = target == i;
				let isActive = (confirm.style.display = 'flex');
				let no = target.classList.contains('confirm__basket-no');
				let yes = target.classList.contains('confirm__basket-yes');

				if ((!itsSearch && !itsBtn && isActive) || no || yes) {
					confirm.style.display = 'none';
				}
			});
		}

		if (orderPage) {
			document.querySelectorAll('.confirm__basket-yes').forEach((i) => {
				i.addEventListener('click', () => {
					let item =
						i.parentNode.parentNode.parentNode.querySelector(
							'[data-remove-id]'
						);
					let id = item.getAttribute('data-remove-id');
					removeAjax(id, item);
				});
			});
		}

		function removeAjax(id, i) {
			let promo = '';
			let certificate = '';

			if (document.querySelector('.shopping__inform-promo')) {
				promo = document.querySelector('.shopping__inform-promo').value;
			}

			if (document.querySelector('.shopping__inform-certificate')) {
				certificate = document.querySelector(
					'.shopping__inform-certificate'
				).value;
			}

			data = {
				key: id,
				promo: promo,
				certificate: certificate,
			};

			$.ajax({
				url: 'index.php?route=checkout/cart/remove',
				type: 'post',
				data: data,
				dataType: 'json',
				success: function (data) {
					if (orderPage) {
						// проверяем не последний ли товар (цена 0 или колличество)
						i.parentNode.parentNode.parentNode.remove();
						i.parentNode.parentNode.parentNode.remove();
						let basketTotalPrice = document.querySelector(
							'.basket__count-price'
						);
						basketTotalPrice.innerHTML = data.product_total_price;
						//вывести в функцию
						// let parentShops = document.querySelector('.shop-method');
						// parentShops.querySelector('.steps-day-v1').style.display = 'none';
						// parentShops.querySelector('.steps-day-v3').style.display = 'none';

						// let parentDelivers = document.querySelector('.other-method');
						// parentDelivers.querySelector('.steps-day-v2').style.display = 'none';
						// parentDelivers.querySelector('.steps-day-v3').style.display = 'none';
						///////////
						setChecoutData(data);
						isEmpty();
					} else {
						// console.log(data);
						i.parentNode.parentNode.parentNode.remove();
						let basketTotalPrice = document.querySelector(
							'.basket__count-price'
						);
						basketTotalPrice.innerHTML = data.product_total_price;

						isEmpty();
						setToBasketIcon(data.products_total_count);
					}
				},
				error: function (err) {
					console.log(err);
				},
			});
		}

		////////? ordering switch
		let personalTitle = document.querySelectorAll('.personal__title');
		if (personalTitle.length > 0) {
			personalTitle.forEach((i) => {
				i.addEventListener('click', (e) => {
					toggleTitle();
				});
			});
		}

		function toggleTitle() {
			personalTitle.forEach((i) => {
				i.classList.toggle('active-title');
				userOrderSwitch();
			});
		}

		function userOrderSwitch() {
			let newUser = document.querySelector('.personal-new');
			let logedUser = document.querySelector('.personal-loged');
			let newWrapper = document.querySelector('.order__user-wrapper');
			let logedWrapper = document.querySelector('.login__user-wrapper');
			let deliveryWrapper = document.querySelector('.delivery__methods');

			if (newUser.classList.contains('active-title')) {
				newWrapper.style.display = 'block';
				logedWrapper.style.display = 'none';
				deliveryWrapper.style.display = 'block';
				//или очищаем поля
			} else if (logedUser.classList.contains('active-title')) {
				//добавить проверку есть ли контейнер с авторизацией
				//или делаем запрос на сервер и заполняем поля
				newWrapper.style.display = 'none';
				logedWrapper.style.display = 'flex';
				deliveryWrapper.style.display = 'none';
			}
		}
	})();
	//! other change
	(function () {
		// filters
		//let filtersContainer = document.querySelector('.init-container');
		let filters = document.querySelector('.filters');
		if (filters) {
			let filtersContainerBtn = document.querySelector(
				'.init-container-btn'
			);
			let closeFilters = document.querySelector('.close-filters');
			let closeFilterMobile = document.querySelector(
				'.filter-title-close'
			);

			closeFilterMobile.addEventListener('click', () => {
				filters.classList.toggle('show-effect');
				addFilterStyles();
			});

			closeFilters.addEventListener('click', () => {
				filters.classList.toggle('show-effect');
				addFilterStyles();
			});

			function addFilterStyles() {
				let noUiHandle = document.querySelectorAll('.noUi-handle');

				if (
					window.matchMedia('(max-width: 1110px)').matches &&
					filters.classList.contains('show-effect')
				) {
					document.querySelector('body').style.overflow = 'hidden';
				} else {
					document.querySelector('body').style.overflow = 'auto';
				}

				if (filters.classList.contains('show-effect')) {
					setTimeout(() => {
						filters.style.boxShadow =
							'0 1px 4px -1px rgba(0, 0, 0, 0.75)';
						noUiHandle.forEach((i) => {
							i.style.border = '1px solid #30313229';
							i.style.borderRadius = '50%';
							//i.style.opacity = '1';
						});
					}, 100);
				} else {
					filters.style.boxShadow = 'none';
					noUiHandle.forEach((i) => {
						i.style.border = 'none';
						i.style.borderRadius = '0';
						//i.style.opacity = '0';
					});
				}
			}

			filtersContainerBtn.addEventListener('click', () => {
				filters.classList.toggle('show-effect');
				addFilterStyles();
			});

			let currentSelect;
			if (window.matchMedia('(min-width: 1110px)').matches) {
				window.addEventListener(
					'resize',
					function (e) {
						initSelect();
					},
					true
				);
			}

			function initSelect() {
				currentSelect = $('.filters-select2').select2({
					closeOnSelect: false,
					dropdownCssClass: 'filters-dropdown',
					language: {
						noResults: function () {
							return '...';
						},
					},
					width: '100%',
					allowHtml: true,
					allowClear: true,
				});

				currentSelect.each(function () {
					loadSelectCount($(this));

					$(this).on('change', function () {
						$(this)
							.next()
							.find('.select2-selection__choice__remove')
							.remove();
						$(this)
							.next()
							.find('.select2-selection__clear')
							.text('')
							.addClass('_icon-cancel');
						let count = $(this)
							.next()
							.find('.select2-selection__choice').length;
						let localText = $(this).attr('data-text');

						if (count > 1) {
							$(this)
								.next()
								.find('.select2-selection__choice')
								.remove();
							$(this)
								.next()
								.find('.select2-selection__rendered')
								.append(
									`<li class="select2-selection__choice">${localText}: ${count}</li>`
								);
						}

						if (count > 0) {
							$(this)
								.next()
								.find('.select2-search--inline')
								.css('display', 'none');
						} else {
							$(this)
								.next()
								.find('.select2-search--inline')
								.css('display', 'inline-block');
						}
					});
				});
			}

			initSelect();

			// let currentSelect = $('.filters-select2').select2({
			// 	closeOnSelect: false,
			// 	dropdownCssClass: 'filters-dropdown',
			// 	language: {
			// 		noResults: function () {
			// 			return '...';
			// 		},
			// 	},
			// 	width: '100%',
			// 	allowHtml: true,
			// 	allowClear: true,
			// });

			function loadSelectCount(thiz) {
				thiz.next().find('.select2-selection__choice__remove').remove();
				thiz.next()
					.find('.select2-selection__clear')
					.text('')
					.addClass('_icon-cancel');
				//console.log(thiz);

				let count = thiz
					.next()
					.find('.select2-selection__choice').length;
				let localText = thiz.attr('data-text');

				if (count > 1) {
					thiz.next().find('.select2-selection__choice').remove();
					thiz.next()
						.find('.select2-selection__rendered')
						.append(
							`<li class="select2-selection__choice">${localText}: ${count}</li>`
						);
				}

				if (count > 0) {
					thiz.next()
						.find('.select2-search--inline')
						.css('display', 'none');
				}
			}

			if (window.matchMedia('(max-width: 1110px)').matches) {
				let filterSizeBtn = document.querySelector('.filter-size-js');
				let filterParamsBtn =
					document.querySelector('.filter-params-js');
				let filterPriceBtn = document.querySelector('.filter-price-js');
				let filterRegulateBtn = document.querySelector(
					'.filter-regulate-js'
				);

				let filterSize = document.getElementById('filterSize');
				let filterPrice = document.getElementById('filterPrice');
				let filterParams = document.getElementById('filterParams');
				let filterRegulate = document.getElementById('filterRegulate');

				if (filterParams) {
					filterParams.classList.add('collapse');

					filterParamsBtn.addEventListener('click', () => {
						$('#filterParams').collapse('toggle');
						let icon = filterParamsBtn.querySelector('.icon');
						icon.classList.toggle('rotate270');
					});
				}

				filterSize.classList.add('collapse');
				filterPrice.classList.add('collapse');
				filterRegulate.classList.add('collapse');
				// $('#filterSize').collapse('hide');

				filterSizeBtn.addEventListener('click', () => {
					$('#filterSize').collapse('toggle');
					let icon = filterSizeBtn.querySelector('.icon');

					//if (filterSizeBtn.querySelector('.show')) {
					icon.classList.toggle('rotate270');
					// } else {

					// }
				});

				filterPriceBtn.addEventListener('click', () => {
					$('#filterPrice').collapse('toggle');
					let icon = filterPriceBtn.querySelector('.icon');
					icon.classList.toggle('rotate270');
					// let show =
					// 	filterPriceBtn.nextElementSibling.classList.contains(
					// 		'collapsing'
					// 	);
					// let noUiHandle = document.querySelectorAll('.noUi-handle');
					// console.log(show);

					// if (show) {
					// 	setTimeout(() => {
					// 		noUiHandle.forEach((i) => {
					// 			i.style.borderColor = 'red';
					// 		});
					// 	}, 300);
					// } else {
					// 	noUiHandle.forEach((i) => {
					// 		i.style.borderColor = 'blue';
					// 	});
					// }
				});

				filterRegulateBtn.addEventListener('click', () => {
					$('#filterRegulate').collapse('toggle');
					let icon = filterRegulateBtn.querySelector('.icon');
					icon.classList.toggle('rotate270');
				});
			}

			let html5Slider = document.getElementById('noUiSliderRange');
			let inputMin = document.getElementById('inputMin');
			let inputMax = document.getElementById('inputMax');
			let inputMinСhose = inputMin.getAttribute('data-chose');
			let inputMaxСhose = inputMax.getAttribute('data-chose');

			noUiSlider.create(html5Slider, {
				start: [Number(inputMinСhose), Number(inputMaxСhose)],
				step: 100,
				connect: true,
				range: {
					min: Number(inputMin.value),
					max: Number(inputMax.value),
				},
			});

			html5Slider.noUiSlider.on('update', function (values, handle) {
				let value = values[handle];

				if (handle) {
					inputMax.value = Number(value);
				} else {
					inputMin.value = Number(value);
				}
			});

			let filtersForm = document.getElementById('filtersForm');
			filtersForm.addEventListener('submit', (e) => {
				e.preventDefault();
				let capcha = document.getElementById('filtersCapcha');
				let filterParams = document.getElementById('filterParams');
				let filterSize = document.getElementById('filterSize');

				if (capcha.value == '') {
					if (filterParams) {
						let allParamsArr = [];
						let allParams = document.getElementById('allFilters');
						allParams.value = allParamsArr;
						let filters =
							filterParams.querySelectorAll('option:checked');

						if (filters.length > 0) {
							filters.forEach((i) => {
								allParamsArr.push(i.value);
							});
							allParams.value = allParamsArr;
						}
					}

					let allSizesArr = [];
					let allSizes = document.getElementById('allSizes');
					allSizes.value = allSizesArr;
					let size = filterSize.querySelectorAll('option:checked');

					if (size.length > 0) {
						size.forEach((i) => {
							allSizesArr.push(i.value);
						});
						allSizes.value = allSizesArr;
					}
					filtersForm.submit();
				}

				console.log();
			});
		}
		//pagination
		let dataPage = document.querySelectorAll('[data-page]');
		if (dataPage.length > 0) {
			dataPage.forEach((i) => {
				i.addEventListener('click', () => {
					let page = document.querySelector('.pagination-page-input');
					page.value = i.getAttribute('data-page');
					let path = document.querySelector('.pagination-path-input');
					path.value = i.getAttribute('data-path');
					let form = document.querySelector('#paginationForm');
					form.setAttribute('action', page.value);
					form.submit();
				});
			});
		}
		//personal start
		// $('body').on('input', '.input-words', function(){
		// 	this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
		// });
		//personal
		let historyContainer = document.querySelector('.history-container');
		if (historyContainer) {
			////////? personal page switch
			// let historyTitle = document.querySelectorAll('.history-title-item');
			// //if (historyTitle.length > 0) {
			// historyTitle.forEach((i) => {
			// 	i.addEventListener('click', (e) => {
			// 		toggleTitle();
			// 	});
			// });
			// //}
			// function toggleTitle() {
			// 	historyTitle.forEach((i) => {
			// 		i.classList.toggle('active-title');
			// 		userOrderSwitch();
			// 	});
			// }
			// function userOrderSwitch() {
			// 	let activeBuyTitle =
			// 		document.querySelector('.active-buy-title');
			// 	let archiveTitle = document.querySelector('.archive-title');
			// 	let activeWrapper = document.querySelector('.active__wrapper');
			// 	let archiveWrapper =
			// 		document.querySelector('.archive__wrapper');
			// 	if (activeBuyTitle.classList.contains('active-title')) {
			// 		activeWrapper.style.display = 'block';
			// 		archiveWrapper.style.display = 'none';
			// 	} else if (archiveTitle.classList.contains('active-title')) {
			// 		activeWrapper.style.display = 'none';
			// 		archiveWrapper.style.display = 'block';
			// 	}
			// }
		}
		let userContainer = document.querySelector('.user-data-container');
		if (userContainer) {
			//? validate inputs
			//? Только буквы английского и русского алфавита в поле input
			let inputWords = document.querySelectorAll('.input-words');
			inputWords.forEach((i) => {
				i.addEventListener('input', (e) => {
					i.value = i.value.replace(/[^a-zа-яёії\s]/gi, '');
				});
			});
			//personal init telefone
			let telephone = document.querySelector('.person-telephone');
			let modalLabel = document.querySelector('.personal__modal-label');
			let initTelephone;
			//let validateTelephone = false;
			let confirmContainer = document.querySelector(
				'.confirmation__container'
			);
			let confirmBtn = document.querySelector('.confirm-btn');
			let confirmText = document.querySelector('.confirmed-text');
			let confirmTitle = document.querySelector('.confirm-number-title');
			let personalCodeBtn = document.querySelector(
				'.personal__send-code'
			);
			let personalRefreshCode = document.querySelector(
				'.personal__refresh-code'
			);
			let trueCode;
			let userPhone;
			let timeoutCode;

			if (telephone.value !== '' && !telephone.value.includes('_')) {
				initTelephone = telephone.value;
			}

			//form submit
			document
				.querySelector('#user-data')
				.addEventListener('submit', (e) => {
					e.preventDefault();
					let capcha = document.querySelector('.user-persone-capcha');
					let telephoneSubmit =
						document.querySelector('.person-telephone');
					let telephoneMessage = document.querySelector(
						'.user-telephone-message'
					);

					if (
						initTelephone == telephoneSubmit.value &&
						capcha.value == ''
					) {
						sendPersonData(getValidData());
					} else {
						telephoneMessage.style.display = 'block';
						setTimeout(() => {
							telephoneMessage.style.display = 'none';
						}, 5000);
					}
				});

			function getValidData() {
				let lastname = document.getElementById('user-lastname');
				// if (lastname.value == '') {
				// 	lastname.nextElementSibling.classList.add('error-label');
				// 	return false;
				// }
				let firstname = document.getElementById('user-firstname');
				// if (firstname.value == '') {
				// 	firstname.nextElementSibling.classList.add('error-label');
				// 	return false;
				// }
				let patronymic = document.getElementById('user-patronymic');
				// if (patronymic.value == '') {
				// 	patronymic.nextElementSibling.classList.add('error-label');
				// 	return false;
				// }
				let email = document.getElementById('user-email');
				// if (email.value == '') {
				// 	email.nextElementSibling.classList.add('error-label');
				// 	return false;
				// }
				let date = document.getElementById('user-date_of_birth');
				// if (date.value == '') {
				// 	date.nextElementSibling.classList.add('error-label');
				// 	return false;
				// }
				let telephone = document.getElementById('user-telephone');
				let number = telephone.value.replace('(', '').replace(')', '');
				// if (telephone.value.includes('_')) {
				// 	telephone.nextElementSibling.classList.add('error-label');
				// 	return false;
				// } else {
				// 	return {};
				// }
				let gender = document.getElementById('user-gender');

				// console.log(initTelephone);
				// console.log(telephoneSubmite);

				return {
					lastname: lastname.value,
					firstname: firstname.value,
					middlename: patronymic.value,
					email: email.value,
					telephone: number,
					date_of_birth: date.value,
					gender: gender.value,
				};
			}

			function sendPersonData(data) {
				$.ajax({
					url: 'index.php?route=account/account/edit',
					dataType: 'json',
					type: 'post',
					data: data,
					beforeSend: function () {
						document.querySelector('.personal-btn').disabled = true;
					},
					success: function (json) {
						//console.log('ок');
						window.location.href =
							'index.php?route=account/account';
					},
					error: function (err) {
						document.querySelector(
							'.personal-btn'
						).disabled = false;
						console.log(err);
					},
				});
			}

			telephone.addEventListener('keyup', (e) => {
				let telephoneSubmit =
					document.querySelector('.person-telephone');

				if (initTelephone == telephoneSubmit.value) {
					confirmText.style.display = 'flex';
					confirmBtn.style.display = 'none';
					//document.getElementById('confirmTelefone').innerText = 'confirm';
					confirmContainer.classList.add('hight-container');
				} else {
					confirmText.style.display = 'none';
					confirmBtn.style.display = 'block';
					confirmContainer.classList.add('hight-container');
				}
			});

			confirmBtn.addEventListener('click', (e) => {
				sendNumberPersonPage();
			});

			function sendNumberPersonPage() {
				if (telephone.value !== '' && !telephone.value.includes('_')) {
					confirmBtn.disabled = true;
					let number = telephone.value
						.replace('(', '')
						.replace(')', '');
					confirmTitle.textContent = number;

					userPhone = {
						phone: number,
					};

					sendNumberAjax(userPhone);
					//$('#personalConfirm').modal();
				}
			}

			async function sendNumberAjax(userPhone) {
				$.ajax({
					url: `index.php?route=account/login/turboSmsGetCode`,
					type: 'post',
					data: userPhone,
					dataType: 'json',
					success: function (data) {
						console.log(data);

						if (data.send_sms === true) {
							$('#personalConfirm').modal();
							confirmBtn.disabled = false;
							trueCode = data.send_code;
							userPhone = data.phone;

							timeoutCode = setTimeout(
								() =>
									(personalRefreshCode.style.display =
										'block'),
								60000
							);
						}
					},
					error: function (err) {
						confirmBtn.disabled = false;
						throw new Error(err);
					},
				});
			}

			personalCodeBtn.addEventListener('click', (e) => {
				sendCodeInit();
			});

			function sendCodeInit() {
				let personalCode = document.querySelector(
					'.personal__modal-code'
				);

				if (personalCode.value.length == 6) {
					let data = {
						sms_code: personalCode.value,
						opencart_code: trueCode,
						phone: userPhone,
					};
					sendCodeAjax(data);
					personalCodeBtn.disabled = true;
				}
			}

			async function sendCodeAjax(data) {
				$.ajax({
					url: `index.php?route=account/login/turboSmsCheckCode`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						personalCodeBtn.disabled = false;

						if (data.code_matching) {
							successConfirm();
						} else if (!data.code_matching && data.try_count <= 5) {
							modalLabel.classList.add('error-label');
							document
								.querySelector('.personal__modal-code')
								.classList.add('error-input');
							setTimeout(() => {
								modalLabel.remove('error-label');
								document
									.querySelector('.personal__modal-code')
									.classList.remove('error-input');
								//document.querySelector('.personal__error-number').textContent = ''
							}, 5000);
							document.querySelector(
								'.personal__error-number'
							).style.display = 'block';
							document.querySelector(
								'.personal__error-number'
							).textContent = data.code_error;
						} else if (!data.code_matching && data.try_count > 5) {
							modalLabel.classList.add('error-label');
							document
								.querySelector('.personal__modal-code')
								.classList.add('error-input');
							setTimeout(() => {
								modalLabel.classList.remove('error-label');
								document
									.querySelector('.personal__modal-code')
									.classList.remove('error-input');
								//document.querySelector('.personal__error-number').textContent = ''
							}, 5000);

							document.querySelector(
								'.personal__error-number'
							).style.display = 'block';

							document.querySelector(
								'.personal__error-number'
							).textContent = data.code_error;

							personalRefreshCode.style.display = 'block';
							clearTimeout(timeoutCode);
						}
					},
					error: function (err) {
						personalCodeBtn.disabled = false;
						modalLabel.classList.add('error-label');
						document
							.querySelector('.personal__modal-code')
							.classList.add('error-input');
						setTimeout(() => {
							modalLabel.classList.remove('error-label');
							document
								.querySelector('.personal__modal-code')
								.classList.remove('error-input');
						}, 5000);
						throw new Error(err);
					},
				});
			}

			function successConfirm() {
				$('#personalConfirm').modal('hide');
				clearingState();
				confirmBtn.style.display = 'none';
				confirmText.style.display = 'flex';
				let telephone = document.querySelector('.person-telephone');
				initTelephone = telephone.value;
			}

			$('#personalConfirm').on('hidden.bs.modal', function (e) {
				clearingState();
			});

			function clearingState() {
				document.querySelector('.personal__send-code').value = '';
				document.querySelector(
					'.personal__error-number'
				).style.display = 'none';
				confirmTitle.textContent = '';
				clearTimeout(timeoutCode);
				personalRefreshCode.style.display = 'none';
				confirmBtn.disabled = false;
				personalCodeBtn.disabled = false;
			}

			personalRefreshCode.addEventListener('click', (e) => {
				let number = telephone.value.replace('(', '').replace(')', '');
				confirmTitle.textContent = number;

				userPhone = {
					phone: number,
				};

				resetCodeAjax(userPhone);
				setTimeout(() => sendNumberPersonPage(), 400);
				clearingState();
				timeoutCode = setTimeout(
					() => (personalRefreshCode.style.display = 'block'),
					60000
				);
			});

			async function resetCodeAjax(userPhone) {
				$.ajax({
					url: `index.php?route=account/login/turboSmsClearAttemps`,
					type: 'post',
					data: userPhone,
					dataType: 'json',
					success: function () {
						// document.querySelector('.modal__inform-code').value =
						// 	'';
					},
					error: function (err) {
						$('#personalConfirm').modal('hide');
						throw new Error(err);
					},
				});
			}
		}

		function initMobileUserDataMenu() {
			let userDataMenu = document.querySelector('.user-menu');
			let body = document.querySelector('body');
			if (userDataMenu) {
				let closeItem = document.querySelector('.close-item');
				let inforWrapper = document.querySelector(
					'.personal__information__wrapper'
				);

				userDataMenu.addEventListener(
					'click',
					listenUserDataMenu,
					true
				);
				closeItem.addEventListener('click', listenCloseItem, true);

				function listenUserDataMenu() {
					inforWrapper.classList.toggle('show-effect');
					body.classList.toggle('body-not-scroll');
				}

				function listenCloseItem() {
					inforWrapper.classList.toggle('show-effect');
					body.classList.toggle('body-not-scroll');
				}
			}
		}

		if (window.matchMedia('(max-width: 650px)').matches) {
			initMobileUserDataMenu();
		}

		// window.onresize = () => {
		// 	initMobileUserDataMenu();
		// }

		//personal end
		//fun for prevent def for a link size
		if (window.matchMedia('(min-width: 640px)').matches) {
			document
				.querySelectorAll('.product__buy-container')
				.forEach((i) => {
					i.addEventListener('click', (e) => {
						let longSize = i.classList.contains('long-size');
						if (!longSize) {
							e.preventDefault();
						}
					});
				});
		}
		//compare icon
		let compareLink = document.querySelector('.compare__card-link');
		if (compareLink) {
			compareLink.addEventListener('click', (e) => {
				let compareContainer = document.querySelector(
					'.compare__card-container'
				);
				let icon = compareContainer.querySelector('._icon-checked');
				let containsClazz = icon.classList.contains('compare-init');

				if (!containsClazz && getComputedStyle(icon).opacity == '0') {
					e.preventDefault();
					icon.classList.add('opacity-checked');
					let parent = document.querySelector('.buy__container');
					let product_id = parent.getAttribute('data-id');
					compareAjax(product_id, icon);
				} else if (!containsClazz) {
					e.preventDefault();
				}
			});

			function compareAjax(id, item) {
				$.ajax({
					url: 'index.php?route=product/compare/add',
					type: 'post',
					data: 'product_id=' + id,
					dataType: 'json',
					success: function (data) {
						if (data.total > 1) {
							item.classList.add('compare-init');
						}
						console.log(data);
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}
		}
		//compare page
		let compareWrapper = document.querySelector('.compare__wrapper');
		let checkboxes = document.querySelectorAll('.custom-checkbox');
		let mainCompare = document.getElementById('mainCompare');
		if (compareWrapper) {
			if (checkboxes.length > 0) {
				checkboxes.forEach((i) => {
					i.addEventListener('change', (e) => {
						//setCompareDisabled()
						//getCompareData(i.value);
						mainCompare.submit();
					});
				});
			}
		}

		// function setCompareDisabled() {
		// 	checkboxes.forEach((i) => {
		// 		i.disabled = true;
		// 	});
		// }

		// function getCompareData(id) {
		// 	checkboxes.forEach((i) => {
		// 		i.disabled = true;
		// 	});
		// 	let data = {
		// 		main_product_id: id
		// 	}
		// 	setCompareAjax(data);
		// }

		// function setCompareAjax(data) {
		// 	$.ajax({
		// 		url: 'index.php?route=product/compare/index',
		// 		type: 'post',
		// 		data: data,
		// 		dataType: 'json',
		// 		success: function (data) {

		// 			// if (data.total > 1) {
		// 			// 	item.classList.add('compare-init');
		// 			// }
		// 			// console.log(data);
		// 		},
		// 		error: function (err) {
		// 			throw new Error(err);
		// 		},
		// 	});
		// }
		//favorite
		//add to favorite
		let favorites = document.querySelectorAll('.favorit');
		let unknownUser = document.querySelector('.unknown-user');
		favorites.forEach((i) => {
			i.addEventListener('click', (e) => {
				let mainProductId;
				let productId = i.parentNode.querySelector('[data-id]');
				let headerFavorite =
					document.querySelector('.header-favorites');
				let target = e.target;

				if (unknownUser) {
					let universal = document.querySelector('#universalModal');
					universal
						.querySelectorAll('.universalModal')
						.forEach((i) => {
							i.style.display = 'none';
						});
					document.querySelector('.favoriteModal').style.display =
						'block';
					$('#universalModal').modal();
				} else if (productId) {
					productId = productId.getAttribute('data-id');
					let parent = i.parentNode;
					let dataProdId = i.parentNode.getAttribute('data-json');
					let dataJson = JSON.parse(dataProdId);
					setToFavorite(productId, target, dataJson, parent);
				} else {
					//одинаково с куками
					let card = document.querySelector('.card__container');
					let product = card.querySelector('[data-id]');
					mainProductId = product.getAttribute('data-id');
					setToFavorite(mainProductId, target);
				}

				function setToFavorite(id, target, i = null, parent = null) {
					$.ajax({
						url: 'index.php?route=account/wishlist/add',
						type: 'post',
						data: 'product_id=' + id,
						dataType: 'json',
						success: function (data) {
							if (i) {
								i.forEach((item) => {
									if (item.product_id == id) {
										item.added_to_wishlist =
											data.added_to_wishlist;
									}
								});
								parent.setAttribute(
									'data-json',
									JSON.stringify(i)
								);
							}

							if (data.total > 0) {
								headerFavorite.textContent = `(${data.total})`;
							} else {
								headerFavorite.textContent = '';
							}

							if (target.classList.contains('_icon-favorites')) {
								target.classList.remove('_icon-favorites');
								target.classList.add('_icon-favorites-fill');
							} else if (
								target.classList.contains(
									'_icon-favorites-fill'
								)
							) {
								target.classList.remove('_icon-favorites-fill');
								target.classList.add('_icon-favorites');
							}
						},
						error: function (err) {
							throw new Error(err);
						},
					});
				}
			});
		});
		//favorite page delete
		let favoriteWrapper = document.querySelector('.grid__favorite-wrapper');
		if (favoriteWrapper) {
			let favoritesFill = document.querySelectorAll(
				'._icon-favorites-fill'
			);
			favoritesFill.forEach((i) => {
				i.addEventListener('click', () => {
					i.parentNode.parentNode.parentNode.remove();
					let favoriteItems = document.querySelectorAll(
						'.product__card-container-item'
					);

					if (favoriteItems.length == 0) {
						document.querySelector(
							'.top__filters-wrapper'
						).style.display = 'none';
						document.querySelector(
							'.top__favorite-add-text'
						).style.display = 'block';
						document.querySelector(
							'.top__favorite-add-link'
						).style.display = 'inline-block';
					}
				});
			});
		}
		//catalog change look-by
		let gridCatalog = document.querySelector('.grid__catalog-container');
		if (gridCatalog) {
			window.onresize = () => {
				if (window.matchMedia('(max-width: 767px)').matches) {
					gridCatalog.classList.remove('grid__catalog-container-2');
					gridCatalog.classList.remove('grid__catalog-container-3');
					gridCatalog.classList.add('grid__catalog-container');
				}
			};

			let paginationItem = document.querySelectorAll(
				'.top__pagination-item'
			);
			paginationItem.forEach((i) => {
				i.addEventListener('click', (e) => {
					i.parentNode
						.querySelectorAll('.look-by-active')
						.forEach((i) => i.classList.toggle('look-by-active'));
					i.classList.toggle('look-by-active');
					let catalogContainer = i.getAttribute('data-look');
					gridCatalog.classList.remove('grid__catalog-container-2');
					gridCatalog.classList.remove('grid__catalog-container-3');
					gridCatalog.classList.remove('grid__catalog-container');
					gridCatalog.classList.add(catalogContainer);

					if (Array.isArray(productCardSwiper)) {
						productCardSwiper.map((i) => {
							i.update();
						});
					} else {
						productCardSwiper.update();
					}
				});
			});
		}
		//submit checkout form checkout page
		let checkoutForm = document.querySelector('#checkoutForm');
		if (checkoutForm) {
			$('.select__order-deliver').select2({
				minimumResultsForSearch: -1,
				width: '100%',
				//minimumResultsForSearch: -1,
				//allowClear: true,
				//placeholder: 'Выберите',
				// containerCssClass: 'error',
				// dropdownCssClass: 'test',
			});

			$('.select__order-pay').select2({
				minimumResultsForSearch: -1,
				width: '100%',
			});

			$('.select__order-step').select2({
				language: {
					noResults: function () {
						return '...';
					},
				},
				width: '100%',
			});

			let delivTitle = document.querySelector('.deliv-title');
			let titleText = document.querySelector('.stepLabel');
			let novaposhta = {
				regions: 'novaposhtaRegions',
				settlements: 'novaposhtaSettlements',
				warehouses: 'novaposhtaWarehouses',
			};
			let ukrposhta = {
				regions: 'ukrposhtaRegions',
				settlements: 'ukrposhtaSettlements',
				warehouses: 'ukrposhtaWarehouses',
			};
			let justin = {
				regions: 'justinRegions',
				settlements: 'justinSettlements',
				warehouses: 'justinWarehouses',
			};
			let currentDeliver;
			let shops = document.getElementById('shop');
			let regions = document.getElementById('regions');
			let cities = document.getElementById('cities');
			let warehouses = document.getElementById('warehouses');
			let shop = document.getElementById('shop');
			let checkoutCapcha = document.getElementById('checkoutCapcha');
			let totalItems = document.querySelector('.item-count-number');
			let totalSale = document.querySelector('.item-sum');
			let modalOrderSpinner = document.querySelector(
				'.spinner-order-container'
			);
			let modalOrderBody = document.querySelector('.modal-order-body');
			let modalOrderError = document.querySelector('.modal-order-error');
			let products = [];
			let promo = document.querySelector('.shopping__inform-promo');
			let certificate = document.querySelector(
				'.shopping__inform-certificate'
			);
			let pay = document.querySelector('#pay');
			let checkoutTotalPrice = document.querySelector(
				'.basket__count-price'
			);

			function initSelectedDeliver() {
				let deliverSelect = document.querySelector(
					'.select__order-deliver'
				);
				if (deliverSelect.value == '0') {
					changeRequired(1);
					document.querySelector('.shop-method').style.display =
						'block';
					document.querySelector('.other-method').style.display =
						'none';
					delivTitle.textContent = titleText.textContent;
				}
			}
			initSelectedDeliver();

			$('.select__order-deliver').on('select2:select', (e) => {
				if (e.params.data.id == 0) {
					changeRequired(1);
					document.querySelector('.shop-method').style.display =
						'block';
					document.querySelector('.other-method').style.display =
						'none';
					delivTitle.textContent = titleText.textContent;
					shops
						.querySelector('option:checked')
						.removeAttribute('selected');
					document.querySelector(
						'#select2-shop-container'
					).textContent = '';

					let parentV = document.querySelector('.shop-method');
					parentV.querySelector('.steps-day-v1').style.display =
						'none';
					parentV.querySelector('.steps-day-v3').style.display =
						'none';
				} else {
					changeRequired(0);
					getBasketData('0');
					document.querySelector('.other-method').style.display =
						'block';
					document.querySelector('.shop-method').style.display =
						'none';
				}

				if (e.params.data.id == 1) {
					getRegions(novaposhta.regions, e.params.data.text);
					currentDeliver = 1;
				} else if (e.params.data.id == 2) {
					getRegions(ukrposhta.regions, e.params.data.text);
					currentDeliver = 2;
				} else if (e.params.data.id == 3) {
					getRegions(justin.regions, e.params.data.text);
					currentDeliver = 3;
				}
			});

			function changeRequired(action) {
				if (action == 0) {
					regions.setAttribute('required', 'required');
					cities.setAttribute('required', 'required');
					warehouses.setAttribute('required', 'required');
					shop.removeAttribute('required');
				} else if (action == 1) {
					regions.removeAttribute('required');
					cities.removeAttribute('required');
					warehouses.removeAttribute('required');
					shop.setAttribute('required', 'required');
				}
			}

			$('.select__order-step').on('select2:select', (e) => {
				let resultId = e.params.data._resultId;
				if (resultId.includes('regions')) {
					if (currentDeliver == 1) {
						getCities(novaposhta.settlements, e.params.data.id);
					} else if (currentDeliver == 2) {
						getCities(ukrposhta.settlements, e.params.data.id);
					} else if (currentDeliver == 3) {
						getCities(justin.settlements, e.params.data.id);
					}
				} else if (resultId.includes('cities')) {
					if (currentDeliver == 1) {
						getWarehouses(novaposhta.warehouses, e.params.data.id);
					} else if (currentDeliver == 2) {
						getWarehouses(ukrposhta.warehouses, e.params.data.id);
					} else if (currentDeliver == 3) {
						getWarehouses(justin.warehouses, e.params.data.id);
					}
				} else if (resultId.includes('shop')) {
					getBasketData(e.params.data.id);
				}
			});

			function getRegions(deliverRout, deliverTitle) {
				let data = {
					shipping_provider: deliverTitle,
				};

				$.ajax({
					url: `index.php?route=checkout/checkout/${deliverRout}`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						let delivTitle = document.querySelector('.deliv-title');
						delivTitle.textContent = data.shipping_provider;
						removeAllChildNodes(regions);
						removeAllChildNodes(cities);
						removeAllChildNodes(warehouses);
						data.regions.forEach((i) => {
							regions.insertAdjacentHTML(
								'beforeend',
								`<option value='${i.id}'>${i.name}</option>`
							);
						});
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			function getCities(deliverRout, id) {
				let data = {
					region_id: id,
				};

				$.ajax({
					url: `index.php?route=checkout/checkout/${deliverRout}`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						removeAllChildNodes(cities);
						removeAllChildNodes(warehouses);
						data.forEach((i) => {
							cities.insertAdjacentHTML(
								'beforeend',
								`<option value='${i.id}'>${i.name}</option>`
							);
						});
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			function getWarehouses(deliverRout, id) {
				let data = {
					settlement_id: id,
				};

				$.ajax({
					url: `index.php?route=checkout/checkout/${deliverRout}`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						removeAllChildNodes(warehouses);
						data.forEach((i) => {
							warehouses.insertAdjacentHTML(
								'beforeend',
								`<option value='${i.id}'>${i.name}</option>`
							);
						});
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			certificate.addEventListener('input', (e) => {
				certificate.classList.remove('valid-promocode');
				if (certificate.value.length > 2) {
					let data = {
						sertificate_number: certificate.value,
					};
					sendCertificate(data);
				}
			});

			function sendCertificate(data) {
				$.ajax({
					url: `index.php?route=checkout/checkout/calculateSertificate`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						//console.log(data);
						if (data.coincidence_code) {
							certificate.classList.add('valid-promocode');
							totalSale.textContent = data.total;
							promo.setAttribute('readonly', true);
						} else {
							certificate.classList.remove('valid-promocode');
							totalSale.textContent = data.total;
							promo.removeAttribute('readonly');
						}
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			promo.addEventListener('input', (e) => {
				promo.classList.remove('valid-promocode');
				if (promo.value.length > 2) {
					let data = {
						promocode_number: promo.value,
					};
					sendPromocode(data);
				}
			});

			function sendPromocode(data) {
				$.ajax({
					url: `index.php?route=checkout/checkout/calculatePromocode`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						if (data.coincidence_code) {
							promo.classList.add('valid-promocode');
							totalSale.textContent = data.total;
							certificate.setAttribute('readonly', true);
						} else {
							promo.classList.remove('valid-promocode');
							totalSale.textContent = data.total;
							certificate.removeAttribute('readonly');
						}
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			function getBasketData(selectId) {
				let promo = document.querySelector('.shopping__inform-promo');
				let certificate = document.querySelector(
					'.shopping__inform-certificate'
				);
				let data = {
					magazine_id: selectId,
					promocode_number: promo.value,
					sertificate_number: certificate.value,
				};

				$.ajax({
					url: `index.php?route=checkout/checkout/rewriteCartByMagazine`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						basketActualization(data);
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			function basketActualization(data) {
				if (data.magazine_id) {
					let parentV = document.querySelector('.shop-method');
					let stepDayV1 = parentV.querySelector('.steps-day-v1');
					let stepDayV3 = parentV.querySelector('.steps-day-v3');
					let obj = data.products.find((o) => o.ssid === 2);

					if (obj) {
						stepDayV1.style.display = 'none';
						stepDayV3.style.display = 'block';
					} else {
						stepDayV1.style.display = 'block';
						stepDayV3.style.display = 'none';
					}

					data.products.forEach((i) => {
						let parent = document.querySelector(
							`[data-find-id="${i.cart_id}"]`
						);
						let amount = parent.querySelector(
							'.basket__info__details-amount'
						);
						let priceCost = parent.querySelector(
							'.basket__info__price-cost'
						);
						let valueAmount =
							parent.querySelector('.details-amount');
						let underOrder = parent.querySelector(
							'.basket__under-order'
						);
						let basketInform =
							parent.querySelector('.basket__inform');

						if (i.ssid == 1) {
							amount.style.display = 'block';
							priceCost.classList.toggle('not-item');
							underOrder.style.display = 'none';
							basketInform.style.display = 'none';
						} else if (i.ssid == 2) {
							amount.style.display = 'block';
							priceCost.classList.toggle('not-item');
							underOrder.style.display = 'block';
							basketInform.style.display = 'none';
						}

						parent.setAttribute(
							'data-magazine-id',
							data.magazine_id
						);
						priceCost.textContent = i.total;
						valueAmount.value = i.quantity;
					});
				} else {
					let parentV = document.querySelector('.other-method');
					let stepDayV2 = parentV.querySelector('.steps-day-v2');
					let stepDayV3 = parentV.querySelector('.steps-day-v3');
					let obj3 = data.products.find((o) => o.ssid === 3);
					let obj2 = data.products.find((o) => o.ssid === 2);
					let obj3Length = data.products.filter(
						(item) => item.ssid === 3
					).length;

					if (
						(obj3 && data.products.length == 1) ||
						obj3Length == data.products.length
					) {
						stepDayV2.style.display = 'none';
						stepDayV3.style.display = 'none';
					} else if (obj2) {
						stepDayV2.style.display = 'none';
						stepDayV3.style.display = 'block';
					} else {
						stepDayV2.style.display = 'block';
						stepDayV3.style.display = 'none';
					}

					data.products.forEach((i) => {
						let parent = document.querySelector(
							`[data-find-id="${i.cart_id}"]`
						);
						let amount = parent.querySelector(
							'.basket__info__details-amount'
						);
						let priceCost = parent.querySelector(
							'.basket__info__price-cost'
						);
						let valueAmount =
							parent.querySelector('.details-amount');
						let underOrder = parent.querySelector(
							'.basket__under-order'
						);
						let basketInform =
							parent.querySelector('.basket__inform');

						if (i.ssid == 1) {
							amount.style.display = 'block';
							priceCost.classList.toggle('not-item');
							underOrder.style.display = 'none';
							basketInform.style.display = 'none';
						} else if (i.ssid == 2) {
							amount.style.display = 'block';
							priceCost.classList.toggle('not-item');
							underOrder.style.display = 'block';
							basketInform.style.display = 'none';
						} else if (i.ssid == 3) {
							amount.style.display = 'none';
							priceCost.classList.toggle('not-item');
							underOrder.style.display = 'none';
							basketInform.style.display = 'block';
						}

						parent.setAttribute('data-magazine-id', '0');
						priceCost.textContent = i.total;
						valueAmount.value = i.quantity;
					});
				}

				totalItems.textContent = data.checkout_cart_total_products;
				checkoutTotalPrice.textContent = data.checkout_cart_total_price;
				//totalSale.textContent = data.

				//и вызываем функцию инициализации клика на модалку
			}

			function initInformModal() {
				let inform = document.querySelectorAll('.basket__inform');
				inform.forEach((i) => {
					i.addEventListener('click', (e) => {
						let id =
							i.parentNode.parentNode.getAttribute('data-id');
						let sizeCont = i.parentNode.parentNode.querySelector(
							'.basket__info__details-size'
						);
						//проверить на тестовом нет ли пробела
						let size = sizeCont.textContent;

						if (size == '') {
							showInformModal(id);
						} else {
							showInformModal(id, size);
						}
					});
				});
			}
			//только на странице чекаута
			initInformModal();

			function showInformModal(id, size = 'ONE') {
				let infoAvailability =
					document.getElementById('infoAvailability');
				let showSize = infoAvailability.querySelector('.pre-size');
				removeAllChildNodes(showSize);

				showSize.insertAdjacentHTML(
					'afterbegin',
					`<button type="button" class="card__description-size" data-confirm=${id}>${size}</button>`
				);

				$(infoAvailability).modal();
			}

			checkoutForm.addEventListener('submit', (e) => {
				e.preventDefault();
				if (checkoutCapcha.value == '') {
					setProductsData();
					sendData(getData());
				}
			});

			function setProductsData() {
				let dataIds = document.querySelectorAll('[data-id]');

				dataIds.forEach((i) => {
					const product_id = i.getAttribute('data-id');
					const dataSize = i.querySelector('[data-product-size]');
					const size = dataSize.getAttribute('data-product-size');
					const data = {
						product_id: product_id,
						size: size,
					};
					products.push(data);
				});
			}

			function liqPayAjax(id) {
				let data = {
					order_id: id,
				};

				$.ajax({
					url: `index.php?route=checkout/checkout/paymentWithLiqpay`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						//liqPayFormSubmit(json)
						//sendData(getData());
						liqPayFormSubmitForm(data);
					},
					error: function (err) {
						throw new Error(err);
					},
				});
			}

			function liqPayFormSubmitForm(data) {
				let modalOrderBody =
					document.querySelector('.modal-order-body');
				modalOrderBody.insertAdjacentHTML('afterend', `${data}`);
				//console.log(document.querySelector('#liqPayFormSubmitForm'));
				document.querySelector('#liqPayFormSubmitForm').submit();
			}

			//checout form data
			function getData() {
				let lastname = document.querySelector('#lastname').value;
				let firstname = document.querySelector('#firstname').value;
				let middlename = document.querySelector('#middlename').value;
				let orderEmail = document.querySelector('#orderEmail').value;
				let custTel = document.querySelector(
					'#customer_telephone'
				).value;
				let comment = document.querySelector('#comment').value;
				let orderMethod = document.querySelector('#orderMethod').value;

				return {
					lastname: lastname,
					firstname: firstname,
					middlename: middlename,
					orderEmail: orderEmail,
					custTel: custTel,
					comment: comment,
					orderMethod: orderMethod,
					regions: regions.value,
					cities: cities.value,
					warehouses: warehouses.value,
					pay: pay.value,
					shop: shop.value,
					promo: promo.value,
					certificate: certificate.value,
					products: products,
				};
			}

			function sendData(data) {
				$.ajax({
					url: `index.php?route=checkout/checkout/addOrder`,
					type: 'post',
					data: data,
					dataType: 'json',
					beforeSend: function () {
						$('#orderModal').modal();
					},
					success: function (data) {
						if (pay.value == 1) {
							modalOrderSpinner.style.display = 'none';
							modalOrderBody.style.display = 'block';
							$('#orderModal').on(
								'hidden.bs.modal',
								function (e) {
									window.location.replace(
										window.location.origin
									);
								}
							);
							drawingСheck(data);
						} else {
							liqPayAjax(data.order_id);
							$('#orderModal').on(
								'hidden.bs.modal',
								function (e) {
									window.location.replace(
										window.location.origin
									);
								}
							);
						}
					},
					error: function (err) {
						modalOrderSpinner.style.display = 'none';
						modalOrderError.style.display = 'block';
						throw new Error(err);
					},
				});
			}

			function drawingСheck(data) {
				let checkNumber = document.querySelector(
					'.order__modal-number-span'
				);
				let checkDeliv = document.querySelector('.check-deliv');
				let checkPay = document.querySelector('.check-pay');
				let checktotal = document.querySelector('.sum-total-count');
				let checkItems = document.querySelector(
					'.order__modal__sum-items'
				);

				checkNumber.textContent = data.order_number;
				checkDeliv.textContent = data.delivery_method;
				checkPay.textContent = data.payment_method;
				checktotal.textContent = data.total_sale_pay;
				data.products.forEach((i) => {
					checkItems.insertAdjacentHTML(
						'beforeend',
						`
						<div class="order__modal__sum-item">
							<p class="items-title">${i.title}</p>
							<div class="items-info">
								<span class="info-size">${i.size}</span>
								<div class="info-price">
									<span>${i.amount}</span>
									<span class="_icon-cancel"></span>
									<span>${i.sum_price}</span>
								</div>
							</div>
						</div>
					`
					);
				});
			}
		}

		//nuot relocate
		let nuotSection = document.querySelector('.nuot__grid-wrapper');
		if (nuotSection) {
			nuotSection.addEventListener('click', (e) => {
				let target = e.target.parentNode;

				if (!target.classList.contains('button-link')) {
					window.location.href = 'index.php?route=nuot/nuot_page';
				}
			});
		}
		//set to cookie для блока недавно просмотренные
		let product = document.querySelector('.card__container');
		if (product) {
			function getCookie(name) {
				let matches = document.cookie.match(
					new RegExp(
						'(?:^|; )' +
							name.replace(
								/([\.$?*|{}\(\)\[\]\\\/\+^])/g,
								'\\$1'
							) +
							'=([^;]*)'
					)
				);
				return matches ? decodeURIComponent(matches[1]) : undefined;
			}

			let products = [];
			let attr = product.querySelector('[data-id]');
			let mainProductId = attr.getAttribute('data-id');
			let user = product.getAttribute('data-authuser');
			let authuser;
			let cookieJson = getCookie('recently_watched');
			let recentlyWatched;

			if (user == '') {
				authuser = false;
			} else {
				authuser = user;
			}

			if (cookieJson !== undefined) {
				let cookie = JSON.parse(cookieJson);
				cookie.products.push(mainProductId);
				let array = cookie.products;
				products = [...new Set(array)];
			} else {
				products.push(mainProductId);
			}

			recentlyWatched = {
				products: products,
				user_id: authuser,
			};

			// if (window.location.protocol == 'https:') {
			// 	document.cookie = "recently_watched; secure";
			// }

			document.cookie =
				'recently_watched=' +
				JSON.stringify(recentlyWatched) +
				'; max-age=86400';
		}
		//new block
		let newBlock = document.querySelector('.slider-cards__swiper');
		let gridCatalodItem = document.querySelectorAll(
			'.product__card-container-item'
		);
		if (newBlock || gridCatalodItem.length > 0) {
			//change card slides
			let prodBtn = document.querySelectorAll('div[data-prod-id]');
			prodBtn.forEach((i) => {
				i.addEventListener('click', (e) => {
					let btnProdId = i.getAttribute('data-prod-id');
					let parent = i.parentNode.parentNode.parentNode;
					let card = parent.querySelector('[data-json]');
					let dataId = parent.querySelector('[data-id]');
					//let id = card.getAttribute('data-json');
					let dataJson = card.getAttribute('data-json');
					let dataArr = JSON.parse(dataJson);
					let favorite = card.querySelector('.favorit');

					//console.log(dataArr);

					let subProdCont = i.parentNode;
					subProdCont
						.querySelector('.focus-prod')
						.classList.remove('focus-prod');
					i.classList.add('focus-prod');

					dataArr.forEach((i) => {
						if (i.product_id == btnProdId) {
							let buyCont = parent.querySelector(
								'.product__buy-container'
							);
							buyCont.setAttribute('href', i.href);
							let sizesCont = buyCont.querySelector(
								'.product__sizes-container'
							);
							let cardLink = parent.querySelector(
								'.product__card-sub-wrapper'
							);
							cardLink.setAttribute('href', i.href);
							dataId.setAttribute('data-id', i.product_id);

							let iconBag = parent.querySelector('._icon-bag');

							if (sizesCont) {
								while (sizesCont.firstChild) {
									sizesCont.removeChild(sizesCont.firstChild);
								}

								i.sizes.forEach((i) => {
									if (i.stock_status_id == 2) {
										sizesCont.insertAdjacentHTML(
											'beforeend',
											`
                                            <button class="product__sizes-item item-active" type="button" data-stock-status="${i.stock_status_id}">${i.size}</button>
                                        `
										);
									} else if (i.stock_status_id == 3) {
										sizesCont.insertAdjacentHTML(
											'beforeend',
											`
                                            <button class="product__sizes-item inform-card" type="button" data-stock-status="${i.stock_status_id}">${i.size}</button>
                                        `
										);
									} else if (i.stock_status_id == 1) {
										sizesCont.insertAdjacentHTML(
											'beforeend',
											`
                                            <button class="product__sizes-item" type="button" data-stock-status="${i.stock_status_id}">${i.size}</button>
                                        `
										);
									}
								});
							} else if (iconBag) {
								i.sizes.forEach((i) => {
									iconBag.setAttribute(
										'data-stock-status',
										i.stock_status_id
									);
								});
							}

							let imgCont = parent.querySelector(
								'.product__card-sub-wrapper'
							);
							while (imgCont.firstChild) {
								imgCont.removeChild(imgCont.firstChild);
							}

							i.images.forEach((i) => {
								imgCont.insertAdjacentHTML(
									'afterbegin',
									`
										<div class="product__card-img-cont swiper-slide">
											<img class="slide-img" src="${i}">
										</div>
									`
								);
							});

							if (Array.isArray(productCardSwiper)) {
								productCardSwiper.map((i) => {
									i.update();
								});
							} else {
								productCardSwiper.update();
							}

							if (i.added_to_wishlist) {
								favorite.classList.remove('_icon-favorites');
								favorite.classList.add('_icon-favorites-fill');
							} else {
								favorite.classList.add('_icon-favorites');
								favorite.classList.remove(
									'_icon-favorites-fill'
								);
							}
						}
					});
				});
			});
		}
		//email reqest
		let newstler = document.querySelector('#newstler');
		let emailContainet = document.querySelector('.footer__sub-action');
		let successContainet = document.querySelector('.footer__sub-success');

		if (newstler) {
			newstler.addEventListener('submit', function (e) {
				e.preventDefault();
				let inputs = newstler.getElementsByTagName('input');
				let data = {
					email: inputs[0].value,
				};

				if (inputs[1].value == '') {
					$.ajax({
						url: `index.php?route=mail/newsletter/setToDatabase`,
						type: 'post',
						data: data,
						dataType: 'json',
						success: function (data) {
							//console.log('ok');
							inputs[0].value = '';
							data = {};
							emailContainet.style.display = 'none';
							successContainet.style.display = 'block';
						},
						error: function (err) {
							throw new Error(err);
						},
					});
				}
			});
		}

		//btn-slider-span init on display
		let sliderSpan = document.querySelectorAll('.btn-slider-span');
		if (sliderSpan.length > 0) {
			sliderSpan.forEach((i) => {
				let prevBtn = i.parentNode.querySelector(
					'._icon-arrow-slider-1'
				);
				if (prevBtn.classList.contains('swiper-button-lock')) {
					i.style.display = 'none';
				}
			});
		}
		//category smooth slider
		let subcategory = document.querySelector('.subcategory__wrapper');
		if (subcategory) {
			if (window.matchMedia('(max-width: 768px)').matches) {
				//UIkit.slider('.uk-subcat-slider').stopAutoplay();
				UIkit.slider('.uk-subcat-slider', {
					draggable: true,
					autoplay: false,
				});
			} else {
				UIkit.slider('.uk-subcat-slider', {
					draggable: false,
					autoplay: true,
				});
			}
		}
		//FancyBox in card
		// let cardWrapper = document.querySelector('.card__wrapper');
		// if (cardWrapper) {
		// 	// const fancybox = new Fancybox([
		// 	// 	{
		// 	// 		//loop: true,
		// 	// 	},
		// 	// ]);
		// 	// console.log(fancybox);
		// 	$('[data-fancybox="gallery"]').fancybox({
		// 		// Options will go here
		// 	});
		// }
	})();
};
