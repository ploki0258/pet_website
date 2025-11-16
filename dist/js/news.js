import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("news");
PageBanner.loader(
    "#page-banner-endpoint",
    "最新消息",
    "提供最新消息，讓您了解老夫科技的最新動態。"
);

const { createApp } = Vue;

const options = {
    data() {
        return {
            items: [],
            shortMax: 25,
            page: 1,
            once: 6,
            total: 1,
        };
    },
    methods: {
        async initItems() {
            let response = await fetch("/database/news-article.json");
            let data = await response.json();
            console.log(data);
            let items = [];
            for (let uid in data) {
                let item = data[uid];
                item.uid = uid;
                items.push(item);
            }

            this.items = items;
            this.total = Math.ceil(this.items.length / this.once);
        },
        shortDesc(desc) {
            if (desc.length > this.shortMax) {
                return desc.substring(0, this.shortMax) + "...";
            }
            return desc;
        },
        paginate() {
            let start = (this.page - 1) * this.once;
            let end = start + this.once;
            return this.items.slice(start, end);
        },
        setPage(page) {
            this.page = page;
        },
        prevPage() {
            if (this.page <= 1) {
                return;
            }
            this.page--;
        },
        nextPage() {
            if (this.page >= this.total) {
                return;
            }
            this.page++;
        },
    },
    mounted() {
        console.log("mounted");
        this.initItems();
    },
};

createApp(options).mount("#news-app");
