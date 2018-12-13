const cp = require('child_process');
var _cursed = require('./words/cursed');
var _shriek = require('./words/shriek');
var _chittering = require('./words/chittering');
var _moreChallenges = require('./words/moreChallenges');
var _bog = require('./words/bog');
var _defeat = require('./words/defeat');
var _doom = require('./words/doom');
var _traverse = require('./words/traverse');
var _sultan = require('./words/sultan');
var _complete = require('./words/complete');
var _interjections = require('./words/interjections');

MAX_LINE_LENGTH = 100;
MAX_CHALLENGE_LENGTH = 40;
MAX_LINES = 2000;
linesTotal = 0;

var plural = (s) => {
  if (s instanceof Function) return (...args) => plural(s(...args));
  var rules = {
    a: /um$/, 
    es: /is$/, 
    i: /us$/, 
    $1es: /(sh?)$/,
    icies: /(i|e)x$/,
    xes: /x$/,
    ies: /y$/, 
    ves: /fe$/, 
    $1s: /([^s])$/,
  };
  for (r in rules) {
    var n = s.replace(rules[r], r);
    if (n !== s) return n;
  }
  return s;
}

var rand = n => Math.floor(n * Math.random());

var cap = s => {
  if (s instanceof Function) return (...args) => cap(s(...args));
  return s[0].toUpperCase() + s.slice(1);
}

var et = (x, ...args) => ((x instanceof Function) ? et(x(...args)) : x);
var conjure = (_thing) => {
  var l = Math.floor(_thing.length / 2);
  var recents = (new Array(l));
  var randSkipRecents = a => {
    r = rand(a.length);
    if (recents.includes(r)) {
      return randSkipRecents(a);
    }
    recents.pop();
    recents.unshift(r);
    return a[r];
  }
  return (...args) => et(randSkipRecents(_thing), ...args);
}

var makeLine = (voice, text, verb = 'says') => {
  text = cap(et(text));
  // text = text.replace(/([^.])\.$/, '$1,');
  voice = cap(et(voice));
  let a = voice[0].match(/h?[aeiou]/) ? 'an' : 'a'
  // return `"${cap(et(text))}" ${verb} ${a} ${et(voice)}`;
  return `${et(voice)}: ${cap(et(text))}`;
}

// the et is so it doesn't deplete uniqueness
var maybe = (s, p = 0.5) => Math.random() < p ? `${et(s)} ` : '';
var mb = (s1, s2 = "") => Math.random() < 0.5 ? et(s1) : et(s2);

var chittering = conjure(_chittering);
var shriek = conjure(_shriek);

var _chitteringVoice = [
  () => `${chittering()} ${shriek()}`,
  () => `${chittering()} ${shriek()}`,
  () => `${chittering()} ${shriek()}`,
  () => `${chittering()} ${shriek()}`,
  () => `${chittering()}, ${chittering()} ${shriek()}`,
]
var chitteringVoice = conjure(_chitteringVoice);

var doom = conjure(_doom);
var Doom = cap(doom);
var cursed = conjure(_cursed);
var Cursed = cap(cursed);
var bog = conjure(_bog);
var Bog = cap(bog);
var _cursedBogOfTheSultanOfDoom = [
  () => `${Bog()} of the ${Cursed()} ${Sultan()}`,
  () => `${Bog()} of ${Doom()}`,
  () => `${Cursed()} ${Bog()} of ${Doom()}`,
  () => `${Cursed()} ${Bog()}`,
  () => `${Cursed()} ${Bog()}`,
  () => `${Bog()} of the ${sultanOfDoom()}`,
]
var cursedBogOfTheSultanOfDoom = conjure(_cursedBogOfTheSultanOfDoom);
var traverse = conjure(_traverse);

var bodyPart = conjure(['skull', 'bone', 'left arm', 'right arm', 'heart', 'hand']);
var BodyPart = cap(bodyPart);
var _weapon = ['sword', 'shield', 'glaive', 'axe', 'dagger'];
var _artifact = _weapon.concat(['trophy', 'philtre', 'device', 'phylactery', 'cauldron', 'artifact']);
var artifact = conjure(_artifact);
var Artifact = cap(artifact);
var shard = conjure(['shard', 'fragment', 'piece', 'splinter']);

var _artifactOfDoom = [
  () => `${seven(rand(5) + 2)} ${maybe(Cursed)}${plural(BodyPart())} of ${Doom()}`,
  () => `${maybe(Cursed)}${BodyPart()} of ${Doom()}`,
  () => `${maybe(Cursed)}${Artifact()} of ${Doom()}`,
  () => `${maybe(Cursed)}${BodyPart()} of the ${sultanOfDoom()}`,
  () => `${maybe(Cursed)}${Artifact()} of the ${sultanOfDoom()}`,
  () => `${seven(rand(12) + 2)} ${plural(Artifact())} of the ${sultanOfDoom()}`,
  () => `${seventh(rand(5) + 2)} ${sultanOfDoom()}`, // yes, a sultan is an artifact, sure
  () => `${seven(rand(12) + 2)} ${plural(shard())} of the ${maybe('soul of the')}${sultanOfDoom()}`,
  () => `${seven(rand(12) + 2)} ${cursed()} ${plural(shard())} of the ${sultanOfDoom()}`,
]
var artifactOfDoom = conjure(_artifactOfDoom);

var retrieve = conjure(['retrieve', 'fetch', 'destroy', 'consume', 'locate', 'learn from', 'find'])

var _moreSultans = [
  () => Sultan() + '-' + Sultan(),
  () => Sultan() + '-' + Sultan(),
  () => Sultan() + '-' + Sultan(),
  () => { var s = sultan(); return `${cap(s)} of ${plural(s)}`; },
]
_sultan = _sultan.concat(_moreSultans);
var sultan = conjure(_sultan);
var Sultan = cap(sultan);

var _sultanOfDoom = [
  () => `${Cursed()} ${Sultan()}`,
  () => `${Cursed()} ${Sultan()}`,
  () => `${Cursed()} ${Sultan()} of ${Doom()}`,
  () => `${Cursed()} ${Sultan()} of ${maybe('The')}${Cursed()} ${Doom()}`,
  () => `${Sultan()} of ${Doom()}`,
  () => `${Sultan()} of ${maybe('The')}${Cursed()} ${Doom()}`,
  () => `${Sultan()} of the ${cursedBogOfTheSultanOfDoom()}`,
]
var sultanOfDoom = conjure(_sultanOfDoom);

var defeat = conjure(_defeat)

var complete = conjure(_complete);
var moreChallenges = conjure(_moreChallenges);
var _moreChallengesOfDoom = [
  () => `${cap(moreChallenges())} of the ${sultanOfDoom()}`,
  () => `${Cursed()} ${cap(moreChallenges())}`,
  () => `${cap(moreChallenges())} of ${Doom()}`,
  () => `${Cursed()} ${cap(moreChallenges())} of ${Doom()}`,
]
var moreChallengesOfDoom = conjure(_moreChallengesOfDoom);

const interp = (s) => (overcome, trial, number, parent) => {
  return et(s)
    .replace(/overcome/g, overcome)
    .replace(/trial/g, trial)
    .replace(/_seventh/, seventh(number))
    .replace(/_seven/, seven(number))
    .replace(/parentQuest/, parent && parent.challenge);
}
_interjections = _interjections.map(x => interp(x))
var interjections = conjure(_interjections)

var step = conjure(['step', 'part', 'stage', 'task', 'piece', 'component']);
var steps = plural(step);
var _thereAreSevenSteps = [
  () => `There are _seven ${steps()} to the trial.`,
  () => `There are _seven ${steps()} before you can overcome the trial.`,
  () => `There are _seven ${steps()} to overcome the trial.`,
  () => `The trial has _seven ${steps()}.`,
]
// todo: figure out how to put thunks into _thereAreSevenSteps
var thereAreSevenSteps = conjure(_thereAreSevenSteps.map(interp));

var _firstYouMust = [
  `First, you must overcome the trial.`,
  `You must first overcome the trial.`,
  `First, overcome the trial.`,
  () => `The first ${step()} of the parentQuest is to overcome the trial.`,
  `As soon as you start the parentQuest, you must overcome the trial.`,
]
var firstYouMust = conjure(_firstYouMust.map(interp));

var _nextYouMust = [
  "_seventh, you must overcome the trial.",
  () => `The _seventh ${step()} of the parentQuest is to overcome the trial.`,
  () => `The _seventh ${step()} of the parentQuest is to overcome the trial.`,
  "You must, _seventhly, overcome the trial.",
  "You must overcome the trial.",
  "_seventhly, you must overcome the trial.",
  () => `Then, you must ${complete()} the _seventh ${step()} of the parentQuest: overcome the trial.`,
]
var nextYouMust = conjure(_nextYouMust.map(interp));

const final = conjure(['last', 'final', 'ultimate']);

var _finallyYouMust = [
  () => `You must then overcome the _seventh and ${final()} challenge of the parentQuest, the trial.`,
  "After that, you simply must overcome the trial, and the parentQuest will be complete!",
  () => `To ${complete()} the parentQuest, all that's left is the _seventh ${step()}: ${maybe('you must')}overcome the trial.`,
  () => `The ${final()} ${step()} of the parentQuest is to overcome the trial.`,
  () => `The _seventh and ${final()} ${step()} of the parentQuest is to overcome the trial.`,
  () => `The ${final()} and _seventh ${step()} of the parentQuest is to overcome the trial.`,
  () => `Now, ${final()}ly, ${maybe(`to finish the parentQuest,`)}you must overcome the trial.`,
  "Lastly, overcome the trial.",
]
var finallyYouMust = conjure(_finallyYouMust.map(interp));

var _trialComplete = [
  "After this, you will have finished the trial.",
  "Now, the trial will be complete.",
  "Then, the trial will be complete.",
  "Finally, the trial will be complete.",
]
var trialComplete = conjure(_trialComplete.map(interp));

var _parentTrialContinues = [
  "But the trial is not over.",
  "Now, you must continue the trial.",
  "But you must continue the trial.",
  "But the trial goes on.",
  "But you still must overcome the rest of the trial.",
]
var parentTrialContinues = conjure(_parentTrialContinues.map(interp));

fool = conjure(["fool", "idiot", "senile old bat", "senile old ghoul"]);

var _correctionSentence = [
  "No no no. The _seventh step of the parentQuest is to overcome the trial!",
  () => cap(`${mb`You `}liar! No, the _seventh step is to overcome the trial!`),
  "What! You are mistaken! The _seventh step is to overcome the trial!",
  "No, that isn't right! It's the trial!",
  "That's not part of the parentQuest at all!",
  "That doesn't sound right... Isn't the _seventh step to overcome the trial?",
  () => `No you ${fool()}, the _seventh step is to overcome the trial!`,
  () => cap(`${maybe('I think')}you're mistaken! The _seventh step is to overcome the trial!`),
];
var correctionSentence = conjure(_correctionSentence.map(interp));

certain = conjure(['certain', 'sure', 'positive', 'confident', 'really sure']);

var _ohYoureRight = [
  () => `Ah, well, if you're ${certain()}...`,
  'Ah, right, of course, of course.',
  () => `Are you ${certain()}? Very well...`,
  'Oh, really? It has been a while.',
  'Ah, yes, of course.',
  'Really? Drat!',
  () => `What? Are you ${certain()}?`,
  () => `${mb`What? `}It is?`,
];
var ohYoureRight = conjure(_ohYoureRight.map(interp));

definitely = conjure(['definitely', 'absolutely', 'most definitely', 'assuredly'])

var _noImStillRight = [
  () => `${mb`no, `}I'm ${mb`quite `}certain it${mb("'s", " is")} the trial!`,
  () => `No, stop talking, it's the trial!`,
  () => `I have the floor and I say it's the trial!`,
  () => `I am positive it's the trial!`,
  () => `${mb`no, `}it's ${definitely()} the trial${mb('.', '!')}`,
  () => `No, the _seventh step of the parentQuest is ${definitely()} the trial.`
];
var noImStillRight = cap(conjure(_noImStillRight.map(interp)));

var _noYoureStillWrong = [
  () => `${definitely()} not, it's the trial!`,
  () => `No, it's ${definitely()} the trial!`,
  () => `No!`,
  () => `You are mistaken!`,
  () => `You are wrong!`,
  () => `We mustn't mislead this poor petitioner! It's the trial!`,
  () => `No, I'm ${certain()} it's the trial!`,
  () => `It isn't! It's the trial!`,
];
var noYoureStillWrong = cap(conjure(_noYoureStillWrong.map(interp)));

var seven = x =>
  ['one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve',
  'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen'][x];

var seventh = x =>
 ['first', 'second', 'third', 'fourth',
    'fifth', 'sixth', 'seventh', 'eighth',
    'ninth', 'tenth', 'eleventh', 'twelfth',
    'thirteenth', 'fourteenth', 'fifteenth',
    'sixteenth', 'seventeenth', 'eighteenth'][x];

var looksFake = s => {
  if (s.length > MAX_CHALLENGE_LENGTH) return true;
  var ofs = s.match(/\bof\b/g) || [];
  if (ofs.length > 2) return true;
  var hyphens = s.match(/[^-]-[^-]/g) || [];
  if (hyphens.length > 2) return true;
  if (hyphens.length + ofs.length > 3) return true;
  return false;
}

const issueCorrections = oldChallengeEntry => {
  let { level, challenge, challengeIndex, parent, voice, overcome, log, lines } = oldChallengeEntry;
  const oldChallenge = challenge;
  const newVoice = chitteringVoice();
  const newChallengeDeets = selectChallenge();

  log(newVoice, cap(correctionSentence(
    newChallengeDeets.overcome,
    newChallengeDeets.challenge,
    challengeIndex,
    parent
  )));
  let winner = newVoice;

  // Let them argue, and decide on a winner
  if (rand(2) == 0) {
    log(voice, ohYoureRight);
  } else if (rand(2) > 0) {
    log(voice, noImStillRight(overcome, oldChallenge, challengeIndex, parent))
    winner = voice;
    if (rand(3) > 0) {
      log(newVoice, noYoureStillWrong('', newChallengeDeets.challenge, challengeIndex, parent));
      winner = newVoice;
      if (rand(3) > 0) {
        log(voice, noImStillRight(overcome, oldChallenge, challengeIndex, parent));
        winner = voice;
        if (rand(2) == 0) {
          log(chitteringVoice(), "It is!")
        }
      }
    }
  }

  if (winner == newVoice) {
    const newChallengeEntry = entry({ level, challengeIndex, voice: newVoice, parent, ...newChallengeDeets });
    newChallengeEntry.lines.forEach(line => lines.push(line));
    newChallengeEntry.lines = lines;
    return newChallengeEntry;
  } else {
    return false;
  }
}

var selectChallenge = (r) => {
  r = r || Math.random()
  let overcome;
  let challengeType;
  let nChallenges = 0;
  if (r > 0.85) {
    overcome = defeat();
    challengeType = sultanOfDoom;
  } else if (r > 0.7) {
    overcome = traverse();
    challengeType = cursedBogOfTheSultanOfDoom;
  } else if (r > 0.6) {
    overcome = retrieve();
    challengeType = artifactOfDoom;
  } else {
    // these are all close enough synonyms, so evaluate them on the fly instead of now
    overcome = complete;
    nChallenges = rand(6) + 3;
    challengeType = moreChallengesOfDoom;
  }
  let challenge = challengeType(nChallenges - 1);
  if (looksFake(challenge)) return selectChallenge(r);
  return {challenge, nChallenges, overcome, challengeType};
}

var entry = ({ level, challengeIndex, voice, parent, lines, challenge, nChallenges, overcome }) => {
  let r;
  r = Math.random();
  if (level > 4) {
    r += 0.4; // let's try not to get _too_ deep here
  }

  if (!(challenge && overcome && nChallenges !== undefined)) {
    var { challenge, nChallenges, overcome } = selectChallenge(r);
  }
  
  var lines = lines || [];
  var log = (...args) => {
    // console.log(...args.map(et));
    if (args.length === 1) { lines.push(...args); } else { lines.push(makeLine(...args)) };
  }

  let sentence;

  if (challengeIndex === 0) {
    sentence = firstYouMust;
  } else if (challengeIndex === parent.nChallenges - 1) {
    sentence = finallyYouMust;
  } else {
    sentence = nextYouMust;
  }

  voice = voice || chitteringVoice();

  var thisEntry = {
    overcome,
    challenge,
    challengeIndex,
    nChallenges,
    voice,
    lines,
    parent,
    log
  };

  log(voice, cap(sentence(overcome, challenge, challengeIndex, parent)));
  
  // Peanut gallery time! Maybe a correction, or maybe just chatter
  if (rand(8) == 0) {
    const replacement = issueCorrections(thisEntry);
    if (replacement) {
      return replacement;
    }
  } else {
    for (let i = rand(3); i > 0; i--) {
      log(chitteringVoice(), interjections(overcome, challenge));
    }
  }

  if (rand(20) == 0) {
    log('all in chorus', `The ${challenge}! The ${challenge}!`);
  }

  linesTotal += lines.length;
  if (linesTotal > MAX_LINES) {
    // log('over line limit');
    // log(`MAX_LINES (${MAX_LINES}) exceeded`);
    return thisEntry;
  }

  if (nChallenges > 0) {
    log(voice, thereAreSevenSteps(overcome, challenge, nChallenges));
    var children = Array(nChallenges)
      .fill(entry)
      .map((_, i) => entry({ challengeIndex: i, level: level + 1, parent: thisEntry }));
    children.forEach(child => child.lines.forEach(line => log(line)));
    log(voice, trialComplete(overcome, challenge));
    if (parent && parent.nChallenges !== challengeIndex + 1) {
      // The parent has more children! let's get back on topic.
      log(parent.voice, parentTrialContinues(parent.overcome, parent.challenge));
    } 
  };
  
  return thisEntry
}



while (true) {
  console.log("");
  console.log("");
  console.log("");
  linesTotal = 0;
  var parent = { challenge: moreChallengesOfDoom(1), voice: chitteringVoice(), nChallenges: 1 };
  var { lines } = entry({ challengeIndex: 0, level: 0, parent })
  console.log(linesTotal, lines.length);
  lines.forEach((line, i) => {
    console.log(line);
    // var t = line.length * 0.07;
    // cp.execSync(`sleep ${t}`);
  })
  cp.execSync('sleep 6');
  console.log("You thank the demons, and begin your journey.");
  cp.execSync('sleep 6');
}

// https://pastebin.com/vzjmhf7B
