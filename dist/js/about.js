import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("about");
PageBanner.loader("#page-banner-endpoint", "關於我們", "「因為愛，我們相遇；讓毛孩不再孤單。」");
