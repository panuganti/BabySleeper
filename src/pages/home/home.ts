import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import * as Enumerable from 'linq';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  state: string = 'loading';
  slide_id: string = 'id0';
  playing_id: string;
  favorites: string[] = [];
  all_slides: any[];
  show_header: boolean = false;

  slidesArray = [
    {
      title: "Female Shhh",
      description: "Female voice with Shhh",
      image: "img/phone.png",
      color: "#2662F7",
      id: "id0"
    },
    {
      title: "Hushh Song",
      description: "Works for most infants",
      image: "img/phone.png",
      color: "#FD4B4B",
      id: "id1"
    },
    {
      title: "Talking Parrot",
      description: "Talking Parrot",
      image: "img/phone.png",
      color: "#4BC14B",
      id: "id2"
    },
    {
      title: "My Shhh",
      description: "My Shhh",
      image: "img/phone.png",
      color: "#4BC14B",
      id: "id3"
    },
    {
      title: "End of Sounds",
      description: "Please swipe back for the list",
      image: "img/phone.png",
      color: "#4BC14B",
      id: "end"
    }
  ];

  constructor(public navCtrl: NavController, public nativeAudio: NativeAudio, public platform: Platform) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => this.load().then(() => {
      this.state = 'stopped';
      var fav = JSON.parse(window.localStorage.getItem('favorites'));
      if (fav && fav != null && fav.length > 0) {
        this.favorites = fav;
        this.show_header = true;
      }
      this.update_slides();
    }));
  }

  async load() {
    await this.nativeAudio.preloadComplex('id' + 0, 'assets/media/FemaleShhh.mp3', 1, 1, 0);
    await this.nativeAudio.preloadComplex('id' + 1, 'assets/media/HushBabyNursery.mp3', 1, 1, 0);
    await this.nativeAudio.preloadComplex('id' + 2, 'assets/media/HushTalkingParrot.mp3', 1, 1, 0);
    await this.nativeAudio.preloadComplex('id' + 3, 'assets/media/MyShhh.mp3', 1, 1, 0);
  }


  update_slides() {
    var slidesEn = Enumerable.from(this.slidesArray);
    var favorite_slides = Enumerable.from(this.favorites).select(f => slidesEn.firstOrDefault(s => s.id == f)).where(f => f != null);
    favorite_slides = favorite_slides.concat(this.slidesArray);
    this.all_slides = favorite_slides.toArray();
  }

  favorite(id) {
    this.favorites.push(id);
    window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.update_slides();
    this.slides.slideNext();
  }

  is_favorite(id): boolean {
    return Enumerable.from(this.favorites).any(f => f == id);
  }

  undo_favorite(id) {
    var index = this.favorites.indexOf(id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.update_slides();
      this.slides.slidePrev(100);
    }
  }

  slideChanged() {
    var index = this.slides.getActiveIndex();
    var slide = this.all_slides[index];
    if (slide && slide.id != 'end') {
      this.slide_id = slide.id;
    }
    if (index < this.favorites.length) { this.show_header = true; } else {this.show_header = false;}
  }

  clicked() {
    if (this.state == 'stopped') {
      this.playing_id = this.slide_id;
      this.nativeAudio.loop(this.playing_id).then(() => { this.state = 'playing'; }, (err) => { console.log(err); });
    }
    else if (this.state == 'playing') {
      this.nativeAudio.stop(this.playing_id).then(() => { this.state = 'stopped'; }, (err) => { console.log(err); });
    }
  }

  stop() {
    this.nativeAudio.stop(this.playing_id).then(() => { this.state = 'stopped'; }, (err) => { console.log(err); });
  }
}
