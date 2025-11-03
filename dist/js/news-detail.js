import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";
import { Article } from "./components/Article.js";

/**
 * 取得頁面UID
 * @returns {string} 頁面UID
 */
const getPageUid = function () {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("uid");
};

try {
    let uid = getPageUid();
    if (!uid) {
        // 轉跳本身不會中斷執行，所以需要拋出錯誤去中斷
        location.href = "news.html";
        throw new Error("頁面UID不存在");
    }

    let article = await Article.fetch(uid);
    if (!article) {
        location.href = "news.html";
        throw new Error("文章不存在");
    }

    let { prev, next } = await Article.getPrevAndNext(uid);

    Page.loader("news");
    PageBanner.loader("#page-banner-endpoint", article.title, article.desc);

    let { createApp } = Vue;
    const options = {
        data() {
            return {
                article,
                prev,
                next,
            };
        },
        mounted() {
            console.log("mounted", this.article);
        },
    };

    createApp(options).mount("#news-detail-app");
} catch (error) {
    localStorage.setItem("news-detail-error", error.message);
}
