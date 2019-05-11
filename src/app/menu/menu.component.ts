import { Component, OnInit } from '@angular/core';

interface Menu {
	element: HTMLElement,
	expanded: boolean
}

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	menu: Menu;
	sidebarToggle: HTMLElement;
	hamburger: HTMLElement;
	headerHeight = 60;
	self = this;
	
	constructor() { }

	ngOnInit() {
		let self = this;
		this.menu = {
			element: document.getElementById("menu"),
			expanded: false
		};
		window.addEventListener("scroll", e => {
			if (window.scrollY > self.headerHeight) {
				self.menu.element.classList.add("menu-sidebar-fixed")
				document.getElementById("menu-sidebar-fixed-placeholder").style.display = "block";
			} else {
				self.menu.element.classList.remove("menu-sidebar-fixed");
				document.getElementById("menu-sidebar-fixed-placeholder").style.display = "none";
			}
		});
		this.sidebarToggle = document.getElementById("sidebar-toggle");
		this.sidebarToggle.addEventListener("click", () => this.toggleMenu(this));
		this.hamburger.addEventListener("click", () => this.toggleMenu(this));
	}

	private toggleMenu(self) : void {
		if (!self.menu.expanded) {
			self.expand(self, self.menu);
		} else {
			self.collapse(self, self.menu);
		}
	} 
	
	private expand(self, menu: Menu) : void {
		menu.expanded = true;
		let menuItems = document.querySelectorAll(".menu-item");
		let menuItemsText = document.querySelectorAll(".menu-item-text");
		menuItems.forEach(item => {
			self.swapClasses(item, "menu-item-collapsed", "menu-item-expanded");
		});
		menuItemsText.forEach(item => {
			self.swapClasses(item, "menu-item-text-collapsed", "menu-item-text-expanded");
		});
		self.swapClasses(menu.element, "menu-collapsed", "menu-expanded");
		document.getElementById("sidebar-toggle-icon")
			.setAttribute("src", "assets/img/arrow-left.png");
		self.swapClasses(document.getElementById("menu-sidebar-fixed-placeholder"),
			"menu-sidebar-fixed-placeholder-collapsed",
			"menu-sidebar-fixed-placeholder-expanded"
		);
	}
	
	private collapse(self, menu: Menu) : void {
		menu.expanded = false;
		let menuItems = document.querySelectorAll(".menu-item");
		let menuItemsText = document.querySelectorAll(".menu-item-text");
		menuItemsText.forEach(item => {
			self.swapClasses(item, "menu-item-text-collapsed", "menu-item-text-collapsed")
		});
		menuItems.forEach(item => {
			self.swapClasses(item, "menu-item-expanded", "menu-item-collapsed");
		});
		self.swapClasses(menu.element, "menu-expanded", "menu-collapsed");
		document.getElementById("sidebar-toggle-icon")
			.setAttribute("src", "assets/img/arrow-right.png");
		self.swapClasses(document.getElementById("menu-sidebar-fixed-placeholder"),
			"menu-sidebar-fixed-placeholder-expanded",
			"menu-sidebar-fixed-placeholder-collapsed"
		);
	}
	
	private swapClasses(element, toRemove, toAdd) {
		element.classList.remove(toRemove);
		element.classList.add(toAdd);
	}
	
	private addClass(element, className) {
		element.classList.add(className);
	}
	
	private removeClass(element, className) {
		element.classList.remove(className);
	}

}
