import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("community");
PageBanner.loader(
    "#page-banner-endpoint",
    "社群公告",
    "狗友們的資訊分享專區，讓您了解浪浪們的大小事。"
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
            let response = await fetch("/database/community_data.json");
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

createApp(options).mount("#community-app");
