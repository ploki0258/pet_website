import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("fosterCare");
PageBanner.loader("#page-banner-endpoint", "寄養專區", "提供優質的服務，使浪浪如同家人般守護。");

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
            let response = await fetch("/database/fosterCarePet_data.json");
            let data = await response.json();
            console.log(data);
            let items = [];
            for (let uid in data) {
                let item = data[uid];
                items.uid = uid;
                items.push(item);
            }

            this.items = items;
            this.total = Math.ceil(this.items.length / this.once);
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
            if (this.page <= 1) return;

            this.page--;
        },
        nextPage() {
            if (this.page >= this.total) return;

            this.page++;
        },
    },
    mounted() {
        console.log("mounted");
        this.initItems();
    },
};

createApp(options).mount("#fosterCare-app");
