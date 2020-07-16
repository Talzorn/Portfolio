new Vue ({
	el: '#container',
	data: {
		review: 0,
		scroll: false,
		number: 1,
		rating: null,
		comment: 0,
		select: false,
		menu: {
			search: false,
			compare: false,
		},
		overlay: {
			filtr: null,
			details: false,
			all: null
		},
		tabs: {
			catalog: 0,
			product: 0,
			compare: 0
		},
		favorites: {
			liked: false,
			compare: false
		},
		button: {
			review: false
		},
		photo: {
			number: 0,
			img: [
				'tile-img-test-0.jpg',
				'tile-img-test-1.jpg',
				'tile-img-test-2.jpg',
				'tile-img-test-3.jpg',
				'tile-img-test-4.jpg',
			]
		},
		slider: {
			move: 'sliderL',
			quantity: 2,
			img: [
				'tile-img-test-0.jpg',
				'tile-img-test-1.jpg',
				'tile-img-test-2.jpg',
				'tile-img-test-3.jpg',
				'tile-img-test-4.jpg',
				'tile-img-test.jpg',
			]
		}
	},
	mounted: function() {
		this.raz();
		window.addEventListener('scroll', this.navScroll);
		this.sliderWidth();
		window.addEventListener('resize', this.sliderWidth, false);
	},
	computed: {
		photoGallery: function() {
			return 'library/img/' + this.photo.img[this.photo.number];
		}
	},
	methods: {
		raz: function(){
			let serchIcon = document.getElementById('serchIcon').getBoundingClientRect(),
				compareIcon = document.getElementById('compareIcon').getBoundingClientRect(), 
				searchForm = document.getElementById('searchForm'), 
				compareMenu = document.getElementById('compareMenu');
				
				searchForm.style.marginTop = serchIcon.top + 'px';
				compareMenu.style.marginTop = compareIcon.top + 'px';

		},
		selectActive: function() {
			this.select = this.select == false ? true : false;
		},
		sliderWidth: function() {
			var w = window.innerWidth;

			if (w >= 992) {
				this.slider.quantity = 2
			} else if (w <= 991 && w >= 481) {
				this.slider.quantity = 1
			} else if (w <= 480) {
				this.slider.quantity = 0
			}
		},
		sliderNext: function() {
			this.slider.move = 'sliderR';
			var firstSlider = this.slider.img[0];

			this.slider.img.shift();
			this.slider.img.push(firstSlider);
		},
		sliderPrew: function() {
			this.slider.move = 'sliderL';
			var lastSlider = this.slider.img[this.slider.img.length - 1];

			this.slider.img.pop();
			this.slider.img.unshift(lastSlider);
		},
		photoDefault: function(photoDefault) {
			return 'library/img/' + this.photo.img[photoDefault];
		},
		numberChange: function(numberChange) {
			this.number += numberChange;
		},
		menuNav: function(e,menuNav) {
			this.overlay.details = false;
			this.menu.search = this.menu.search == false && menuNav == 0;
			this.menu.compare = this.menu.compare == false && menuNav == 1;
		},
		overFiltr: function(param) {
			this.overlay.details = false;
			this.overlay.filtr = this.overlay.filtr == null ? param : null;
		},
		navScroll: function() {
			var x = window.outerWidth,
				y = window.scrollY;

			this.scroll = x > 1500 && y > 130 || x <= 1500 && y > 100 ? true : false;
		}
	}
})