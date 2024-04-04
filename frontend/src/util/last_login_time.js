export const loginTime = {
    key: 'last_login_time',
    // value: null
    get value() {
        console.log("[Welcome]", "getter called", this.key, window.localStorage.getItem(this.key))
        return window.localStorage.getItem(this.key)
    },
    set value(val) {
        console.log("[Welcome]", "Setter called", this.key)
        if (!val) return window.localStorage.removeItem(this.key)
        window.localStorage.setItem(this.key, val)
    }
}