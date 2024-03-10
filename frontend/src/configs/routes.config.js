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
         * Route for updating article/contributions.
         * @param id Path variable. Default is :id
        */
        update(id = ":id") {
            return `/article/${id}/update`
        },

        /**
         * Route for uploading article/contributions.
        */
        upload(magazineId = ":magazineId") {
            return `/article/upload/${magazineId}`
        }
    }
}