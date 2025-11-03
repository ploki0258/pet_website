import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("partner");
PageBanner.loader("#page-banner-endpoint", "合作夥伴", "與我們合作，讓您的企業更加成功。");
