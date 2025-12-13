import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("faq");
PageBanner.loader("#page-banner-endpoint", "常見問題", "讓您了解有關毛孩們的問題。");

const { createApp } = Vue;

const options = {
    data() {
        return {
            faqs: [],
            openIndex: null,
        };
    },
    methods: {
        async initFaqs() {
            let response = await fetch("/database/faq_data.json");
            let data = await response.json();
            console.log(data);

            this.faqs = data;
        },
        toggle(index) {
            this.openIndex = this.openIndex === index ? null : index;
        },
    },
    mounted() {
        console.log("mounted");
        this.initFaqs();
    },
};

createApp(options).mount("#faq-app");
