import { Page, test, expect, Locator, Frame, FrameLocator } from "@playwright/test";
import { BasePage } from "../utils/basePage";


export class IncidentHomePage extends BasePage {

    private readonly iframe: FrameLocator
    private readonly newIncidentbtn: Locator
    private readonly searchIncidentInputField: Locator
    private readonly incidentLink: Locator
    private readonly rows: Locator
    private readonly pageTitle: Locator

    constructor(page: Page) {
        super(page)
        this.iframe = page.frameLocator("iframe#gsft_main")
        this.newIncidentbtn = this.iframe.locator("button#sysverb_new").first()
        this.searchIncidentInputField = this.iframe.getByPlaceholder("Search").nth(0)
        this.incidentLink = this.iframe.locator("a.linked.formlink").nth(0)
        this.rows = this.iframe.locator("table#incident_table tbody tr")
        this.pageTitle = page.locator(".polaris-header-experience-title .experience-title")
    }

    async pageTitleCheck(): Promise<void> {
        await this.check_Visibility(this.pageTitle, { stepTitle: "Incident Home Page Title" })
        await this.validateText(this.pageTitle, 'View: Self Service', { stepTitle: 'Page Title' })
    }

    async validatePageLoad(): Promise<void> {
        await this.check_Visibility(this.pageTitle, { stepTitle: "Incident Home Page" })
        await this.validateText(this.pageTitle, 'View: Self Service', { stepTitle: 'Page Title' })
    }

    async validateNewIncidentVisibility(): Promise<void> {
        await this.check_Visibility(this.newIncidentbtn, { stepTitle: "New Button" })
    }

    async clickCreateNewIncident(): Promise<void> {
        await this.waitForPageLoad()
        await this.waitForFrameLoad('gsft_main')
        await this.mouse_Hover(this.newIncidentbtn)
        await this.clickOn(this.newIncidentbtn, { stepTitle: "New Button" })
    }

    async searchIncident(incidentNumber: string): Promise<void> {
        await this.waitForElementVisibility(this.rows.first(), { stepTitle: "Incident Table" })
        await this.clickOn(this.searchIncidentInputField, { stepTitle: "Search Incident Input Field" })
        await this.fill_details(this.searchIncidentInputField, incidentNumber, { stepTitle: "Search Incident Input Field" })
        await this.searchIncidentInputField.press("Enter")
        await expect(this.rows).toHaveCount(1, { timeout: 30000 })
    }

    async clickIncidentLink(): Promise<void> {
        await this.clickOn(this.incidentLink, { stepTitle: "Click on Incident Link" })
    }

    async SearchIncidentCheckBox(targetValue: string): Promise<void> {
        await this.waitForElementVisibility(this.rows.first(), { stepTitle: "Incident Table" })
        const rowCount = await this.rows.count()
        console.log(`Total rows found: ${rowCount}`)
        for (let i = 0; i < rowCount; i++) {
            const row = this.rows.nth(i)
            const secondColText = await row.locator("td").nth(2).innerText()
            //console.log(`Second column text: ${secondColText}`)
            if (secondColText.trim() === targetValue) {
                const checkbox = row.locator("td").nth(0).locator("input[type='checkbox']")
                await this.clickOn(checkbox, { stepTitle: "Select Incident Checkbox" })
                break
            }
        }
    }

}