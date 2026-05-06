import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "../utils/basePage";



export class LoginPage extends BasePage {

    private readonly userName_txt: Locator
    private readonly password_txt: Locator
    private readonly login_btn: Locator
    private readonly pageTitle: Locator

    constructor(page: Page) {
        super(page)
        this.userName_txt = page.locator("#user_name")
        this.password_txt = page.locator("#user_password")
        this.login_btn = page.locator("#sysverb_login")
        this.pageTitle = page.locator('.login-logo')
    }

    async pageTitleCheck(): Promise<void> {
        await this.validateText(this.pageTitle,"ServiceNow",{stepTitle: 'ServiceNow Home Page'})
    }
    
    async fillUsername(username: string): Promise<void> {
        await this.fill_details(this.userName_txt, username, { stepTitle: "Username InputBox" })
    }

    async fillPassword(password: string): Promise<void> {
        await this.fill_details(this.password_txt, password, { stepTitle: "Password InputBox" })
    }

    async clickLogin(): Promise<void> {
        await this.clickOn(this.login_btn, { stepTitle: "Login Button" })
    }





}