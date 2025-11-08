import { Page } from "./components/Page.js";

Page.loader("index");

const options = {
    data() {
        return {
            items: [],
            item: {},
            index: [],
            currentIndex: 0,
            action: "in",
            loop: {
                isLoop: true,
                timer: null,
                duration: 3000,
            },
            runLock: false,
        };
    },
    methods: {
        unRunLock() {
            setTimeout(() => {
                this.runLock = false;
            }, 1000);
        },
        initItem() {
            // 設定預設值，當沒有資料時，不會報錯
            this.item = this.items[this.currentIndex] || {};
        },
        async initItems() {
            let response = await fetch("/database/swiper_data.json");
            let responseIndex = await fetch("/database/index_data.json");
            let data = await response.json();
            let dataIndex = await responseIndex.json();
            this.items = data;
            this.index = dataIndex;
        },
        setCurrentIndex(index) {
            if (this.runLock) {
                return;
            }
            this.runLock = true;
            this.stopLoop();
            this.action = "out";
            setTimeout(() => {
                this.currentIndex = index;
                this.initItem();
                this.action = "in";
                this.startLoop();
                this.unRunLock();
            }, 800);
        },
        /**
         * 左箭頭(上一個)
         */
        setPrevCurrentIndex() {
            this.action = "out";
            setTimeout(() => {
                if (this.currentIndex <= 0) {
                    this.currentIndex = this.items.length - 1;
                } else {
                    this.currentIndex--;
                }
                this.initItem();
                this.action = "in";
                this.startLoop();
                this.unRunLock();
            }, 800);
        },
        /**
         * 右箭頭(下一個)
         * @param {*} force
         * @returns
         */
        setNextCurrentIndex(force = false) {
            let isOver = this.currentIndex >= this.items.length - 1;
            if (this.runLock || (isOver && !force)) {
                return;
            }
            this.runLock = true;
            this.stopLoop();
            this.action = "out";
            setTimeout(() => {
                if (isOver) {
                    this.currentIndex = 0;
                } else {
                    this.currentIndex++;
                }
                this.initItem();
                this.action = "in";
                this.startLoop();
                this.unRunLock();
            }, 800);
        },
        actionAnimationClass() {
            // 左近右出
            if (this.action === "in") {
                return "animate__backInLeft";
            }
            return "animate__backOutRight";
        },
        startLoop() {
            clearInterval(this.loop.timer);
            if (this.loop.isLoop) {
                this.loop.timer = setInterval(() => {
                    this.setNextCurrentIndex(true);
                }, this.loop.duration);
            }
        },
        stopLoop() {
            clearInterval(this.loop.timer);
        },
        animationChange(aniName) {},
    },
    async mounted() {
        console.log("mounted");
        await this.initItems();
        this.initItem();
    },
};

const { createApp } = Vue;

createApp(options).mount("#swiper-app");
