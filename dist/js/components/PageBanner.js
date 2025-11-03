class PageBanner {
    static async loader(endpoint, title, content) {
        let dom = document.querySelector(endpoint);
        if (!dom) return;

        let respons = await fetch("/components/_page-banner.html");
        let html = await respons.text();
        dom.innerHTML = html;

        if (title) {
            dom.querySelector("#page-banner-title").textContent = title;
        }
        if (content) {
            dom.querySelector("#page-banner-content").textContent = content;
        }
    }
}

export { PageBanner };
