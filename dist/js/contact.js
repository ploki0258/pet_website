import { Page } from "./components/Page.js";
import { PageBanner } from "./components/PageBanner.js";

Page.loader("contact");
PageBanner.loader("#page-banner-endpoint", "聯絡我們", "與我們聯絡，讓我們為您提供最佳的服務。");

const options = {
    data() {
        return {
            form: {
                name: "",
                email: "",
                subject: "",
                content: "",
            },
            isSending: false,
        };
    },
    methods: {
        async submit() {
            // console.log(this.form);
            // console.log("submit!!");
            if (this.isSending) {
                return;
            }
            this.isSending = true;

            try {
                let form = new FormData();
                for (let field in this.form) {
                    if (this.form[field] === "") {
                        Swal.fire({
                            title: "請填寫完整",
                            icon: "error",
                        });
                        return;
                    }
                    form.append(field, this.form[field]);
                }
                let api = "https://script.google.com/macros/s/AKfycbyTcXNQQ7rU4QE3aZEfeW1PaizSn3p0AdId_zv1ezWE_8R0xVf-7z-XEygbMUSp7Qg/exec";

                Swal.fire({
                    title: "發送中...",
                    html: "請稍候...",
                    icon: "info",
                    timer: 10000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                });
                let response = await fetch(api, {
                    method: "POST",
                    body: form,
                });
                let data = await response.json();
                if (data.ok) {
                    Swal.fire({
                        title: "發送成功",
                        icon: "success",
                    });
                    this.form = {
                        name: "",
                        email: "",
                        subject: "",
                        content: "",
                    };
                } else {
                    Swal.fire({
                        title: "發送失敗",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.close();
            } finally {
                this.isSending = false;
            }
        },
    },
    mounted() {
        console.log("mounted");
    },
};

const { createApp } = Vue;
createApp(options).mount("#form-app");
