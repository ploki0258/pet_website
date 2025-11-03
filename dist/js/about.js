import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("about");
PageBanner.loader("#page-banner-endpoint", "關於老夫", "老夫科技是一家專注於科技領域的公司，提供最優質的科技產品和服務。");
