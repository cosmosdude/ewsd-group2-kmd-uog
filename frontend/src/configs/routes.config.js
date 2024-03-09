export default {
    contribution: {
        /**
         * Detail route.
         * @param id Path variable. Default is :id
        */
        detail(id = ":id") {
            return `/article/${id}`
        },

        /**
         * Route for uploading article/contributions.
        */
        upload() {
            return `/article/upload/:magazineId`
        },

        /**
         * Route for updating article/contributions.
        */
        update() {
            return `/article/update`
        }
    }
}