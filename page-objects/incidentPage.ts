import { Page, test, expect, Locator, FrameLocator } from "@playwright/test";
import { BasePage } from "../utils/basePage";


export class IncidentPage extends BasePage {

    private readonly iframe: FrameLocator
    private readonly shortDescriptionInputField: Locator
    private readonly submitButton: Locator
    private readonly resolveButton: Locator
    private readonly updateButton: Locator
    private readonly deleteButton: Locator
    private readonly closeButton: Locator
    private readonly openDate: Locator
    private readonly closeDate: Locator
    private readonly urgencyDropdown: Locator
    private readonly stateDropdown: Locator
    private readonly pageTitle: Locator
    private readonly incidentNumberField: Locator


    constructor(page: Page) {
        super(page)
        this.iframe = page.frameLocator("iframe#gsft_main")
        this.shortDescriptionInputField = this.iframe.locator('[name="incident.short_description"]')
        this.submitButton = this.iframe.locator("div.form_action_button_container button.form_action_button.action_context.btn.btn-default").filter({ hasText: "Submit" })
        this.resolveButton = this.iframe.locator("div.form_action_button_container button.form_action_button.action_context.btn.btn-default").filter({ hasText: "Resolve" })
        this.updateButton = this.iframe.locator("div.form_action_button_container button.form_action_button.action_context.btn.btn-default").filter({ hasText: "Update" })
        this.deleteButton = this.iframe.locator("div.form_action_button_container button.form_action_button.action_context.btn.btn-default").filter({ hasText: "Delete" })
        this.closeButton = this.iframe.locator("div.form_action_button_container button.form_action_button.action_context.btn.btn-default").filter({ hasText: "Close" })
        this.openDate = this.iframe.locator('input[id="incident.opened_at"]')
        this.closeDate = this.iframe.locator('input[id="incident.closed_at"]')
        this.urgencyDropdown = this.iframe.locator('select[id="incident.urgency"]')
        this.stateDropdown = this.iframe.locator('select[id="incident.state"]')
        this.pageTitle = page.locator(".polaris-header-experience-title .experience-title")
        this.incidentNumberField = this.iframe.locator('input[id="incident.number"]')

    }

    async pageTitleCheck(): Promise<void> {
        await this.validateText(this.pageTitle, "Incident - ", { stepTitle: 'Incident Page' })
    }

    async enterShortDescription(description: string): Promise<void> {
        await this.expectPollVisibility(this.shortDescriptionInputField, { stepTitle: "Short Description Input box" })
        await this.fill_details(this.shortDescriptionInputField, description, { stepTitle: "Short Description" })
    }

    async clickSubmitButton(): Promise<void> {
        await this.clickOn(this.submitButton, { stepTitle: "Submit Button" })
    }

    async clickResolveButton(): Promise<void> {
        await this.clickOn(this.resolveButton, { stepTitle: "Resolve Button" })
    }

    async clickUpdateButton(): Promise<void> {
        await this.clickOn(this.updateButton, { stepTitle: "Update Button" })
    }

    async clickDeleteButton(): Promise<void> {
        await this.clickOn(this.deleteButton, { stepTitle: "Delete Button" })
    }


    async clickCloseButton(): Promise<void> {
        await this.clickOn(this.closeButton, { stepTitle: "Close Button" })
    }

    async updateOpenDate(date: string): Promise<void> {
        await this.fill_details(this.openDate, date, { stepTitle: "Open Date Field" })

    }

    async updateCloseDate(): Promise<void> {
        const currentDateTime = new Date().toLocaleString('sv-SE').replace('T', ' ');
        await this.fill_details(this.closeDate, currentDateTime, { stepTitle: "Close Date Field" })

    }

    async selectUrgency(dropDownValue: string): Promise<void> {
        await this.dropdownSelection(this.urgencyDropdown, dropDownValue, { stepTitle: "Urgency Dropdown" })
    }

    async selectState(dropDownValue: string): Promise<void> {
        await this.dropdownSelection(this.stateDropdown, dropDownValue, { stepTitle: "State Dropdown" })
    }

    async pageLoad(): Promise<void> {
        await this.waitForPageLoad()
        await this.waitForFrameLoad('gsft_main')
    }

    async captureIncidentNumber(): Promise<string> {
        return await test.step('Capture Incident Number from form', async () => {
            await this.waitForPageLoad()
            await this.waitForFrameLoad('gsft_main')
            await this.expectPollVisibility(this.incidentNumberField, { stepTitle: 'Incident Number Field' })
            const incNumber = await this.incidentNumberField.inputValue()
            if (!incNumber) throw new Error('Could not capture incident number — field was empty')
            return incNumber
        })
    }









}