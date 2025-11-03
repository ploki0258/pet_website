import { Favivon } from "./Favicon.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

class Page {
    static async loader(page) {
        Favivon.loader();
        Header.loader("#header-endpoint", page);
        Footer.loader("#footer-endpoint");
    }
}

export { Page };
