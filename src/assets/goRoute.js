const minin = {
    methods: {
        goLogin() {
            this.$router.push({
                name: 'Login'
            })
        },
        goManagement() {
            this.$router.push({
                name: 'Management'
            })
        },
        goUser() {
            this.$router.push({
                name: 'User'
            })
        },
        goStore() {
            this.$router.push({
                name: 'Store'
            })
        },
        goLoan() {
            this.$router.push({
                name: 'Loan'
            })
        },
        
    },
}
export default minin;