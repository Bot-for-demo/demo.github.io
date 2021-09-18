let degPosition = 100;
setInterval(() => {
	if (degPosition == 100) {
		degPosition = 80;
	} else if (degPosition == 80) {
		degPosition = 100;
	}

	document.documentElement.style.setProperty(
		'--deg-position',
		`${degPosition}deg`
	);
}, 11000);

document.documentElement.style.setProperty(
	'--deg-position',
	`${degPosition}deg`
);
// $('.wrapper').css('display', 'none');
// //$('body').css('overflow', 'hidden');
// $(window).on('load', function() {
//     // $('body').css('overflow', 'hidden');
//     $('.wrapper').css('display', 'block');
//     //$('#main_preload').css('display', 'none');

//     $('#main_preload').delay(350).fadeOut('slow'); // и скрываем сам блок прелоудера.
//     //$('body').delay(1000).css('overflow', 'auto'); // показываем блок с контентом
// });
window.onload = function () {
	//console.log('1111');
	setTimeout(() => {
		let mainPreloader = document.getElementById('mainPreloader');
		if (!mainPreloader.classList.contains('done')) {
			mainPreloader.classList.add('done');
		}
	}, 1000);
};
