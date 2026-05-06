import { test as setup } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { HomePage } from "../page-objects/homePage";
import fs from "fs";
import path from "path";

const SERVICE_NOW_URL = process.env.URL!
const SERVICE_NOW_USERNAME = process.env.USER_NAME!
const SERVICE_NOW_PASSWORD = process.env.PASSWORD!

const CRED_PATH = '.auth/credential.json'

setup("Authenticate - Service Now", async ({ page }) => {
    fs.rmSync(path.dirname(CRED_PATH), { recursive: true, force: true })
    fs.mkdirSync(path.dirname(CRED_PATH), { recursive: true })

    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    await page.goto(SERVICE_NOW_URL)
    await loginPage.fillUsername(SERVICE_NOW_USERNAME)
    await loginPage.fillPassword(SERVICE_NOW_PASSWORD)
    await loginPage.clickLogin()
    await homePage.validateUtilityContainerVisibility()
    await page.context().storageState({ path: CRED_PATH })
})
