import {test, expect, Page} from '@playwright/test';
import About from "../../lib/about.page";

const contextFile = './data/cd-state.json';

test.use({storageState: contextFile});

test.describe('About', async () => {
    test('Logged In Test', async ({page}) => {
        await page.goto('/');
        const about = new About(page, page.baseUrl);
        await page.locator(about.selectors.myProfile).click();
        await expect(page.locator(about.selectors.role)).toContainText('Center Director');
        await page.reload();

        await test.step('Verify About is the Last Tab', async () => {
            await expect(page.locator(about.selectors.tab)).toBeVisible();
            await expect(page.locator(about.selectors.last_tab)).toContainText('About');
        });

        await test.step('Select About Tab', async () => {
            await expect(page.locator(about.selectors.last_tab)).toBeVisible();
            await page.locator(about.selectors.last_tab).click();
            await expect(page.locator(about.selectors.container)).toBeVisible();
        });
        await test.step('Check Nav Entries', async () => {
            await test.step('XDMoD', async () => {
                await about.checkTab('XDMoD');
            });
            await test.step('Open XDMoD', async () => {
                await about.checkTab('Open XDMoD')
            });
            await test.step('SUPReMM', async () => {
                await about.checkTab('SUPReMM');
            });
            await test.step('Roadmap', async () => {
                await about.checkRoadMap();
            });
            await test.step('Team', async () => {
                await about.checkTab('Team');
            });
            await test.step('Publications', async () => {
                await about.checkTab('Publications');
            });
            await test.step('Presentations', async () => {
                await about.checkTab('Presentations');
            });
            await test.step('Links', async () => {
                await about.checkTab('Links');
            });
            await test.step('Release Notes', async () => {
                await about.checkTab('Release Notes');
            });
        });
    });

    test('Logged Out Tests', async ({page}) => {
        await page.goto('/');
        const about = new About(page, page.baseUrl);
        await test.step('Click the logout link', async () => {
            await expect(page.locator(about.selectors.logoutLink)).toBeVisible();
            const expired = await page.isVisible(about.selectors.expiredMessageBox);
            if (expired) {
                await page.click(about.selectors.continueLogoutButton);
            } else {
                await page.locator(about.selectors.logoutLink).click();
            }
        });
        await test.step('Display Logged out State', async () => {
            await page.locator(about.selectors.signInLink).waitFor({state:'visible'});
        });
        await test.step('Verify About is the Last Tab', async () => {
            await expect(page.locator(about.selectors.tab)).toBeVisible();
            await expect(page.locator(about.selectors.last_tab)).toContainText('About');
        });

        await test.step('Select About Tab', async () => {
            await expect(page.locator(about.selectors.tab)).toBeVisible();
            await page.locator(about.selectors.last_tab).click();
            await expect(page.locator(about.selectors.container)).toBeVisible();
        });
        await test.step('Check Nav Entries', async () => {
            await test.step('XDMoD', async () => {
                await about.checkTab('XDMoD');
            });
            await test.step('Open XDMoD', async () => {
                await about.checkTab('Open XDMoD')
            });
            await test.step('SUPReMM', async () => {
                await about.checkTab('SUPReMM');
            });
            await test.step('Roadmap', async () => {
                await about.checkRoadMap();
            });
            await test.step('Team', async () => {
                await about.checkTab('Team');
            });
            await test.step('Publications', async () => {
                await about.checkTab('Publications');
            });
            await test.step('Presentations', async () => {
                await about.checkTab('Presentations');
            });
            await test.step('Links', async () => {
                await about.checkTab('Links');
            });
            await test.step('Release Notes', async () => {
                await about.checkTab('Release Notes');
            });
        });
    });
});
