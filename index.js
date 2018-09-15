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

var evalThunk = (x, ...args) => ((x instanceof Function) ? evalThunk(x(...args)) : x);
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
  return (...args) => evalThunk(randSkipRecents(_thing), ...args);
}

// the evalThunk is so it doesn't deplete uniqueness
var maybe = (s, p = 0.5) => Math.random() < p ? `${evalThunk(s)} ` : '';

var chittering = conjure(_chittering);
var shriek = conjure(_shriek);

var _chitteringVoice = [
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())}, ${chittering()} ${shriek()}:`,
]
var chitteringVoice = conjure(_chitteringVoice);

var doom = conjure(_doom);
var cursed = conjure(_cursed);
var bog = conjure(_bog);
var _cursedBogOfTheSultanOfDoom = [
  () => `${cap(bog())}`,
  () => `${cap(bog())} of the ${cap(cursed())} ${Sultan()}`,
  () => `${cap(cursed())} ${cap(bog())}`,
  () => `${cap(cursed())} ${cap(bog())}`,
  () => `${cap(cursed())} ${cap(bog())}`,
  () => `${cap(bog())} of the ${sultanOfDoom()}`,
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
  () => `${Sultan()} of the ${cursedBogOfTheSultanOfDoom()}`,
  () => `${Sultan()} of ${cap(doom())}`,
  () => `${Sultan()} of ${cap(cursed())} ${cap(doom())}`,
  () => `${Sultan()} of The ${cap(cursed())} ${cap(doom())}`,
  () => `${cap(cursed())} ${Sultan()} of ${cap(doom())}`,
  () => `${cap(cursed())} ${Sultan()} of ${cap(cursed())} ${cap(doom())}`,
  () => `${Sultan()} of the ${cursedBogOfTheSultanOfDoom()}`,
  () => `${sultanOfDoom()}, the ${sultanOfDoom()}`,
  () => `${cap(cursed())} ${Sultan()}`,
]
var sultanOfDoom = conjure(_sultanOfDoom);

var defeat = conjure(_defeat)

var complete = conjure(_complete);
var moreChallenges = conjure(_moreChallenges);
var _moreChallengesOfDoom = [
  () => `${cap(moreChallenges())} of the ${sultanOfDoom()}`,
  () => `${cap(cursed())} ${cap(moreChallenges())}`,
  () => `${cap(moreChallenges())} of ${cap(doom())}`,
  () => `${cap(cursed())} ${cap(moreChallenges())} of ${cap(doom())}`,
]
var moreChallengesOfDoom = conjure(_moreChallengesOfDoom);

const interp = (s) => (overcome, trial, number, parent) => {
  return evalThunk(s)
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
_thereAreSevenSteps = [
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
  "After this, you have finished the trial.",
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
  }

  console.log(voice, cap(sentence(overcome, challenge, challengeIndex, parent)));
  for (let i = rand(3); i > 0; i--) {
    console.log(chitteringVoice(), interjections(overcome, challenge));
  }
  if (rand(20) == 0) {
    console.log(`All in chorus: The ${challenge}! The ${challenge}!`)
  }

  if (challengeType == 'moreChallenges') {
    console.log(voice, thereAreSevenSteps(overcome, challenge, nChallenges));
    Array(nChallenges)
      .fill(entry)
      .map((_, i) => entry({ challengeIndex: i, level: level + 1, voice: chitteringVoice(), parent: thisEntry }));
    console.log(voice, trialComplete(overcome, challenge));
    if (parent && parent.nChallenges !== challengeIndex + 1) {
      // The parent has more children! let's get back on topic.
      console.log(parent.voice, parentTrialContinues(parent.overcome, parent.challenge));
    } 
  };
  
  return thisEntry
}

console.log(entry({challengeIndex: 0, level: 0, parent: {challenge: "trial of the doors"}}))