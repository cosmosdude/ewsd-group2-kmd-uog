export const host = 'http://127.0.0.1:8000'

export default {
    host: host,

    path: {
        /**
         * URL to get student's contribution lists
        */
        uploadedContributions() {
            return `${host}/api/contributionlist`
        }
    }
}