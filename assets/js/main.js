/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
// Commenting out this block because we are going to use URL based active link highlighting
// const sections = document.querySelectorAll('section[id]');

// const scrollActive = () =>{
//     const scrollDown = window.scrollY;

//     sections.forEach(current =>{
//         const sectionHeight = current.offsetHeight,
//               sectionTop = current.offsetTop - 58,
//               sectionId = current.getAttribute('id'),
//               sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
//         if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
//             sectionsClass.classList.add('active-link');
//         } else {
//             sectionsClass.classList.remove('active-link');
//         }                                                    
//     });
// };

// window.addEventListener('scroll', scrollActive);

/*===== URL BASED ACTIVE LINK HIGHLIGHTING =====*/
window.addEventListener('DOMContentLoaded', () => {
    const currentLocation = window.location.pathname;
    navLink.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


/*===== FADE-OUT MUSIC FUNCTION =====*/
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const stopMusicTrigger = document.getElementById('stop-music');

    // Fungsi untuk mengurangi volume secara bertahap
    function fadeOutAudio() {
        let fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 200); // Mengurangi volume setiap 200 milidetik
    }

    // Fungsi untuk mendeteksi elemen masuk ke viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Event listener untuk scroll
    window.addEventListener('scroll', () => {
        if (isElementInViewport(stopMusicTrigger)) {
            fadeOutAudio();
        }
    });
});