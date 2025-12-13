import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";
import { Community } from "./components/Community.js";

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
        location.href = "community.html";
        throw new Error("頁面UID不存在");
    }

    let article = await Community.fetch(uid);
    if (!article) {
        location.href = "community.html";
        throw new Error("文章不存在");
    }

    let { prev, next } = await Community.getPrevAndNext(uid);

    Page.loader("community");
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

    createApp(options).mount("#community-detail-app");
} catch (error) {
    localStorage.setItem("community-detail-error", error.message);
}
