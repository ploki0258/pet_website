import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("faq");
PageBanner.loader("#page-banner-endpoint", "常見問題", "讓您了解有關毛孩們的問題。");
