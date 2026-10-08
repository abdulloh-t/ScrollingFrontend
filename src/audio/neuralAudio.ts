// Procedural Web Audio API soundscape for NeuroFlow
// Generates ambient cosmic drone and synaptic action potential chimes without external audio files

class NeuralAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private lastPulseTime: number = 0;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // Low ambient drone (55Hz Root A1 + 82.4Hz E2 + 110Hz A2)
      const freqs = [55, 82.41, 110, 164.81];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(240 + idx * 80, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.15 / (idx + 1), this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.ambientGain);

        osc.start();
        this.oscillators.push(osc);
      });

      this.isInitialized = true;
    } catch {
      // Audio not permitted or supported
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.6;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.4);
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playSynapticSpark(intensity: number = 0.5) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (now - this.lastPulseTime < 0.08) return; // throttle spark frequency
    this.lastPulseTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft sparkling frequencies (pentatonic scale around 523Hz - 1046Hz)
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      const note = notes[Math.floor(Math.random() * notes.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);
      osc.frequency.exponentialRampToValueAtTime(note * 1.5, now + 0.12);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(note, now);
      filter.Q.setValueAtTime(4, now);

      const amp = Math.min(0.08 * intensity, 0.12);
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // ignore
    }
  }

  public playReinforceChime(dayIndex: number) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    try {
      const baseFrequencies = [220, 277.18, 329.63, 440, 554.37, 659.25];
      const root = baseFrequencies[dayIndex % baseFrequencies.length];

      [root, root * 1.5, root * 2].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.09 / (idx + 1), now + idx * 0.04 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 1.3);
      });
    } catch {
      // ignore
    }
  }

  public setScrollSpeed(speed: number) {
    if (!this.ctx || !this.ambientGain || this.isMuted) return;
    const targetGain = 0.08 + Math.min(speed * 0.06, 0.12);
    this.ambientGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.2);
  }
}

export const neuralAudio = new NeuralAudioEngine();
