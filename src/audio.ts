/**
 * Festive ambient music synthesized with the Web Audio API:
 * a soft tanpura-style drone (Sa–Pa) with gentle temple bell chimes.
 * Only ever started by an explicit user tap.
 */
class FestiveAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private nodes: AudioNode[] = [];
  private bellTimer = 0;
  playing = false;

  async start() {
    if (this.playing) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!this.ctx) this.ctx = new AC();
    const ctx = this.ctx;
    await ctx.resume();
    this.master = ctx.createGain();
    this.master.gain.setValueAtTime(0, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 2.5);
    this.master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.7;
    filter.connect(this.master);

    const sa = 138.59; // C#3
    [sa, sa * 1.5, sa * 2, sa * 0.5].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 3 ? 'sine' : 'sawtooth';
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 6;
      const g = ctx.createGain();
      g.gain.value = i === 3 ? 0.35 : 0.08;
      // slow "jawari" swell
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.12 + i * 0.05;
      const lg = ctx.createGain();
      lg.gain.value = i === 3 ? 0.1 : 0.05;
      lfo.connect(lg).connect(g.gain);
      o.connect(g).connect(filter);
      o.start(); lfo.start();
      this.nodes.push(o, lfo, g, lg);
    });
    this.nodes.push(filter);

    const scale = [0, 2, 4, 7, 9, 12, 14]; // pentatonic-ish
    const bell = () => {
      if (!this.ctx || !this.master) return;
      const t = this.ctx.currentTime;
      const f = sa * 4 * Math.pow(2, scale[(Math.random() * scale.length) | 0] / 12);
      [1, 2.76, 5.4].forEach((m, k) => {
        const o = this.ctx!.createOscillator();
        o.type = 'sine';
        o.frequency.value = f * m;
        const g = this.ctx!.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.18 / (k + 1), t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5 / (k + 1));
        o.connect(g).connect(this.master!);
        o.start(t); o.stop(t + 4);
      });
      this.bellTimer = window.setTimeout(bell, 2200 + Math.random() * 3800);
    };
    this.bellTimer = window.setTimeout(bell, 800);
    this.playing = true;
  }

  stop() {
    if (!this.ctx || !this.master) return;
    clearTimeout(this.bellTimer);
    const m = this.master;
    const t = this.ctx.currentTime;
    m.gain.cancelScheduledValues(t);
    m.gain.setValueAtTime(m.gain.value, t);
    m.gain.linearRampToValueAtTime(0, t + 0.6);
    const nodes = this.nodes;
    this.nodes = [];
    setTimeout(() => {
      nodes.forEach((n) => { try { (n as OscillatorNode).stop?.(); } catch { /* noop */ } n.disconnect(); });
      m.disconnect();
    }, 700);
    this.master = null;
    this.playing = false;
  }
}

export const festiveAudio = new FestiveAudio();
