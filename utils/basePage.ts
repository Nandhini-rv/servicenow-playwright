import { expect, Locator, Page, test } from "@playwright/test";
import { PageAction } from "./PageActions";
import { PageAssertion } from "./PageActions";

type LocateBy = Locator | string

export abstract class BasePage implements PageAction, PageAssertion {
    
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    generateLocator(object: LocateBy) {
        return (typeof (object) === "string" ? this.page.locator(object) : object)
    }

    async clickOn(object: LocateBy, options?: { stepTitle: string }): Promise<void> {
        await test.step(`Perform Click action on element ${options?.stepTitle}`, async () => {
            try {
                const locator = this.generateLocator(object)
                await locator.evaluate(el => el.style.outline = '3px solid red')

                await locator.click({ button: "left", force: true })
            }
            catch (err) {
                throw new Error(`Click action failed: ${err}`)
            }
        })
    }

    async fill_details(object: LocateBy, text: string, options?: { stepTitle: string }): Promise<void> {
        await test.step(`Fill the given text ${text} in the element ${options?.stepTitle}`, async () => {
            try {
                const locator = this.generateLocator(object)
                await locator.evaluate(el => el.style.outline = '3px solid red')
                await locator.clear()
                await locator.fill(text)
            }
            catch (err) {
                throw new Error(`Fill action failed: ${err}`)
            }
        })
    }

    async check_Visibility(object: LocateBy, options?: { stepTitle: string }): Promise<void> {
        await test.step(`Verify object visibility of ${options?.stepTitle}`, async () => {
            try {
                await expect(this.generateLocator(object), { message: "Object not found" }).toBeVisible();
            }
            catch (err) {
                throw new Error(`Visibility check failed: ${err}`)
            }
        })
    }

    async mouse_Hover(object: LocateBy, options?: { stepTitle: string }): Promise<void> {
        await test.step(`Element mouse over on ${options?.stepTitle}`, async () => {
            try {
                await this.generateLocator(object).hover()
            }
            catch (err) {
                throw new Error(`Mouse hover failed: ${err}`)
            }
        })
    }

    async expectPollVisibility(object: LocateBy, option?: { stepTitle: string }): Promise<void> {
        await test.step(`Expect Poll visibility check on ${option?.stepTitle}`, async () => {
            try {
                await expect.poll(async () => {
                    try {
                        return await this.generateLocator(object).isVisible()
                    } catch {
                        // Frame is mid-navigation; return false so polling retries
                        return false
                    }
                }, {
                    message: `Waiting for ${option?.stepTitle} to be visible`,
                    timeout: 30000,
                    intervals: [500]
                }).toBe(true);
            }
            catch (err) {
                throw new Error(`Expect Poll visibility check failed on ${option?.stepTitle}: ${err}`)
            }

        })
    }

    async dropdownSelection(object: LocateBy, dropdownValue: string, option?: { stepTitle: string }): Promise<void> {
        await test.step(`Select ${dropdownValue} from the ${option?.stepTitle}`, async () => {
            try {
                await this.generateLocator(object).selectOption(dropdownValue)
            }
            catch (err) {
                throw new Error(`Dropdown value selection failed on ${option?.stepTitle}: ${err} `)
            }
        })
    }

    async waitForPageLoad(): Promise<void> {
        await test.step('Wait for page to be fully loaded', async () => {
            try {
                await this.page.waitForLoadState('domcontentloaded')
                await this.page.waitForFunction(() => document.readyState === 'complete')
            }
            catch (err) {
                throw new Error(`Page load wait failed: ${err}`)
            }
        })
    }

    async waitForFrameLoad(frameId: string): Promise<void> {
        await test.step(`Wait for frame '${frameId}' to be fully interactable`, async () => {
            try {
                const frame = this.page.frame({ name: frameId })
                    ?? this.page.frames().find(f => f.url().includes(frameId))
                if (frame) {
                    await frame.waitForLoadState('domcontentloaded')
                    await frame.waitForFunction(() => document.readyState === 'complete')
                }
            }
            catch (err) {
                throw new Error(`Frame load wait failed for '${frameId}': ${err}`)
            }
        })
    }

    async waitForElementVisibility(object: LocateBy, option?: { stepTitle: string }): Promise<void> {
        await test.step(`Wait for element '${option?.stepTitle}' to be visible`, async () => {
            try {
                await this.generateLocator(object).waitFor({ state: 'visible', timeout: 30000 })
            } catch (err) {
                throw new Error(`Element visibility wait failed for '${option?.stepTitle}': ${err}`)
            }
        })
    }

    async checkCheckbox(object: LocateBy, option?: { stepTitle: string }): Promise<void> {
        await test.step(`Enable checkbox '${option?.stepTitle}'`, async () => {
            try {
                await this.generateLocator(object).check()
            }
            catch (err) {
                throw new Error(`Unable to check the checkbox '${option?.stepTitle}': ${err}`)
            }
        })
    }

    async validateText(object: LocateBy, expectedText: string, option?: { stepTitle: string }): Promise<void> {
        await test.step(`Validate text of '${option?.stepTitle}' contains '${expectedText}'`, async () => {
            try {
                await expect(this.generateLocator(object)).toContainText(expectedText, { timeout: 30000 })
            }
            catch (err) {
                throw new Error(`Text validation failed on '${option?.stepTitle}': ${err}`)
            }
        })
    }

    abstract pageTitleCheck():Promise<void>

}