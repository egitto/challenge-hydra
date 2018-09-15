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
var randItem = x => x[rand(x.length)];
var conjure = (_thing) => {
  var l = Math.floor(_thing.length / 2);
  console.log(_thing);
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
var _weapon = ['sword', 'shield', 'glaive', 'axe', 'dagger'];
var _artifact = _weapon.concat(['trophy', 'philtre', 'device', 'phylactery', 'cauldron', 'artifact']);
var artifact = conjure(_artifact);
var shard = conjure(['shard', 'fragment', 'piece', 'splinter']);

var _artifactOfDoom = [
  () => `${seven(rand(5) + 2)} ${maybe(cursed)}${plural(bodyPart())} of ${doom()}`,
  () => `${maybe(cursed)}${bodyPart()} of ${doom()}`,
  () => `${maybe(cursed)}${artifact()} of ${doom()}`,
  () => `${maybe(cursed)}${bodyPart()} of the ${sultanOfDoom()}`,
  () => `${maybe(cursed)}${artifact()} of the ${sultanOfDoom()}`,
  () => `${seven(rand(12) + 2)} ${plural(artifact())} of the ${sultanOfDoom()}`,
  () => `${seventh(rand(5) + 2)} ${sultanOfDoom()}`, // yes, a sultan is an artifact, sure
  () => `${seven(rand(12) + 2)} ${plural(shard())} of the ${sultanOfDoom()}`,
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
  () => `${Sultan()} of ${maybe('The')}${Doom()}`,
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

var step = conjure(['step', 'part', 'stage', 'level', 'task', 'piece', 'component']);
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
  "After that, you must overcome the trial.",
  "_seventhly, you must overcome the trial.",
  () => `Then, you must ${complete()} the _seventh ${step()} of the parentQuest: overcome the trial.`,
]
var nextYouMust = conjure(_nextYouMust.map(interp));

var _finallyYouMust = [
  "Finally, you must overcome the trial.",
  "You must then overcome the _seventh and final challenge, the trial.",
  "After that, you simply must overcome the trial.",
  "Now, finally, overcome the trial.",
  "Now, finally, you must overcome the trial.",
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
  var hyphens = s.match(/[^-]-[^-]/) || [];
  if (hyphens.length > 2) return true;
  if (hyphens.length + ofs.length > 3) return true;
  return false;
}

var entry = ({level, challengeIndex, voice, parent}) => {
  let r;
  r = Math.random();
  if (level > 3) {
    r += 0.6; // let's try not to get _too_ deep here
  }
  let overcome;
  let challenge;
  let challengeType;
  let nChallenges = 0;
  var lines = [];
  if (r > 0.85) {
    overcome = defeat();
    challenge = sultanOfDoom();
    challengeType = 'sultan';
  } else if (r > 0.7){
    overcome = traverse();
    challenge = bog();
    challengeType = 'bog';
  } else if (r > 0.6) {
    overcome = retrieve();
    challenge = artifactOfDoom();
    challengeType = 'artifact';
  } else {
    // these are all close enough synonyms, so evaluate them on the fly instead of now
    overcome = complete;
    nChallenges = rand(6) + 3;
    challenge = moreChallengesOfDoom(nChallenges);
    challengeType = 'moreChallenges';
  }
  let sentence;

  if (challengeIndex === 0) {
    sentence = firstYouMust;
  } else if (challengeIndex === parent.nChallenges - 1) {
    sentence = finallyYouMust
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
    lines
  }

  lines.push(makeLine(voice, cap(sentence(overcome, challenge, challengeIndex, parent))));
  
  // if this line is too long, make a new one instead.
  if (lines[0].length > MAX_LINE_LENGTH || looksFake(challenge)) {
    if (looksFake(challenge)) console.log('Discarded:', challenge);
    return entry({ level, challengeIndex, voice, parent });
  }

  for (let i = rand(3); i > 0; i--) {
    lines.push(makeLine(chitteringVoice(), interjections(overcome, challenge)));
  }
  if (rand(20) == 0) {
    lines.push(makeLine('all in chorus', `The ${challenge}! The ${challenge}!`));
  }

  linesTotal += lines.length;
  if (linesTotal > MAX_LINES) {
    lines.push(`MAX_LINES (${MAX_LINES}) exceeded`);
    return thisEntry;
  }

  if (challengeType == 'moreChallenges') {
    lines.push(makeLine(voice, thereAreSevenSteps(overcome, challenge, nChallenges)));
    var children = Array(nChallenges)
      .fill(entry)
      .map((_, i) => entry({ challengeIndex: i, level: level + 1, parent: thisEntry }));
    children.forEach(child => child.lines.forEach(line => lines.push(line)));
    lines.push(makeLine(voice, trialComplete(overcome, challenge)));
    if (parent && parent.nChallenges !== challengeIndex + 1) {
      // The parent has more children! let's get back on topic.
      lines.push(makeLine(parent.voice, parentTrialContinues(parent.overcome, parent.challenge)));
    } 
  };
  
  return thisEntry
}

var parent = { challenge: moreChallengesOfDoom(1), voice: chitteringVoice(), nChallenges: 1 };

entry({challengeIndex: 0, level: 0, parent}).lines.forEach(x => console.log(x));
