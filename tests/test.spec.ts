import { test } from "@playwright/test";
import { HomePage } from "../page-objects/homePage";
import { IncidentHomePage } from "../page-objects/incidentHomePage";
import { IncidentPage } from "../page-objects/incidentPage";
import { saveIncidentNumber, loadIncidentNumber } from "../utils/dataHelper";

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
        const createdIncidentNumber = await incidentPage.captureIncidentNumber()
        saveIncidentNumber(createdIncidentNumber)
        console.log(`Created Incident Number: ${createdIncidentNumber}`)
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
        const incidentNumberForUpdate = loadIncidentNumber()
        await incHomePage.searchIncident(incidentNumberForUpdate)
        await incHomePage.clickIncidentLink()
        await incidentPage.pageTitleCheck()
        await incidentPage.pageLoad()
        await incidentPage.updateOpenDate("2019-07-22 14:04:53")
        await incidentPage.selectUrgency("1")
        await incidentPage.enterShortDescription("Updated comments - Update function check")
        await incidentPage.clickUpdateButton()

    })

    test("Resolve Incident - Service Now", async ({ page }) => {
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
        const incidentNumberForResolve = loadIncidentNumber()
        await incHomePage.searchIncident(incidentNumberForResolve)
        await incHomePage.clickIncidentLink()
        await incidentPage.pageTitleCheck()
        await incidentPage.pageLoad()
        await incidentPage.updateCloseDate()
        await incidentPage.enterShortDescription("Resolving the Incident")
        await incidentPage.clickResolveButton()

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
        const incidentNumberForCheck = loadIncidentNumber()
        await incHomePage.SearchIncidentCheckBox(incidentNumberForCheck)

    })

})