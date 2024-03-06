const nav_links = document.querySelectorAll('.nav-link');


nav_links.forEach(element => {
    element.addEventListener('click', (event) => {
        //levesszük az  összes class-t
        nav_links.forEach(link => {
            link.classList.remove('active')
        })
        event.target.classList.toggle('active')
        console.log(event.target.classList)
    })
});

window.addEventListener('scroll', (event) => {
    if (window.scrollY === 0) {
        document.querySelector('.navbar').classList.remove('shrink')
        nav_links.forEach(link => {
            link.classList.remove('active')
        })

    } else {
        document.querySelector('.navbar').classList.add('shrink')
    }

})
