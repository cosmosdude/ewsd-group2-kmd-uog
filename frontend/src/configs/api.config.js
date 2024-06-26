export const host = 'http://127.0.0.1:8000'

const apiConfig = {

    host: host,

    path: {

        login() {
            return `${host}/api/login`
        },

        users() {
            return this.userDetail('')
        },

        students() {
            return `${host}/api/users/roles/students`
        },

        userDetail(id) {
            return `${host}/api/users/${id}`
        },

        guestRegister() {
            return `${host}/api/guest-register`
        },

        studentRegister() {
            return `${host}/api/register`
        },

        /**
         * URL to get student's contribution lists
         * `/api/contributionlist`
        */
        uploadedContributions() {
            return `${host}/api/contributionlist`
        },

        /**
         * URL to get profile detail.
         * `/api/me`
        */
        me() {
            return `${host}/api/me`
        },

        /**
         * URL to get academic years.
         * `/api/academic-years`
        */
        createAcademicYear() {
            return `${host}/api/academicyear`
        },

        /**
         * URL to get academic years.
         * `/api/academic-years`
        */
        academicYears() {
            return `${host}/api/academic-years`
        },

        /**
         * URL to get academic year detail.
         * `/api/academic-years/:id`
        */
        academicYearDetail(id) {
            return `${host}/api/academic-years/${id}`
        },

        /**
         * URL to update academic year.
         * @param id academic year id.
         * `/api/academicyearupdate/${id}`
        */
        updateAcademicYear(id) {
            return `${host}/api/academicyearupdate/${id}`
        },
        
        /**
         * URL to get all faculties.
         * `/api/faculties`
        */
        faculties(id) {
            return `${host}/api/faculties/${id ?? ""}`
        },

        userFaculties() {
            return `${host}/api/faculties-for-users`
        },

        unregisteredFacultiesIdsForGuest() {
            return `${host}/api/guest/unregistered-faculty`
        },

        registerFacultiesForGuest() {
            return `${host}/api/guest/faculty-register`
        },

        /**
         * URL to upload article.
         * `/api/contributions/`
        */
        articleUpload() {
            return this.articleDetail('')
        },

        /**
         * URL to mark article read.
        */
        readArticle(id) {
            return `${host}/api/contributions/${id}/read-count`
        },

        /**
         * URL to get article detail.
         * `/api/contributions/${id}`
         * @param id Article/Contribution id
        */
        articleDetail(id) {
            return `${host}/api/contributions/${id}`
        },

        articleUpdate(id) {
            return `${host}/api/contributions/update/${id}`
        },

        /**
         * URL to get articles of a current magazine.
         * `api/contributions/all`
        */
        articlesOfCurrentMagazine() {
            return `${host}/api/contributions/all`
        },

        /**
         * URL to get magazine detail.
         * @param magazineId id of the magazine.
         * `api/closures/${magazineId}`
        */
        magazineDetail(magazineId) {
            return `${host}/api/closures/${magazineId}`
        },

        /**
         * URL to get all magazines.
         * 
         * @param id: Magazine id. Default is empty string.
         * 
         * `api/closures`
        */
        magazines(id = "") {
            return `${host}/api/closures/${id}`
        },

        previousMagazines() {
            return `${host}/api/previous-closures`
        },

        /**
         * URL to download magazine.
         * 
         * @param id: Magazine id
         * 
         * `api/closures/${id}/download`
        */
        magazineDownload(id) {
            return `${host}/api/closures/${id}/download`
        },

        /**
         * URL to get current magazines.
         * `api/closures/current`
        */
        currentMagazines() {
            return `${host}/api/closures/current`
        },

        /**
         * URL to get upcoming magazines.
         * `api/closures/current`
        */
        upcomingMagazines() {
            return `${host}/api/upcoming-closures`
        },

        /**
         * URL to get selected articles.
         * `api/selected-contributions`
        */
        selectedArticles() {
            return `${host}/api/selected-contributions`
        },

        /**
         * Update the status of given article
         * @param id article id.
        */
        updateArticleStatus(id) {
            return `${host}/api/contributions/status/${id}`
        },

        /**
         * URL to comment on article
        */
        comment() {
            return `${host}/api/comments`
        },

        /**
         * URL to get guest users list of a faculty
        */
        guestUsers(facultyId) {
            return `${host}/api/faculties/${facultyId}/guest-user`
        },

        /**
         * Statistical API paths
        */
        statistics: {

            contributionsByFaculties(academicId) {
                return `${host}/api/contributionsbyfaculty?academic_id=${academicId}`
            },

            contributionsAndContributors(academicId) {
                return `${host}/api/statistic/contributions-contributors?academic_id=${academicId}`
            },

            contributionCommentCount(magazineId) {
                return `${host}/api/statistic/magazine-comment?magazine_id=${magazineId}`
            },

            /**
             * URL for getting most active guests
            */
            facultyGuestAndStudentCounts() {
                return `${host}/api/guest-student-counts`
            },

            /**
             * URL for getting most active guests
            */
            mostActiveGuestUsers() {
                return `${host}/api/userlist`
            },

            /**
             * URL for getting students with most upload
            */
            mostActiveStudents() {
                return `${host}/api/studentlist`
            },

            /**
             * URL for getting most viewed magazines
            */
            mostViewedMagazines() {
                return `${host}/api/most-view/magazines`
            },

            /**
             * URL for getting most read contributions/articles
            */
            mostReadContributions() {
                return `${host}/api/statistic/most-read-contributions`
            },

            /**
             * URL for getting most used browsers.
            */
            mostUsedBrowsers() {
                return `${host}/api/browsers`
            }
        }
    }
}

export default apiConfig