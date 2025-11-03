class Favivon {
    static async loader() {
        let respons = await fetch("/components/_favicon.html");
        let html = await respons.text();
        document.head.insertAdjacentHTML("beforeend", html);
    }
}

export { Favivon };
