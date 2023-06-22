import {expect} from '@playwright/test';
import {BasePage} from "./base.page";
import selectors from "./about.selectors";

class About extends BasePage{
    readonly selectors = selectors;
    readonly roadMapText = selectors.roadMapText;
    readonly roadMapFrame = selectors.roadMapFrame;
    readonly trelloBoard = selectors.trelloBoard;
    readonly tabLocator = this.page.locator(selectors.tab);
    readonly containerLocator = this.page.locator(selectors.container);
    readonly centerLocator =  this.page.locator(selectors.center);
    readonly lastTabLocator = this.page.locator(selectors.last_tab);

    async checkTab(name){
        let check = selectors.navEntryPath(name);
        if (name == 'XDMoD'){
            check = '(' + check + ')[1]';
        }
        await expect(this.page.locator(check)).toBeVisible();
        await this.page.click(check);
        await this.page.waitForLoadState();
        await expect(this.page.locator(selectors.container)).toBeVisible();
    }

    async checkRoadMap(){
        await expect(this.page.locator(selectors.navEntryPath('Roadmap'))).toBeVisible();
        await this.page.locator(selectors.navEntryPath('Roadmap')).click();
        await this.page.locator(this.roadMapText).waitFor({state:'visible'});
        await this.page.locator(this.roadMapFrame).waitFor({state:'visible'});
        await expect(this.page.locator(this.roadMapFrame)).toBeVisible();
        await this.page.locator(this.roadMapFrame, async function (err, result){
            await expect(err).toEqual(undefined);
            await expect(result).not.toEqual(null);
        });
        await expect(this.page.frameLocator(this.roadMapFrame).locator(this.trelloBoard)).toBeVisible();
        await expect(this.page.frameLocator(this.roadMapFrame).locator(this.trelloBoard).innerText()).not.toEqual(null);
    }
}

export default About;
