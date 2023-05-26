/*
 * banners.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

import {AnchorTag, ImgTag, ButtonTag} from './html.js';

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

export class GuideHeader {
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
		console.log('GuideHeader#show', elem.innerHTML);
	}
}

class LinkedImage {
	constructor(props) {
		this.props = props;
	}
	
	htmlize(imgProps){
		let imgTag = new ImgTag();
		imgTag.props = {
			src: this.props.src,
			alt: this.props.alt
		};
		if (imgProps != null) Object.assign(imgTag.props, imgProps);
		
		let anchorTag = new AnchorTag();
		anchorTag.props = {
			href: this.props.href
		};
		anchorTag.lowers.push(imgTag);
		return anchorTag.htmlize();
	}
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
					${new LinkedImage(this.props).htmlize({class: 'img-fluid'})}
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
		let activeIdx = Math.floor(Math.random() * banners.length);
		banners.forEach((banner, idx) => {
			let button = new ButtonTag();
			button.props = {
				'data-bs-target': '#banners',
				'data-bs-slide-to': `${idx}`,
				'aria-label': banner.props
			};
			if (idx == activeIdx){
				button.props['class'] = 'active';
				button.props['aria-current'] = 'true';
			}
			indicators.push(button);
			inners.push(new LinkedImage(props));
		});
		return `
			<div class="col-lg-6 p-3">
				<div class="carousel-indicators">
					${ indicators.map(button => button.htmlize()).join('\n') }
				</div>
				<div class="carousel-inner">
					${ inners.map(inner => linkedImage.htmlize({class: 'd-block w-100'})).join('\n') }
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#banners" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#banners" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>`;
	}
}
