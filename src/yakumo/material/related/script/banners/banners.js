/*
 * banners.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

import {AnchorTag, ImgTag, ButtonTag, DivTag} from './html.js';

export class Banners {
	constructor(banners) {
		this.banners = banners;
	}
	
	show(elem){
		if (elem == null) return;
		elem.innerHTML = this.banners.map(banner => 
			new ImageContainer('col-lg-6', banner).htmlize()
		).join('\n');
	}
}

export class SiteHeader {
	constructor(header, banners) {
		this.header = header;
		this.banners = banners;
	}
	
	show(elem){
		if (elem == null) return;
		elem.innerHTML = [
			new ImageContainer('col-lg-2', this.header.avatar).htmlize(),
			new ImageContainer('col-lg-4 p-3', this.header.title).htmlize(),
			new Carousel(this.banners).htmlize()
		].join('\n');
	}
}

function createLinkedImage(props, imgProps) {
	let imgTag = new ImgTag();
	imgTag.props = {
		src: props.src,
		alt: props.alt
	};
	if (imgProps != null) imgTag.props = imgProps;
	let anchorTag = new AnchorTag();
	anchorTag.props = {
		href: props.href
	};
	anchorTag.lowers.push(imgTag);
	return anchorTag;
}

function createDiv(props, lower) {
	let divTag = new DivTag();
	divTag.props = {
		'class': props.clazz
	};
	divTag.lowers.push(lower);
	return divTag;
}

class ImageContainer {
	constructor(clazz, props) {
		this.clazz = clazz;
		this.props = props;
	}
	
	htmlize(){
		return `
			<div class="${this.clazz}">
				<figure>
					${createLinkedImage(this.props, {class: 'img-fluid'}).htmlize()}
				</figure>
			</div>`;
	}
}

class Carousel {
	constructor(banners) {
		this.banners = banners;
	}
	
	htmlize(){
		let indicators = [];
		let inners = [];
		let activeIdx = Math.floor(Math.random() * this.banners.length);
		this.banners.forEach((banner, idx) => {
			let button = new ButtonTag();
			button.props = {
				'data-bs-target': '#banners',
				'data-bs-slide-to': `${idx}`,
				'aria-label': banner.alt
			};
			if (idx == activeIdx){
				button.props = {
					'class': 'active',
					'aria-current': 'true'
				}
			}
			indicators.push(button);
			let anchorTag = createLinkedImage(banner, {class: 'img-fluid'});
			let clazz = (idx == activeIdx)? 'carousel-item active' : 'carousel-item';
			inners.push(createDiv({ clazz: clazz }, anchorTag));
		});
		return `
			<div id="bannerCarousel" class="col-lg-6 p-3">
				<div id="banners" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
						${ indicators.map(button => button.htmlize()).join('\n') }
					</div>
					<div class="carousel-inner">
						${ inners.map(linkedImage => linkedImage.htmlize({class: 'd-block w-100'})).join('\n') }
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#banners" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#banners" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>`;
	}
}
