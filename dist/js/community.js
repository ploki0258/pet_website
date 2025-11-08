import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("community");
PageBanner.loader(
    "#page-banner-endpoint",
    "社群公告",
    "狗友們的資訊分享專區，讓您了解浪浪們的大小事。"
);
