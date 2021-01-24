import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './content/header/header.component';
import { SubnavComponent } from './content/subnav/subnav.component';
import { TitleComponent } from './sidebar/title/title.component';
import { PinnedComponent } from './sidebar/pinned/pinned.component';
import { GroupsComponent } from './sidebar/groups/groups.component';
import { UpdatesComponent } from './sidebar/updates/updates.component';
import { SlidenavComponent } from './content/slidenav/slidenav.component';
import { ViewportComponent } from './content/viewport/viewport.component';
import { LibModule } from 'frontend/shared/src/lib/lib.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { TodoModule } from 'frontend/todo/src/app/app.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    ContentComponent,
    SidebarComponent,
    HeaderComponent,
    SubnavComponent,
    TitleComponent,
    PinnedComponent,
    GroupsComponent,
    UpdatesComponent,
    SlidenavComponent,
    NotFoundComponent,
    LoginComponent,
    ViewportComponent,
  ],
  imports: [CommonModule, LibModule, TodoModule.forRoot()],
  exports: [LayoutComponent],
})
export class LayoutModule {}
