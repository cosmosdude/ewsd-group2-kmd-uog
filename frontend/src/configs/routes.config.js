export default {
    contribution: {
        /**
         * Detail route.
         * @param id Path variable. Default is :id
        */
        detail(id = ":id") {
            return `/article/${id}`
        }
    }
}