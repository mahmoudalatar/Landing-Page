/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const sectionsContainers = document.querySelectorAll("section");
const navBarList = document.querySelector("#navbar__list");
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 */

// build the nav
for (const i of sections) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i.dataset.nav;
    a.setAttribute("src", `#${i.id}`);
    a.setAttribute("class", `menu__link`);
    li.appendChild(a);
    fragment.appendChild(li);
}

navBarList.appendChild(fragment);

/**
 * Scroll to section on link click
 * Scroll to anchor ID using scrollTO event
 * !Note: calling the item li her because it created after the for loop.
 */
const navItems = document.querySelectorAll(".menu__link");

navItems.forEach((element) => {
    let x = document.querySelector(element.getAttribute("src"));
    element.addEventListener("click", (event) => {
        event.preventDefault();
        x.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});

/**
 * Set sections as active
 * Creat intersection Observer to tracing the viewport
 * creat options for the observer
 */

let options = {
    root: null,
    rootMargin: "-370px 0px -190px 0px",
    threshold: 0,
};

// Add class 'active' to section when near top of viewport
// creat the observe and the callback function
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (
            entry.isIntersecting &&
            entry.target.classList !== "your-active-class"
        ) {
            entry.target.classList.add("your-active-class");
        }

        if (!entry.isIntersecting) {
            entry.target.classList.remove("your-active-class");
        }
    });
}, options);

// use the class constainer to tracing the vewport and firing the observer
sectionsContainers.forEach((sectionsContainers) => {
    observer.observe(sectionsContainers);
});

// Responsive Menu
// Hamburger button
const menu = document.querySelector(".navbar__menu ul");
const hamburgerContainer = document.querySelector(".hamburger_container");

hamburgerContainer.addEventListener("click", () => {
    hamburgerContainer.classList.toggle("open");
    menu.classList.toggle("responsive");
});
