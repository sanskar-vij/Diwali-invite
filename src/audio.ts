import songUrl from './assets/festive-song.mp3';

/**
 * Festive background song player using HTML5 Audio.
 * Plays the user's authentic festive song on loop with smooth controls.
 */
class FestiveAudio {
  private audio: HTMLAudioElement | null = null;
  playing = false;

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio(songUrl);
      this.audio.loop = true;
      this.audio.volume = 0.75;
      this.audio.preload = 'auto';
      
      this.audio.addEventListener('play', () => {
        this.playing = true;
      });
      this.audio.addEventListener('pause', () => {
        this.playing = false;
      });
      this.audio.addEventListener('ended', () => {
        this.playing = false;
      });
    }
    return this.audio;
  }

  async start() {
    const a = this.getAudio();
    try {
      await a.play();
      this.playing = true;
    } catch (err) {
      console.warn('Audio playback prevented or failed:', err);
      this.playing = false;
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
    }
    this.playing = false;
  }
}

export const festiveAudio = new FestiveAudio();
