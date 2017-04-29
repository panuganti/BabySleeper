import { NativeAudio } from '@ionic-native/native-audio';
export class NativeAudioMock extends NativeAudio {
  preloadComplex(id: string, assetPath: string, volume: number, voices: number, delay: number): Promise<any> {
        return new Promise((resolve, reject) => {resolve("");}); 
  }

  loop(id: string): Promise<any> {
        return new Promise((resolve, reject) => {resolve("");});
  }

  stop(id: string): Promise<any> {
        return new Promise((resolve, reject) => {resolve("");});
  }
}
