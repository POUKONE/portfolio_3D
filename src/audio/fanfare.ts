// An original, procedurally synthesised kickoff fanfare — no external audio
// file, and no melody borrowed from any existing anthem (UEFA's Champions
// League theme is copyrighted and is deliberately not reproduced here).
export function playKickoffFanfare(volume = 0.5) {
  try {
    const AudioContextCtor =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioContextCtor()
    if (ctx.state === 'suspended') ctx.resume()
    const master = ctx.createGain()
    master.gain.value = volume
    master.connect(ctx.destination)

    const now = ctx.currentTime

    function note(freq: number, start: number, duration: number, gain = 0.22) {
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = freq

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 2400

      const env = ctx.createGain()
      env.gain.setValueAtTime(0, now + start)
      env.gain.linearRampToValueAtTime(gain, now + start + 0.02)
      env.gain.linearRampToValueAtTime(gain * 0.7, now + start + duration * 0.6)
      env.gain.linearRampToValueAtTime(0, now + start + duration)

      osc.connect(filter)
      filter.connect(env)
      env.connect(master)
      osc.start(now + start)
      osc.stop(now + start + duration + 0.05)
    }

    // Rising four-note call...
    note(523.25, 0.0, 0.16) // C5
    note(659.25, 0.15, 0.16) // E5
    note(783.99, 0.3, 0.16) // G5
    note(1046.5, 0.45, 0.45) // C6
    // ...then a triumphant chord swell.
    note(783.99, 0.85, 0.85, 0.15) // G5
    note(1046.5, 0.85, 0.85, 0.15) // C6
    note(1318.51, 0.85, 0.85, 0.13) // E6

    window.setTimeout(() => ctx.close(), 2000)
  } catch {
    // Web Audio unavailable — fail silently, this is just a flourish.
  }
}
