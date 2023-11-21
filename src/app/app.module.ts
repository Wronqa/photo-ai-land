import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './modules/core/interceptors/api.interceptor';
import { ToastModule } from 'primeng/toast';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from './modules/timeline/timeline.module';
import { SharedModule } from './modules/shared/shared.module';
import { ProfileModule } from './modules/profile/profile.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './modules/store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './modules/store/user/user.effects';
import { LoadingInterceptor } from './modules/core/interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    CoreModule,
    ButtonModule,
    CardModule,
    TimelineModule,
    SharedModule,
    ProfileModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },

    MessageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
