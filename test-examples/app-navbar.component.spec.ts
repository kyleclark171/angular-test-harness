import { AppNavbarComponent } from './app-navbar.component';
import { BaseComponentTest } from '@cot/test/base-component-test';
import { async } from '@angular/core/testing';
import { NavigationService } from '@cot/app/modules/navigation/services/navigation/navigation.service';
import { NavItemVM } from '@cot/app/modules/navigation/view-models/nav-item.view-model';
import { UserService } from '@cot/app/modules/authentication/services/user/user.service';
import { LoggerService } from '@cot/app/modules/utility/services/logger/logger.service';
import { NavigationServiceSpy } from '@cot/app/modules/navigation/services/navigation/navigation.service.spy';
import { UserServiceSpy } from '@cot/app/modules/authentication/services/user/user.service.spy';
import { LoggerServiceSpy } from '@cot/app/modules/utility/services/logger/logger.service.spy';

export class AppNavbarComponentTest extends BaseComponentTest<AppNavbarComponent> {
    constructor() { super(AppNavbarComponent); }

    describeTests() {
        it('should set the app title of the page', async(() => {
            expect(this.target.appTitle).toBeDefined();
        }));

        describe('ngOnInit', () => {
            let navServiceSpy: NavigationServiceSpy;
            let userServiceSpy: UserServiceSpy;
            let loggerServiceSpy: LoggerServiceSpy;

            beforeEach(async(() => {
                navServiceSpy = this.harness.resolveSpy(NavigationService);
                userServiceSpy = this.harness.resolveSpy(UserService);
                loggerServiceSpy = this.harness.resolveSpy(LoggerService);
            }));

            it('should retrieve menu items from the navigation service', async(() => {
                this.target.ngOnInit();
                expect(navServiceSpy.getNavItems).toHaveBeenCalled();
            }));

            it('should set navItems', async(() => {
                this.target.ngOnInit();
                expect(this.target.navItems.length).toBe(navServiceSpy.getNavItems().length);
            }));

            it('should set 2 navItems when the nav svc returns 2 items', async(async () => {
                navServiceSpy.getNavItems
                    .and.returnValue([
                        new NavItemVM(),
                        new NavItemVM()
                    ]);
                await this.target.ngOnInit();
                expect(this.target.navItems.length).toBe(2);
            }));

            it('should set the userDisplayName', async(async () => {
                const expectedDisplayName = (await userServiceSpy.getCurrentUser()).friendlyName;
                await this.target.ngOnInit();
                expect(this.target.userDisplayName).toBe(expectedDisplayName);
            }));

            it('should log error on failure', async(async () => {
                const expectedError = 'request failure';
                userServiceSpy.getCurrentUser.and.returnValue(Promise.reject(expectedError));

                await this.target.ngOnInit();

                expect(loggerServiceSpy.print).toHaveBeenCalledWith(expectedError);
            }));
        });
    }
}
