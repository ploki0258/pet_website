class Header {
    static async loader(endpoint, active = null) {
        let dom = document.querySelector(endpoint);
        if (!dom) return;

        let respons = await fetch("/components/_header.html");
        let html = await respons.text();
        dom.innerHTML = html;

        if (active) {
            let activeLink = document.querySelector(`a[data-active=${active}]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    }
}

export { Header };
