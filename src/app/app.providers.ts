import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';
import { NativeAudioMock } from '../mocks/nativeaudio.mock';

export class AppProviders {
    public static getProviders() {
        let providers;
        if(document.URL.includes('https://') || document.URL.includes('http://')){
          // Use browser providers
          providers =   [
            StatusBar,
            SplashScreen,
            BackgroundMode,
            { provide: NativeAudio, useClass: NativeAudioMock},
            {provide: ErrorHandler, useClass: IonicErrorHandler}
            ];  
            } else {
                // Use device providers
          providers = [
            StatusBar,
            SplashScreen,
            BackgroundMode,
            NativeAudio,
            {provide: ErrorHandler, useClass: IonicErrorHandler}
            ];  
        } 
        return providers;
    } 
}
