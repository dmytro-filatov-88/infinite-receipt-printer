/**
 * The Infinite Receipt Printer
 * Supermarket of Existence #404 — POS-9000
 * Pure Vanilla JS, Procedural Web Audio API, Zero-Build Static Web
 */

(function () {
  'use strict';

  // --- Absurd Itemized Charges Database ---
  const EXISTENTIAL_ITEMS = [
    { desc: "3:00 AM Existential Spiral", dept: "MORTALITY", price: 0.00, qty: 1 },
    { desc: "Unread newsletter subscriptions", dept: "HOARDING", price: 49.99, qty: 412 },
    { desc: "Emotional baggage handling surcharge", dept: "LOGISTICS", price: 12.50, qty: 1 },
    { desc: "Saying 'You too!' after waiter says 'Enjoy your meal'", dept: "SOCIAL CRINGE", price: 8.00, qty: 1 },
    { desc: "Pretending to understand a movie plot", dept: "CULTURE", price: 14.50, qty: 1 },
    { desc: "Impulsive 2:15 AM online cart addition", dept: "IMPULSE", price: 124.90, qty: 1 },
    { desc: "Checking phone for time, locking it, still not knowing", dept: "DORMANCY", price: 1.99, qty: 3 },
    { desc: "Staring blankly into open refrigerator", dept: "HOPELESSNESS", price: 0.00, qty: 5 },
    { desc: "Drafting polite email with 14 exclamation marks", dept: "CORPORATE", price: 6.25, qty: 1 },
    { desc: "Nodding in Zoom meeting while thinking about soup", dept: "REMOTE WORK", price: 45.00, qty: 1 },
    { desc: "Phantom pocket vibration panic", dept: "NEUROLOGY", price: 0.00, qty: 1 },
    { desc: "Walking into a room and instantly forgetting why", dept: "BUFFER LEAK", price: 4.50, qty: 2 },
    { desc: "Snooze button hammer strike", dept: "DENIAL", price: 15.00, qty: 4 },
    { desc: "Buying fresh kale only to watch it liquefy in crisper", dept: "PRODUCE", price: 22.80, qty: 1 },
    { desc: "Rehearsing fictional argument in shower (Won)", dept: "BATHROOM DISS", price: 0.00, qty: 1 },
    { desc: "Saying 'No worries!' while harboring cosmic dread", dept: "CUSTOMER SVC", price: 18.00, qty: 1 },
    { desc: "Waving back to person waving at human behind you", dept: "MORTAL WOUND", price: 75.00, qty: 1 },
    { desc: "Holding door for someone slightly too far away", dept: "AWKWARD PACING", price: 9.99, qty: 1 },
    { desc: "87 browser tabs kept open as emotional support", dept: "RAM CRISIS", price: 87.00, qty: 87 },
    { desc: "Pretending to text while walking past acquaintances", dept: "STEALTH", price: 5.25, qty: 1 },
    { desc: "Watching someone type painfully with index fingers", dept: "AGONY", price: 50.00, qty: 1 },
    { desc: "Adding items to cart just for free shipping", dept: "MATH GENIUS", price: 34.00, qty: 1 },
    { desc: "Remembering that stupid thing you said in 2012", dept: "ARCHIVE", price: 99.00, qty: 1 },
    { desc: "Unused gym subscription monthly tribute", dept: "HEALTH", price: 64.99, qty: 1 },
    { desc: "Overthinking a 3-word reply for 40 minutes", dept: "OVERTHINKING", price: 28.50, qty: 1 },
    { desc: "Reading shampoo bottle ingredients in shower", dept: "BOREDOM", price: 0.00, qty: 1 },
    { desc: "Thinking you had an extra step at top of stairs", dept: "PHYSICS GLITCH", price: 12.00, qty: 1 },
    { desc: "Saying 'Let\'s catch up soon!' (Never catching up)", dept: "ETIQUETTE", price: 30.00, qty: 1 },
    { desc: "Unsent draft saved in Notes app for 3 years", dept: "ARCHAEOLOGY", price: 19.99, qty: 1 },
    { desc: "Closing laptop angrily only to open phone immediately", dept: "CYBERNETICS", price: 11.20, qty: 1 },
    { desc: "Diet commencing next Monday (Deferred liability)", dept: "ESCHATOLOGY", price: 25.00, qty: 1 },
    { desc: "Listening to 9-minute podcast ad at 1x speed", dept: "AUDIO AGONY", price: 14.00, qty: 1 },
    { desc: "Agreeing to 120-page Terms of Service in 0.4s", dept: "SOUL LEASE", price: 0.00, qty: 1 },
    { desc: "Cleaning entire apartment to avoid 5-minute task", dept: "PROCRASTINATION", price: 32.00, qty: 1 },
    { desc: "Fake laughing at joke you didn't hear twice", dept: "SOCIAL SURVIVAL", price: 16.50, qty: 1 },
    { desc: "Tuning acoustic guitar for 25 minutes, playing for 2", dept: "ACOUSTICS", price: 40.00, qty: 1 },
    { desc: "Tasting wine waiter pours like you know tannins", dept: "SOMMELIER", price: 22.00, qty: 1 },
    { desc: "Searching for phone while using phone flashlight", dept: "COGNITIVE LEAK", price: 8.50, qty: 1 },
    { desc: "Subconscious urge to buy expensive stationery", dept: "OFFICE DELUSION", price: 38.00, qty: 1 },
    { desc: "Watching 35 YouTube reviews of a $9 vegetable peeler", dept: "CONSUMER RESEARCH", price: 17.50, qty: 1 },
    { desc: "Staring at screen waiting for download at 99%", dept: "SUSPENSE", price: 5.00, qty: 1 },
    { desc: "Re-reading sent email 8 times to admire own phrasing", dept: "NARCISSISM", price: 12.00, qty: 1 },
    { desc: "Accidentally front-camera selfie jumpscare fee", dept: "TRAUMA", price: 4.99, qty: 1 },
    { desc: "Checking water bottle expiration date with deep skepticism", dept: "HYDROLOGY", price: 0.50, qty: 1 },
    { desc: "Pretending to look at paintings at art gallery", dept: "AESTHETICS", price: 20.00, qty: 1 },
    { desc: "Buying a bookmark instead of reading the book", dept: "LITERATURE", price: 6.99, qty: 1 },
    { desc: "Smiling at dog, ignoring dog's human companion", dept: "CANINE BIAS", price: 0.00, qty: 1 },
    { desc: "Apologizing to a mannequin you bumped into", dept: "REFLEX", price: 10.00, qty: 1 },
    { desc: "Closing refrigerator door as if food standards lowered", dept: "DENIAL", price: 0.00, qty: 2 },
    { desc: "Buying fancy planner you will abandon on Jan 4", dept: "AMBITION", price: 34.50, qty: 1 },
    { desc: "Lying about having seen that popular classic film", dept: "PRESTIGE", price: 15.00, qty: 1 },
    { desc: "Standing up from desk making inexplicable groan sound", dept: "AGING", price: 7.20, qty: 1 },
    { desc: "Pretending you knew the band before they were famous", dept: "HIPSTER TAX", price: 18.00, qty: 1 },
    { desc: "Deleting typed text message to replace with 'k'", dept: "HOSTILITY", price: 25.00, qty: 1 }
  ];

  // --- Procedural Web Audio Engine ---
  class WebAudioPOS {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.masterGain = null;
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn("Web Audio not supported", e);
      }
    }

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      }
      return !this.isMuted;
    }

    // Thermal Stepper Motor step sound
    playPrinterStep() {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      const now = this.ctx.currentTime;
      // High-frequency stepper chirp
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      const baseFreq = 750 + Math.random() * 300;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.025);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      // Low mechanical thump for roller grip
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.03);
    }

    // Serrated Paper Tear rip sound
    playTearSound() {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Procedural paper tear noise with rapid micro-tears
      for (let i = 0; i < bufferSize; i++) {
        const decay = 1 - (i / bufferSize);
        const crackle = Math.random() > 0.65 ? (Math.random() * 2 - 1) * 1.5 : (Math.random() * 2 - 1) * 0.4;
        data[i] = crackle * decay;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for papery friction
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(2.2, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    }

    // Authentic Barcode Scanner Beep
    playScanBeep() {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2650, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.setValueAtTime(0.35, now + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.09);
    }

    // Heavy Rubber Ink Stamp Thud
    playStampSound() {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      const now = this.ctx.currentTime;

      // Deep sub thump
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

      oscGain.gain.setValueAtTime(0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.13);

      // Snap click of the rubber pressing down
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - (i / bufferSize));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start(now);
    }

    // Paper Shredder Mechanical Grinding Churn
    playShredderCrunch() {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      const now = this.ctx.currentTime;
      const duration = 1.1;

      // Motor low hum
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(58, now);
      osc.frequency.linearRampToValueAtTime(64, now + duration * 0.5);
      osc.frequency.linearRampToValueAtTime(52, now + duration);

      oscGain.gain.setValueAtTime(0.2, now);
      oscGain.gain.linearRampToValueAtTime(0.25, now + 0.1);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration);

      // Chewing paper friction noise
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const teethMod = (i % 800 < 300) ? 1.4 : 0.4;
        data[i] = (Math.random() * 2 - 1) * teethMod;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(1.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start(now);
    }

    // Universe Audit Siren & Cosmic Chime
    playUniverseAudit() {
      if (this.isMuted || !this.ctx) return;
      this.resume();

      const now = this.ctx.currentTime;
      // Arpeggiated celestial frequencies
      const freqs = [440, 554.37, 659.25, 830.61, 987.77, 1318.51];
      freqs.forEach((f, idx) => {
        const noteOsc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(f, now + idx * 0.08);

        noteGain.gain.setValueAtTime(0, now + idx * 0.08);
        noteGain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.9);

        noteOsc.connect(noteGain);
        noteGain.connect(this.masterGain);
        noteOsc.start(now + idx * 0.08);
        noteOsc.stop(now + idx * 0.08 + 1.0);
      });
    }
  }

  // --- Confetti & Paper Shreds Particle System ---
  class ConfettiSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    spawnShreds(count = 50, x = window.innerWidth / 2, y = window.innerHeight / 2) {
      const colors = ['#ffffff', '#f4ede2', '#ff4757', '#eccc68', '#70a1ff', '#2ed573', '#ffa502'];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: x + (Math.random() * 80 - 40),
          y: y + (Math.random() * 40 - 20),
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * -6 - 2,
          gravity: 0.25 + Math.random() * 0.15,
          width: 4 + Math.random() * 4,
          height: 12 + Math.random() * 16,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 14,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
          decay: 0.008 + Math.random() * 0.008
        });
      }
      if (!this.animationId) {
        this.loop();
      }
    }

    loop() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;

        if (p.life <= 0 || p.y > this.canvas.height + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.life);
        this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.loop());
      } else {
        this.animationId = null;
      }
    }
  }

  // --- Main Application Controller ---
  class ReceiptPrinterApp {
    constructor() {
      this.audio = new WebAudioPOS();
      this.confetti = new ConfettiSystem(document.getElementById('confetti-canvas'));

      // State
      this.printedItems = [];
      this.archivedReceipts = [];
      this.itemCounter = 0;
      this.subtotal = 0.00;
      this.printSpeedMs = 1200;
      this.autoTimer = null;
      this.activeTool = null; // null | 'scanner' | stampType
      this.stats = {
        totalItemized: 0,
        totalDebt: 0.00,
        totalShredded: 0
      };
      this.brandClickCount = 0;
      this.easterEggActive = false;

      // DOM Elements
      this.activeReceiptEl = document.getElementById('active-receipt');
      this.itemsListEl = document.getElementById('rcpt-items-list');
      this.lcdStatusEl = document.getElementById('lcd-status');
      this.lcdSubEl = document.getElementById('lcd-sub');
      this.ledFeedEl = document.getElementById('led-feed');
      this.ledErrorEl = document.getElementById('led-error');
      this.subtotalValEl = document.getElementById('subtotal-val');
      this.taxValEl = document.getElementById('tax-val');
      this.grandTotalValEl = document.getElementById('grand-total-val');
      this.totalItemsCountEl = document.getElementById('total-items-count');
      this.rcptDateTimeEl = document.getElementById('rcpt-date-time');
      this.tornTrayEl = document.getElementById('torn-tray');
      this.tornCountEl = document.getElementById('torn-count');
      this.laserOverlayEl = document.getElementById('laser-overlay');
      this.laserLineEl = document.getElementById('laser-line');
      this.modalOverlayEl = document.getElementById('modal-overlay');
      this.modalContentEl = document.getElementById('modal-content');
      this.modalCloseBtn = document.getElementById('modal-close-btn');

      // Ledger DOM
      this.statPrintedEl = document.getElementById('stat-printed-count');
      this.statDebtEl = document.getElementById('stat-total-debt');
      this.statShreddedEl = document.getElementById('stat-shredded-count');

      this.init();
    }

    init() {
      this.updateDateTime();
      this.bindEvents();
      this.setupAutoPrint();

      // Print first 2 introductory items
      this.printRandomItem();
      setTimeout(() => this.printRandomItem(), 600);
    }

    updateDateTime() {
      const now = new Date();
      const yyyy = now.getUTCFullYear();
      const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(now.getUTCDate()).padStart(2, '0');
      const hh = String(now.getUTCHours()).padStart(2, '0');
      const mi = String(now.getUTCMinutes()).padStart(2, '0');
      const ss = String(now.getUTCSeconds()).padStart(2, '0');
      this.rcptDateTimeEl.textContent = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss} UTC`;
    }

    bindEvents() {
      // Audio unlock on user gesture
      const unlockAudio = () => {
        this.audio.init();
        this.audio.resume();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('keydown', unlockAudio);

      // Sound toggle
      const soundBtn = document.getElementById('sound-btn');
      soundBtn.addEventListener('click', () => {
        const soundOn = this.audio.toggleMute();
        document.getElementById('sound-label').textContent = soundOn ? "Sound: ON" : "Sound: OFF";
        soundBtn.classList.toggle('active', !soundOn);
      });

      // Hardware FEED button
      const feedBtn = document.getElementById('btn-feed');
      feedBtn.addEventListener('click', () => {
        feedBtn.classList.add('pressed');
        setTimeout(() => feedBtn.classList.remove('pressed'), 120);
        this.printRandomItem();
      });

      // Hardware TEAR button
      const tearBtn = document.getElementById('btn-tear');
      tearBtn.addEventListener('click', () => this.tearReceipt());

      // Speed selection buttons
      const speedButtons = document.querySelectorAll('.speed-option');
      speedButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          speedButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const speed = parseInt(btn.dataset.speed, 10);
          this.setSpeed(speed);
        });
      });

      // Dragging paper downwards manually advances feed
      let isDraggingPaper = false;
      let startY = 0;
      this.activeReceiptEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.rcpt-barcode-wrap')) return;
        isDraggingPaper = true;
        startY = e.clientY;
      });
      window.addEventListener('mouseup', () => { isDraggingPaper = false; });
      window.addEventListener('mousemove', (e) => {
        if (isDraggingPaper) {
          const delta = e.clientY - startY;
          if (delta > 35) {
            startY = e.clientY;
            this.printRandomItem();
          }
        }
      });

      // Touch events for mobile dragging
      this.activeReceiptEl.addEventListener('touchstart', (e) => {
        if (e.target.closest('.rcpt-barcode-wrap')) return;
        startY = e.touches[0].clientY;
      }, { passive: true });
      this.activeReceiptEl.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;
        const delta = currentY - startY;
        if (delta > 40) {
          startY = currentY;
          this.printRandomItem();
        }
      }, { passive: true });

      // Barcode click to scan
      document.getElementById('rcpt-barcode').addEventListener('click', (e) => {
        this.triggerBarcodeScan(e.clientX, e.clientY);
      });

      // Tool rack: Scanner & Stamps
      const scannerBtn = document.getElementById('tool-scanner');
      scannerBtn.addEventListener('click', () => {
        this.setActiveTool(this.activeTool === 'scanner' ? null : 'scanner');
      });

      const stampButtons = document.querySelectorAll('.tool-button[data-stamp]');
      stampButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const stamp = btn.dataset.stamp;
          this.setActiveTool(this.activeTool === stamp ? null : stamp);
        });
      });

      // Stamping action on active receipt
      this.activeReceiptEl.addEventListener('click', (e) => {
        if (this.activeTool && this.activeTool !== 'scanner') {
          this.applyStamp(this.activeReceiptEl, e.clientX, e.clientY, this.activeTool);
        } else if (this.activeTool === 'scanner') {
          this.triggerBarcodeScan(e.clientX, e.clientY);
        }
      });

      // Custom regret charge form
      const form = document.getElementById('custom-charge-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const descInput = document.getElementById('custom-desc');
        const priceInput = document.getElementById('custom-price');
        const desc = descInput.value.trim();
        const price = parseFloat(priceInput.value) || 0.00;
        if (desc) {
          this.printCustomItem(desc, price);
          descInput.value = '';
          priceInput.value = '';
        }
      });

      // Shred All button
      const shredBtn = document.getElementById('btn-shred-all');
      shredBtn.addEventListener('click', () => this.shredAllReceipts());

      // Shredder drag & drop
      const shredderZone = document.getElementById('shredder-zone');
      shredderZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        shredderZone.classList.add('dragover');
      });
      shredderZone.addEventListener('dragleave', () => {
        shredderZone.classList.remove('dragover');
      });
      shredderZone.addEventListener('drop', (e) => {
        e.preventDefault();
        shredderZone.classList.remove('dragover');
        this.shredAllReceipts();
      });

      // Help Modal
      const infoBtn = document.getElementById('info-btn');
      infoBtn.addEventListener('click', () => this.showHelpModal());
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
      this.modalOverlayEl.addEventListener('click', (e) => {
        if (e.target === this.modalOverlayEl) this.closeModal();
      });

      // Easter Egg triggers
      const easterBtn = document.getElementById('easter-egg-btn');
      easterBtn.addEventListener('click', () => this.triggerUniverseAudit());

      const brandPlate = document.getElementById('brand-plate');
      brandPlate.addEventListener('click', () => {
        this.brandClickCount++;
        this.audio.playPrinterStep();
        if (this.brandClickCount >= 5) {
          this.brandClickCount = 0;
          this.triggerUniverseAudit();
        }
      });

      // Keyboard shortcuts
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.code === 'Space') {
          e.preventDefault();
          this.printRandomItem();
        } else if (e.key === 't' || e.key === 'T') {
          this.tearReceipt();
        } else if (e.key === 's' || e.key === 'S') {
          this.setActiveTool(this.activeTool === 'scanner' ? null : 'scanner');
        } else if (e.key === 'e' || e.key === 'E') {
          this.triggerUniverseAudit();
        } else if (e.key === 'Escape') {
          this.closeModal();
          this.setActiveTool(null);
        }
      });
    }

    setActiveTool(tool) {
      this.activeTool = tool;
      document.querySelectorAll('.tool-button').forEach(b => b.classList.remove('active'));

      if (tool === 'scanner') {
        document.getElementById('tool-scanner').classList.add('active');
        document.body.style.cursor = 'crosshair';
      } else if (tool) {
        const btn = document.querySelector(`.tool-button[data-stamp="${tool}"]`);
        if (btn) btn.classList.add('active');
        document.body.style.cursor = 'cell';
      } else {
        document.body.style.cursor = 'default';
      }
    }

    setSpeed(speedMs) {
      this.printSpeedMs = speedMs;
      clearInterval(this.autoTimer);
      if (speedMs > 0) {
        this.autoTimer = setInterval(() => this.printRandomItem(), speedMs);
        this.ledFeedEl.classList.add('active');
        this.lcdStatusEl.textContent = "PRINTING: CONTINUOUS FEED";
      } else {
        this.ledFeedEl.classList.remove('active');
        this.lcdStatusEl.textContent = "PAUSED: MANUAL FEED ONLY";
      }
    }

    setupAutoPrint() {
      this.setSpeed(this.printSpeedMs);
    }

    printRandomItem() {
      const item = EXISTENTIAL_ITEMS[Math.floor(Math.random() * EXISTENTIAL_ITEMS.length)];
      this.addItemToReceipt(item.desc, item.dept, item.price, item.qty);
    }

    printCustomItem(desc, price) {
      this.addItemToReceipt(desc, "CUSTOM REGRET", price, 1);
    }

    addItemToReceipt(desc, dept, price, qty) {
      this.itemCounter++;
      this.subtotal += price;
      this.stats.totalItemized++;
      this.stats.totalDebt += price;

      const itemObj = { id: this.itemCounter, desc, dept, price, qty };
      this.printedItems.push(itemObj);

      // DOM creation
      const row = document.createElement('div');
      row.className = 'rcpt-item-row';
      const formattedPrice = price === 0 ? "$0.00" : `$${price.toFixed(2)}`;

      row.innerHTML = `
        <div class="rcpt-item-main">
          <span class="rcpt-item-desc">${this.escapeHtml(desc)}</span>
          <span class="rcpt-item-price">${formattedPrice}</span>
        </div>
        <div class="rcpt-item-sub">
          <span>DEPT: ${this.escapeHtml(dept)} // QTY: ${qty}</span>
          <span>#${String(this.itemCounter).padStart(4, '0')}</span>
        </div>
      `;

      this.itemsListEl.appendChild(row);

      // Play stepper motor chirp
      this.audio.playPrinterStep();

      // Keep receipt scrolled to newest items
      this.activeReceiptEl.scrollTop = this.activeReceiptEl.scrollHeight;

      // Update calculations
      this.updateTotals();
      this.updateLCD(desc);
      this.updateLedger();
    }

    updateTotals() {
      const tax = this.subtotal * 0.0825;
      const baggage = 12.50;
      const discount = 0.05;
      const grandTotal = Math.max(0, this.subtotal + tax + baggage - discount);

      this.totalItemsCountEl.textContent = this.printedItems.length;
      this.subtotalValEl.textContent = `$${this.subtotal.toFixed(2)}`;
      this.taxValEl.textContent = `$${tax.toFixed(2)}`;
      this.grandTotalValEl.textContent = `$${grandTotal.toFixed(2)}`;
    }

    updateLCD(lastItemDesc) {
      const truncated = lastItemDesc.length > 20 ? lastItemDesc.slice(0, 18) + '..' : lastItemDesc;
      this.lcdStatusEl.textContent = `PRINT: ${truncated.toUpperCase()}`;
      this.lcdSubEl.textContent = `BUF: OK // ITEM #${String(this.itemCounter).padStart(3, '0')} // DEBT: $${this.subtotal.toFixed(0)}`;
    }

    updateLedger() {
      this.statPrintedEl.textContent = this.stats.totalItemized;
      this.statDebtEl.textContent = `$${this.stats.totalDebt.toFixed(2)}`;
      this.statShreddedEl.textContent = this.stats.totalShredded;
    }

    tearReceipt() {
      if (this.printedItems.length === 0) {
        this.lcdStatusEl.textContent = "NOTICE: PAPER BLANK!";
        return;
      }

      this.audio.playTearSound();

      // Clone items and total for the archive
      const slipData = {
        id: Date.now(),
        date: new Date().toLocaleTimeString(),
        itemsCount: this.printedItems.length,
        total: (this.subtotal * 1.0825 + 12.50 - 0.05).toFixed(2),
        items: [...this.printedItems]
      };

      this.archivedReceipts.push(slipData);
      this.renderTornSlip(slipData);

      // Reset live receipt
      this.itemsListEl.innerHTML = '';
      this.printedItems = [];
      this.subtotal = 0.00;
      this.updateDateTime();
      this.updateTotals();

      this.lcdStatusEl.textContent = "PAPER TEAR OK // NEW BUFFER";
      this.lcdSubEl.textContent = "STORE #666 // READY FOR SINS";

      // Slight paper flutter animation
      this.activeReceiptEl.style.transform = 'translateY(12px)';
      setTimeout(() => {
        this.activeReceiptEl.style.transform = 'translateY(0)';
      }, 150);
    }

    renderTornSlip(slip) {
      const placeholder = this.tornTrayEl.querySelector('div[style*="font-style:italic"]');
      if (placeholder) placeholder.remove();

      const slipEl = document.createElement('div');
      slipEl.className = 'torn-slip';
      const randomRot = (Math.random() * 8 - 4).toFixed(1);
      slipEl.style.setProperty('--rot', `${randomRot}deg`);
      slipEl.setAttribute('draggable', 'true');

      slipEl.innerHTML = `
        <div class="torn-slip-actions">
          <button class="mini-action-btn view-btn" title="Inspect slip">👁️</button>
          <button class="mini-action-btn delete-btn" title="Shred this receipt">✂️</button>
        </div>
        <div style="font-weight:bold; border-bottom:1px dashed #777; padding-bottom:3px; margin-bottom:5px;">
          SUPERMARKET #404
        </div>
        <div style="font-size:8.5px; color:#555;">Torn at ${slip.date}</div>
        <div style="margin:6px 0; font-size:9px; max-height:80px; overflow:hidden; text-overflow:ellipsis;">
          ${slip.items.slice(0, 4).map(it => `<div>• ${this.escapeHtml(it.desc)}</div>`).join('')}
          ${slip.items.length > 4 ? `<div>... +${slip.items.length - 4} more charges</div>` : ''}
        </div>
        <div style="border-top:1px solid #333; padding-top:4px; font-weight:900; display:flex; justify-content:space-between;">
          <span>TOTAL:</span>
          <span>$${slip.total}</span>
        </div>
        <div class="torn-slip-edge"></div>
      `;

      slipEl.querySelector('.view-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.showSlipDetailModal(slip);
      });

      slipEl.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.shredSingleSlip(slipEl, slip);
      });

      slipEl.addEventListener('click', (e) => {
        if (this.activeTool && this.activeTool !== 'scanner') {
          this.applyStamp(slipEl, e.clientX, e.clientY, this.activeTool);
        } else {
          this.showSlipDetailModal(slip);
        }
      });

      slipEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', String(slip.id));
      });

      this.tornTrayEl.prepend(slipEl);
      this.tornCountEl.textContent = this.archivedReceipts.length;
    }

    applyStamp(targetContainer, clientX, clientY, stampType) {
      const rect = targetContainer.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const stampEl = document.createElement('div');
      stampEl.className = `rubber-stamp stamp-${stampType}`;
      const randomAngle = (Math.random() * 24 - 12).toFixed(1);
      stampEl.style.setProperty('--stamp-angle', `${randomAngle}deg`);
      stampEl.style.left = `${Math.max(10, x - 50)}px`;
      stampEl.style.top = `${Math.max(10, y - 20)}px`;
      stampEl.textContent = stampType.toUpperCase();

      targetContainer.appendChild(stampEl);
      this.audio.playStampSound();
    }

    triggerBarcodeScan(clickX, clickY) {
      this.audio.playScanBeep();

      // Show animated laser beam across barcode
      this.laserOverlayEl.style.display = 'block';
      this.laserLineEl.style.top = `${clickY || window.innerHeight * 0.6}px`;
      this.laserLineEl.style.left = `${clickX || window.innerWidth * 0.4}px`;

      setTimeout(() => {
        this.laserOverlayEl.style.display = 'none';
      }, 350);

      const randomCharges = [
        "1x Existential Dread (Aisle 9) — $0.00",
        "1x Lingering Guilt from 2017 — $42.50",
        "1x Warranty on Youth (EXPIRED) — $999.99",
        "1x Unredeemed Potential — PRICELESS",
        "1x Instant Validation (Out of stock) — $0.00"
      ];
      const scannedItem = randomCharges[Math.floor(Math.random() * randomCharges.length)];

      this.showModal(`
        <div style="text-align:center;">
          <div style="font-size:36px; margin-bottom:8px;">🔴 🔫 🛒</div>
          <h2 style="font-size:18px; color:#55f36e; font-family:var(--font-mono); margin-bottom:6px;">
            BARCODE SCAN CONFIRMED
          </h2>
          <div style="font-family:var(--font-mono); font-size:14px; background:#12161f; padding:12px; border-radius:8px; border:1px solid #2d3748; margin:12px 0;">
            ${scannedItem}
          </div>
          <p style="font-size:12px; color:#a0aec0; line-height:1.5;">
            Our omniscient POS database has cataloged this soul liability. No cash refunds. Store credit will be issued in the form of mild recurring nostalgia.
          </p>
        </div>
      `);
    }

    shredSingleSlip(slipEl, slip) {
      this.audio.playShredderCrunch();
      const rect = slipEl.getBoundingClientRect();
      this.confetti.spawnShreds(24, rect.left + rect.width / 2, rect.top + rect.height / 2);

      slipEl.style.transform = 'scale(0.8) translateY(30px)';
      slipEl.style.opacity = '0';
      setTimeout(() => {
        slipEl.remove();
        this.archivedReceipts = this.archivedReceipts.filter(s => s.id !== slip.id);
        this.tornCountEl.textContent = this.archivedReceipts.length;
        this.stats.totalShredded += slip.itemsCount;
        this.updateLedger();
      }, 200);
    }

    shredAllReceipts() {
      if (this.archivedReceipts.length === 0) {
        this.lcdStatusEl.textContent = "SHREDDER EMPTY!";
        return;
      }

      this.audio.playShredderCrunch();
      const shredderBox = document.getElementById('shredder-zone');
      const rect = shredderBox.getBoundingClientRect();
      this.confetti.spawnShreds(80, rect.left + rect.width / 2, rect.top);

      let shreddedItemsCount = 0;
      this.archivedReceipts.forEach(s => shreddedItemsCount += s.itemsCount);
      this.stats.totalShredded += shreddedItemsCount;
      this.archivedReceipts = [];
      this.tornCountEl.textContent = '0';
      this.tornTrayEl.innerHTML = `
        <div style="color:#6d7a8d; font-size:11px; font-style:italic; padding:20px; text-align:center; width:100%;">
          All receipts shredded to confetti. Your conscience is clean!
        </div>
      `;

      this.updateLedger();
      this.lcdStatusEl.textContent = "SHREDDER: 100% REGRETS DESTROYED";
    }

    triggerUniverseAudit() {
      if (this.easterEggActive) return;
      this.easterEggActive = true;

      this.audio.playUniverseAudit();
      document.body.classList.add('cosmic-audit-mode');
      this.confetti.spawnShreds(120, window.innerWidth / 2, window.innerHeight * 0.3);

      this.lcdStatusEl.textContent = "⚠️ UNIVERSE AUDIT IN PROGRESS ⚠️";
      this.lcdSubEl.textContent = "ENTROPY SINS DETECTED // IRS LEVEL 99";

      const cosmicCharges = [
        { desc: "Spacetime Fabric Repair Surcharge", dept: "ASTROPHYSICS", price: 999999999.00, qty: 1 },
        { desc: "Gravitational Constant Variance Fine", dept: "COSMOLOGY", price: 420000000.00, qty: 1 },
        { desc: "Second Law of Thermodynamics Non-Compliance", dept: "ENTROPY", price: 7777777.77, qty: 1 },
        { desc: "Universal Consciousness Lease Extension", dept: "NIRVANA", price: 108.00, qty: 1 }
      ];

      cosmicCharges.forEach((c, idx) => {
        setTimeout(() => {
          this.addItemToReceipt(c.desc, c.dept, c.price, c.qty);
        }, idx * 250);
      });

      setTimeout(() => {
        document.body.classList.remove('cosmic-audit-mode');
        this.easterEggActive = false;
        this.lcdStatusEl.textContent = "AUDIT COMPLETE: DEBT INFINITE";
      }, 7000);
    }

    showSlipDetailModal(slip) {
      const itemsHtml = slip.items.map(it => `
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:12px; font-family:var(--font-mono);">
          <span>${this.escapeHtml(it.desc)}</span>
          <span style="font-weight:bold;">$${it.price.toFixed(2)}</span>
        </div>
      `).join('');

      this.showModal(`
        <div>
          <div style="font-size:20px; font-weight:bold; color:#ffffff; margin-bottom:4px;">
            🧾 Torn Receipt Archive (#${slip.id.toString().slice(-4)})
          </div>
          <div style="font-size:11px; color:#8c9ba5; margin-bottom:14px; font-family:var(--font-mono);">
            TORN AT: ${slip.date} // TOTAL ITEMS: ${slip.itemsCount}
          </div>
          <div style="max-height:240px; overflow-y:auto; background:#12161f; padding:12px; border-radius:6px; border:1px solid #2e384d; margin-bottom:12px;">
            ${itemsHtml}
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:15px; color:#55f36e; font-family:var(--font-mono); margin-bottom:14px;">
            <span>GRAND TOTAL:</span>
            <span>$${slip.total}</span>
          </div>
          <div style="display:flex; gap:10px;">
            <button id="modal-copy-btn" class="charge-submit-btn" style="flex:1;">📋 Copy Receipt Text</button>
            <button id="modal-shred-btn" class="shredder-btn" style="flex:1;">🗑️ Shred This Slip</button>
          </div>
        </div>
      `);

      document.getElementById('modal-copy-btn').addEventListener('click', () => {
        const text = `SUPERMARKET OF EXISTENCE #404\nTorn: ${slip.date}\nTotal: $${slip.total}\n` + 
          slip.items.map(i => `- ${i.desc}: $${i.price.toFixed(2)}`).join('\n');
        navigator.clipboard.writeText(text).then(() => {
          document.getElementById('modal-copy-btn').textContent = "✅ Copied to Clipboard!";
        });
      });

      document.getElementById('modal-shred-btn').addEventListener('click', () => {
        this.closeModal();
        const slipEl = [...document.querySelectorAll('.torn-slip')].find(el => el.textContent.includes(`$${slip.total}`));
        if (slipEl) this.shredSingleSlip(slipEl, slip);
      });
    }

    showHelpModal() {
      this.showModal(`
        <div>
          <div style="font-size:22px; font-weight:bold; color:#ffffff; margin-bottom:4px;">
            🧾 The Infinite Receipt Printer
          </div>
          <div style="font-size:12px; color:#55f36e; font-family:var(--font-mono); margin-bottom:12px;">
            EPSON-NIHILIST-9000 // USER MANUAL
          </div>
          <div style="font-size:12.5px; color:#cbd5e1; line-height:1.6; display:flex; flex-direction:column; gap:8px;">
            <p><strong>• Continuous Feed:</strong> The printer runs continuously, itemizing your daily absurd life costs with authentic synthesized stepper motor acoustics.</p>
            <p><strong>• Tear Receipt [T]:</strong> Hit the red cutter button or press <kbd>T</kbd> to sever the receipt and file it in the archives.</p>
            <p><strong>• Barcode Scanner [S]:</strong> Click the scanner tool or press <kbd>S</kbd> to inspect the receipt's existential barcode with laser precision.</p>
            <p><strong>• Rubber Stamps:</strong> Pick a stamp (PAID, VOID, DENIED, GUILT, OVERDUE) and slam it onto any receipt on your desk.</p>
            <p><strong>• Paper Shredder:</strong> Drag archived receipts into the shredder or click "Shred All" to obliterate your regrets into confetti.</p>
            <p><strong>• Universe Audit [E]:</strong> Trigger the celestial Easter egg for an apocalyptic cosmic tax audit!</p>
          </div>
        </div>
      `);
    }

    showModal(html) {
      this.modalContentEl.innerHTML = html;
      this.modalOverlayEl.classList.add('active');
    }

    closeModal() {
      this.modalOverlayEl.classList.remove('active');
    }

    escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ReceiptPrinterApp());
  } else {
    new ReceiptPrinterApp();
  }
})();
