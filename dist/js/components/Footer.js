class Footer {
    static async loader(endpoint) {
        let dom = document.querySelector(endpoint);
        if (!dom) return;

        let respons = await fetch("/components/_footer.html");
        let html = await respons.text();
        dom.innerHTML = html;
    }
}

export { Footer };
