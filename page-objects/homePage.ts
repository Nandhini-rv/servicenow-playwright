import { Page, test, expect, Locator } from "@playwright/test";
import { BasePage } from "../utils/basePage";


export class HomePage extends BasePage {

    private readonly utilityMenuLocator: Locator
    private readonly menuAllLocator: Locator
    private readonly menuIncidentsLocator: Locator
    private readonly pageTitle: Locator

    constructor(page: Page) {
        super(page)
        this.utilityMenuLocator = page.locator("sn-polaris-header").locator(".utility-menu-container")
        this.menuAllLocator = page.locator("sn-polaris-header").getByText("All")
        this.menuIncidentsLocator = page.locator("sn-collapsible-list").getByText("Incidents").nth(0)
        this.pageTitle = page.locator(".polaris-header-experience-title .experience-title")

    }

    async pageTitleCheck(): Promise<void> {
        await this.validateText(this.pageTitle, "ServiceNow", { stepTitle: "HomePage Title" })
    }

    async validateUtilityContainerVisibility(): Promise<any> {
        await this.expectPollVisibility(this.utilityMenuLocator, { stepTitle: "Utility Container" })
        await this.check_Visibility(this.utilityMenuLocator, { stepTitle: "Utility Container" })
    }

    async selectAllMenu(): Promise<void> {
        await this.mouse_Hover(this.menuAllLocator, { stepTitle: "All link" })
        await this.clickOn(this.menuAllLocator, { stepTitle: "All link" })
    }

    async selectIncidentMenu(): Promise<void> {
        await this.expectPollVisibility(this.utilityMenuLocator, { stepTitle: "Incident Menu" })
        await this.clickOn(this.menuIncidentsLocator, { stepTitle: "Incident Menu" })
    }

}