export class LoginPage {

    constructor(page){
        this.page = page;
        this.username_textbox = page.getByRole('textbox', { name: 'Username' });
        this.password_textbox = page.getByRole('textbox', { name: 'Password' });
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.logout_button = page.getByRole('link', { name: 'Logout' });
    }

    async gotoLoginPage() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username, password){
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click();

        await this.logout_button.waitFor({ state: "visible", timeout: 10000 });
        await this.logout_button.click();
    }
}