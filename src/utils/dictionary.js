const prod = true
export const routes = {
    HTTP: prod? 'https' : 'http',
    USERS: prod? 'auth.sammyshehter.com': 'localhost:10000',
    BLOGUE: prod? 'blogue.sammyshehter.com': 'localhost:8000'
}