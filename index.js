example = `Gravelley voice: But first you must complete the Infernal Rites three
Piping voice: Oh yes, the Infernal Rites, the Infernal Rites!
Gravelley voice: The first infernal rite is to pass the Iron Gates
Snarling voice: He'll never pass the Iron Gates!
Chittering voice: The Iron Gates, oh, how I love the Iron Gates!
All, in chorus: The Iron Gates! The Iron Gates!
Liquid voice: The second Infernal Rite is to defeat the Stone Guardians seven
Lugubrious voice: The first Stone Guardian is...`

rand = () = {
  state: (new Array(5)).fill(0),
  get: (n, level = 0) => {
    r = Math.floor(n * Math.random());
    v = 0;
    if (rand.state.includes(r)) {
      if (level > 10) return r;
      return rand.get(n, level + 1);
    } else {
      rand.state.pop();
      rand.state.unshift(r);
      return r;
    }
  },
}

rand = n => Math.floor(n * Math.random());

cap = s => s[0].toUpperCase() + s.slice(1);
evalThunk = (x, ...args) => ((x instanceof Function) ? x(...args) : x);
randItem = x => x[rand(x.length)];
conjure = (_thing) => (...args) => evalThunk(randItem(_thing), ...args);


_chittering = [
  'snarling',
  'gravelly',
  'rumbling',
  'cackling',
  'chittering',
  'high-pitched',
  'lugubrious',
  'piping',
  'sing-song',
  'grinning',
  'liquid',
  'viscid',
  'sympathetic',
  'quiet',
  'wistful',
  'soft',
  'ghostly',
];
chittering = conjure(_chittering);

_shriek = [
  'shriek',
  'scream',
  'chant',
  'intone',
  'voice',
  'mutter',
  'murmur',
  'whisper',
];
shriek = conjure(_shriek);

// e.g. 'iron gates'
_cursed = [
  'iron',
  'cursed',
  'infernal',
  'overpowering',
  'damned',
  'wicked',
  'molten',
  'stone',
  'firey',
  'eternal',
  'meta',
  'chaotic',
  'disorderly',
  'erisian',
  'aneristic',
  'five-fold',
  'seven-fold',
  'eight-fold',
  'undefined',
]
cursed = conjure(_cursed);

_moreChallenges = [
  'rite',
  'ritual',
  'trial',
  ''
]

_bog = [
  'bog',
  'gate',
  'desert',
  'sea',
  'void',
  'archipellago',
]

_sultanOfDoom = [
  () => `${cap(sultan())} of ${cap(doom())}`,
  () => `${cap(sultan())} of ${cap(cursed())} ${cap(doom())}`,
  () => `${cap(cursed())} ${cap(sultan())} of ${cap(doom())}`,
  () => `${sultanOfDoom()}, the ${sultanOfDoom()}`,
]
sultanOfDoom = conjure(_sultanOfDoom);

_sultan = [
  'guardian',
  'dragon',
  'demon',
  'sultan',
  'beast',
  'warrior',
  'general',
  'daimyo',
  'god',
  'goddess',
  'scion',
  () => sultan() + '-' + sultan(),
  () => sultan() + '-' + sultan(),
]
sultan = conjure(_sultan);

_defeat = [
  'overcome',
  'surpass',
  'defeat',
  'get past',
  'beat',
  'best',
]
defeat = conjure(_defeat)

// e.g. 'of Doom'
_doom = [
  'doom',
  'odors',
  'stench',
  'horror',
  'chaos',
  'balance',
  'order',
  'excessive meta balance'
]
doom = conjure(_doom);

interp = (s) => (overcome, trial) => s.replace(/overcome/g, overcome()).replace(/trial/g, trial());
_interjections = [
  "He'll never overcome the trial!",
  "Oh, I love the trial!",
  "The trial! The trial!",
  "Why is it always the trial?",
  "Yesss, the trial!",
].map(x => interp(x))
interjections = conjure(_interjections)

_sentenceTemplates = [
  "You must overcome the trial.",
  "You have to overcome the trial.",
  "It is necessary to overcome the trial.",
  "You ought to overcome the trial.",
  "You'd better overcome the trial.",
]

entry = () => {
  r = Math.random();
  if (r > 0.3) {
    overcome = defeat;
    challenge = sultanOfDoom;
  } else if (r > 0.7){
    overcome = traverse;
    challenge = bog;
  } else {
    overcome = complete;
    challenge = moreChallenges;
  }

  return {
    peanutGallery: (new Array(rand(3)).map(() => interjections(overcome, trial))

  }
}