import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@cot/app/modules/navigation/services/navigation/navigation.service';
import { UserService } from '@cot/app/modules/authentication/services/user/user.service';
import { LoggerService } from '@cot/app/modules/utility/services/logger/logger.service';
import { StringsService } from '@cot/app/modules/utility/services/strings.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  navItems: any[] = [];
  userDisplayName: String;
  appTitle: String;

  logoUrl: string;

  constructor(
    private stringsService: StringsService,
    private navService: NavigationService,
    private userService: UserService,
    private loggerService: LoggerService,
    platformLocation: PlatformLocation) {
      this.appTitle = this.stringsService.appName;
      this.logoUrl = platformLocation.getBaseHrefFromDOM() + 'assets/logo.png';
    }

  async ngOnInit(): Promise<void> {
    this.navItems = this.navService.getNavItems();

    try {
      const user = await this.userService.getCurrentUser();
      this.userDisplayName = user.friendlyName;
    } catch (e) {
      this.loggerService.print(e);
    }
  }
}
