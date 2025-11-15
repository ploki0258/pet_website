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
        },
    },
    mounted() {
        console.log("mounted");
    },
};

// createApp(options).mount("#fosterCare-app");
