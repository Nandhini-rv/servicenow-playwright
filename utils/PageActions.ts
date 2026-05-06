/**
 * @file PageActions.ts
 * @created by Nandhu
 * @date 2026-04-25
 * @purpose Defines reusable interface contracts for common page interactions (click, fill, hover)
 *          and assertions (visibility check) used across all page objects in the Playwright framework.
 */
import { Locator } from "@playwright/test"

type LocateBy = Locator | string

export interface PageAction {
    /**
     * Clicks on the specified element identified by a Locator or a selector string.
     * @param object - The target element to click on, either as a Playwright `Locator` or a CSS/XPath selector string.
     * @created by Nandhu
     * @date 2026-04-25
     * @purpose Provides a reusable action to perform click interactions across all page objects.
     * @example
     * await page.clickOn(page.locator('#submit-button'));
     * await page.clickOn('button[type="submit"]');
     */
    clickOn(object: LocateBy, options?: { stepTitle: string }): Promise<void>

    /**
     * Fills the specified input element with the provided text.
     * @param object - The target input element, either as a Playwright `Locator` or a selector string.
     * @param text - The text to enter into the input field.
     * @created by Nandhu
     * @date 2026-04-25
     * @purpose Provides a reusable action to fill form fields across all page objects.
     * @example
     * await page.fill_details('#username', 'admin');
     */
    fill_details(object: LocateBy, text: string, options?: { stepTitle: string }): Promise<void>

    /**
     * Hovers the mouse over the specified element.
     * @param object - The target element to hover over, either as a Playwright `Locator` or a selector string.
     * @created by Nandhu
     * @date 2026-04-25
     * @purpose Provides a reusable action to trigger hover/tooltip interactions across all page objects.
     * @example
     * await page.mouse_Hover('#menu-item');
     */
    mouse_Hover(object: LocateBy, options?: { stepTitle: string }): Promise<void>

    /**
     * Selects a value from a dropdown element.
     * @param object - The target dropdown element, either as a Playwright `Locator` or a selector string.
     * @param dropdownValue - The value or visible text to select from the dropdown.
     * @param option - Optional configuration object.
     * @param option.stepTitle - A descriptive label for the step used in test reporting.
     * @created by Nandhu
     * @date 2026-04-26
     * @purpose Provides a reusable action to select options from dropdown elements across all page objects.
     * @example
     * await page.dropdownSelection('#priority', 'High', { stepTitle: 'Select Priority' });
     */
    dropdownSelection(object: LocateBy, dropdownValue: string, option?: { stepTitle: string }): Promise<void>

    /**
     * Waits for the page to be fully loaded and interactable.
     * Waits for DOM content loaded, network idle, and load events sequentially.
     * @created by Nandhu
     * @date 2026-04-28
     * @purpose Provides a reusable method to handle page load delays common in SPAs like ServiceNow,
     *          ensuring the page is fully ready before any interactions are performed.
     * @example
     * await page.waitForPageLoad();
     */
    waitForPageLoad(): Promise<void>

    /**
     * Waits for an iframe's document to be fully loaded and interactable.
     * @param frameId - The `name` attribute or a URL substring to identify the iframe's frame.
     * @created by Nandhu
     * @date 2026-04-28
     * @purpose Handles cases where an iframe is visually rendered but its document is not yet
     *          fully interactive, common in ServiceNow's gsft_main iframe.
     * @example
     * await page.waitForFrameLoad('gsft_main');
     */
    waitForFrameLoad(frameId: string): Promise<void>

    /**
     * Asserts that the specified element contains the expected text.
     * @param object - The target element to validate, either as a Playwright `Locator` or a selector string.
     * @param expectedText - The text expected to be contained within the element.
     * @param option - Optional configuration object.
     * @param option.stepTitle - A descriptive label for the step used in test reporting.
     * @created by Nandhu
     * @date 2026-04-29
     * @purpose Provides a reusable assertion to verify the text content of any element across all page objects.
     * @example
     * await page.validateText('.page-title', 'Incidents View: Self Service', { stepTitle: 'Page Title' });
     */
    validateText(object: LocateBy, expectedText: string, option?: { stepTitle: string }): Promise<void>

    /**
     * Waits for the specified element to become visible on the page.
     * @param object - The target element to wait for, either as a Playwright `Locator` or a selector string.
     * @param option - Optional configuration object.
     * @param option.stepTitle - A descriptive label for the step used in test reporting.
     * @created by Nandhu
     * @date 2026-04-29
     * @purpose Provides a reusable method to wait for an element to become visible before interacting with it.
     * @example
     * await page.waitForElementVisibility('#incident-form', { stepTitle: 'Incident Form' });
     */
    waitForElementVisibility(object: LocateBy, option?: { stepTitle: string }): Promise<void>

    /**
     * Checks (enables) the specified checkbox element.
     * @param object - The target checkbox element, either as a Playwright `Locator` or a selector string.
     * @param option - Optional configuration object.
     * @param option.stepTitle - A descriptive label for the step used in test reporting.
     * @created by Nandhu
     * @date 2026-04-29
     * @purpose Provides a reusable action to check checkbox elements across all page objects.
     * @example
     * await page.checkCheckbox('#agree-terms', { stepTitle: 'Agree to Terms' });
     */
    checkCheckbox(object: LocateBy, option?: { stepTitle: string }): Promise<void>

}

export interface PageAssertion {

    /**
     * Asserts that the specified element is visible on the page.
     * @param object - The target element to check, either as a Playwright `Locator` or a selector string.
     * @created by Nandhu
     * @date 2026-04-25
     * @purpose Provides a reusable assertion to verify element visibility across all page objects.
     * @example
     * await page.check_Visibility('#success-message');
     */
    check_Visibility(object: LocateBy, options?: { stepTitle: string }): Promise<void>

    /**
     * Polls the specified element at regular intervals until it becomes visible on the page.
     * @param object - The target element to poll, either as a Playwright `Locator` or a selector string.
     * @param option - Optional configuration object.
     * @param option.stepTitle - A descriptive label for the step used in test reporting.
     * @created by Nandhu
     * @date 2026-04-26
     * @purpose Provides a reusable polling assertion to wait for an element to become visible,
     *          useful for dynamic or lazy-loaded elements across all page objects.
     * @example
     * await page.expectPollVisibility('#incident-menu', { stepTitle: 'Incident Menu' });
     */
    expectPollVisibility(object: LocateBy, option?: { stepTitle: string }): Promise<void>

}