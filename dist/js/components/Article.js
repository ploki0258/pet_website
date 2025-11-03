let cache = {};
let isCache = false;

class Article {
    /**
     * 取得所有文章
     * @returns {Object} 文章資料
     */
    static async get() {
        if (isCache) {
            return cache;
        }
        let response = await fetch("/database/news-article.json");
        let articles = await response.json();
        cache = articles;
        isCache = true;
        return articles;
    }

    /**
     * 取得單篇文章
     * @param {string} uid 文章UID
     * @returns {Object} 文章資料
     */
    static async fetch(uid) {
        let articles = await this.get();
        return articles[uid];
    }

    static async getPrevAndNext(uid) {
        let articles = await this.get();
        let prev = null;
        let next = null;

        let article = await this.fetch(uid);
        if (article) {
            let prevId = article.id - 1;
            let nextId = article.id + 1;

            for (let auid in articles) {
                let temp = articles[auid];
                if (temp.id === prevId) {
                    prev = temp;
                    prev.uid = auid;
                }
                if (temp.id === nextId) {
                    next = temp;
                    next.uid = auid;
                }
            }
        }
        return { prev, next };
    }
}

export { Article };
