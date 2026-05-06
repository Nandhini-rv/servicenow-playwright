import { test } from "@playwright/test";
import { HomePage } from "../page-objects/homePage";
import { IncidentHomePage } from "../page-objects/incidentHomePage";
import { IncidentPage } from "../page-objects/incidentPage";

const SERVICE_NOW_URL = process.env.URL!


test.describe("Service Now Incident Functionalities Check", async () => {
    test("Create Incident - Service Now", async ({ page }) => {
        const homePage = new HomePage(page)
        const incHomePage = new IncidentHomePage(page)
        const incidentPage = new IncidentPage(page)
        await page.goto(SERVICE_NOW_URL)
        await homePage.pageTitleCheck()
        await homePage.validateUtilityContainerVisibility()
        await homePage.selectAllMenu()
        await homePage.selectIncidentMenu()
        await incHomePage.pageTitleCheck()
        await incHomePage.validateNewIncidentVisibility()
        await incHomePage.clickCreateNewIncident()
        await incidentPage.pageTitleCheck()
        await incidentPage.pageLoad()
        await incidentPage.enterShortDescription("Test Description")
        await incidentPage.clickSubmitButton()
    })

    test("Search and Update Incident - Service Now", async ({ page }) => {
        const homePage = new HomePage(page)
        const incHomePage = new IncidentHomePage(page)
        const incidentPage = new IncidentPage(page)
        await page.goto(SERVICE_NOW_URL)
        await homePage.pageTitleCheck()
        await homePage.validateUtilityContainerVisibility()
        await homePage.selectAllMenu()
        await homePage.selectIncidentMenu()
        await incHomePage.pageTitleCheck()
        await incHomePage.searchIncident("INC0010035")
        await incHomePage.clickIncidentLink()
        await incidentPage.pageTitleCheck()
        await incidentPage.pageLoad()
        await incidentPage.updateOpenDate("2019-07-22 14:04:53")
        await incidentPage.selectUrgency("1")
        await incidentPage.enterShortDescription("Updated comments - Update function check")
        await incidentPage.clickUpdateButton()

    })

    test("Close Incident - Service Now", async ({ page }) => {
        const homePage = new HomePage(page)
        const incHomePage = new IncidentHomePage(page)
        const incidentPage = new IncidentPage(page)
        await page.goto(SERVICE_NOW_URL)
        await homePage.pageTitleCheck()
        await homePage.validateUtilityContainerVisibility()
        await homePage.selectAllMenu()
        await homePage.selectIncidentMenu()
        await incHomePage.pageTitleCheck()
        await incHomePage.validatePageLoad()
        await incHomePage.searchIncident("INC0010035")
        await incHomePage.clickIncidentLink()
        await incidentPage.pageTitleCheck()
        await incidentPage.pageLoad()
        await incidentPage.updateCloseDate()
        await incidentPage.enterShortDescription("Closing the Incident")

    })

    test("Check Incident - Service Now", async ({ page }) => {
        const homePage = new HomePage(page)
        const incHomePage = new IncidentHomePage(page)
        const incidentPage = new IncidentPage(page)
        await page.goto(SERVICE_NOW_URL)
        await homePage.pageTitleCheck()
        await homePage.validateUtilityContainerVisibility()
        await homePage.selectAllMenu()
        await homePage.selectIncidentMenu()
        await incHomePage.pageTitleCheck()
        await incHomePage.SearchIncidentCheckBox("INC0010038")

    })

})