_cursed = require('./words/cursed');
_shriek = require('./words/shriek');
_chittering = require('./words/chittering');
_moreChallenges = require('./words/moreChallenges');
_bog = require('./words/bog');
_defeat = require('./words/defeat');
_doom = require('./words/doom');
_traverse = require('./words/traverse');
_sultan = require('./words/sultan');
_complete = require('./words/complete');
_interjections = require('./words/interjections');

example = `Gravelley voice: But first you must complete the Infernal Rites three
Piping voice: Oh yes, the Infernal Rites, the Infernal Rites!
Gravelley voice: The first infernal rite is to pass the Iron Gates
Snarling voice: He'll never pass the Iron Gates!
Chittering voice: The Iron Gates, oh, how I love the Iron Gates!
All, in chorus: The Iron Gates! The Iron Gates!
Liquid voice: The second Infernal Rite is to defeat the Stone Guardians seven
Lugubrious voice: The first Stone Guardian is...`

rand = n => Math.floor(n * Math.random());

cap = s => s[0].toUpperCase() + s.slice(1);
evalThunk = (x, ...args) => ((x instanceof Function) ? x(...args) : x);
randItem = x => x[rand(x.length)];
conjure = (_thing) => {
  const l = Math.floor(_thing.length / 2);
  console.log(_thing);
  const recents = (new Array(l));
  const randSkipRecents = a => {
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

chittering = conjure(_chittering);
shriek = conjure(_shriek);

_chitteringVoice = [
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())} ${shriek()}:`,
  () => `${cap(chittering())}, ${chittering()} ${shriek()}:`,
]
chitteringVoice = conjure(_chitteringVoice);

doom = conjure(_doom);
cursed = conjure(_cursed);
bog = conjure(_bog);
_cursedBogOfTheSultanOfDoom = [
  () => `${cap(bog())}`,
  () => `${cap(bog())} of the ${cap(cursed())} ${cap(sultan())}`,
  () => `${cap(cursed())} ${cap(bog())}`,
  () => `${cap(cursed())} ${cap(bog())}`,
  () => `${cap(cursed())} ${cap(bog())}`,
  () => `${cap(bog())} of the ${sultanOfDoom()}`,
]
cursedBogOfTheSultanOfDoom = conjure(_cursedBogOfTheSultanOfDoom);
traverse = conjure(_traverse);


_moreSultans = [
  () => cap(sultan()) + '-' + cap(sultan()),
  () => cap(sultan()) + '-' + cap(sultan()),
  () => cap(sultan()) + '-' + cap(sultan()),
]
_sultan = _sultan.concat(_moreSultans);
sultan = conjure(_sultan);

_sultanOfDoom = [
  () => `${cap(sultan())} of ${cap(doom())}`,
  () => `${cap(sultan())} of ${cap(cursed())} ${cap(doom())}`,
  () => `${cap(sultan())} of The ${cap(cursed())} ${cap(doom())}`,
  () => `${cap(cursed())} ${cap(sultan())} of ${cap(doom())}`,
  () => `${cap(cursed())} ${cap(sultan())} of ${cap(cursed())} ${cap(doom())}`,
  () => `${cap(sultan())} of the ${cursedBogOfTheSultanOfDoom()}`,
  () => `${sultanOfDoom()}, the ${sultanOfDoom()}`,
  () => `The ${cap(cursed())} ${cap(sultan())}`,
]
sultanOfDoom = conjure(_sultanOfDoom);

defeat = conjure(_defeat)

complete = conjure(_complete);
moreChallenges = conjure(_moreChallenges);
_moreChallengesOfDoom = [
  () => `${cap(moreChallenges())} of the ${sultanOfDoom()}`,
  () => `${cap(cursed())} ${cap(moreChallenges())}`,
  () => `${cap(moreChallenges())} of ${cap(doom())}`,
  () => `${cap(cursed())} ${cap(moreChallenges())} of ${cap(doom())}`,
]
moreChallengesOfDoom = conjure(_moreChallengesOfDoom);

interp = (s) => (overcome, trial, seventh, seven) => s
    .replace(/overcome/g, overcome)
    .replace(/trial/g, trial)
    .replace(/seventh/, seventh) // if these are /seventh/g, then it breaks for seven, lol
    .replace(/seven/, seven);

_interjections = _interjections.map(x => interp(x))
interjections = conjure(_interjections)

steps = conjure(['steps', 'parts', 'stages', 'levels', 'tasks']);
_thereAreSevenSteps = [
  `There are seven ${steps()} to the trial.`,
  `There are seven ${steps()} before you can overcome the trial.`,
  `There are seven ${steps()} to overcome the trial.`,
  `The trial has seven ${steps()}.`,
]
thereAreSevenSteps = conjure(_thereAreSevenSteps.map(interp));

_firstYouMust = [
  "First, you must overcome the trial.",
  "You must first overcome the trial.",
  "First, overcome the trial.",
  "Before anything else, you must overcome the trial.",
  "As soon as you start, you _must_ overcome the trial.",
]
firstYouMust = conjure(_firstYouMust.map(interp));

_nextYouMust = [
  "seventh, you must overcome the trial.",
  "You must, seventhly, overcome the trial.",
  "After that, you must overcome the trial.",
  "seventhly, you must overcome the trial.",
  "Then, you must overcome the seventh: the trial.",
]
nextYouMust = conjure(_nextYouMust.map(interp));

_finallyYouMust = [
  "Finally, you must overcome the trial.",
  "You must then overcome the seventh and final challenge, the trial.",
  "After that, you simply must overcome the trial.",
  "Now, finally, overcome the trial.",
  "Now, finally, you must overcome the trial.",
  "Lastly, overcome the trial.",
]
finallyYouMust = conjure(_finallyYouMust.map(interp));

_trialComplete = [
  "After this, you have finished the trial.",
  "Then, the trial will be complete.",
  "Finally, the trial will be complete.",
]
trialComplete = conjure(_trialComplete.map(interp));

_parentTrialContinues = [
  "But the trial is not over.",
  "Now, you must continue the trial.",
  "But you must continue the trial.",
  "But the trial goes on.",
  "But you still must overcome the rest of the trial.",
]
parentTrialContinues = conjure(_parentTrialContinues.map(interp));

seven = x =>
  ['one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve',
  'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen'][x];

seventh = x =>
 ['first', 'second', 'third', 'fourth',
    'fifth', 'sixth', 'seventh', 'eighth',
    'ninth', 'tenth', 'eleventh', 'twelfth',
    'thirteenth', 'fourteenth', 'fifteenth',
    'sixteenth', 'seventeenth', 'eighteenth'][x];

entry = ({level, challengeIndex, voice, parent}) => {
  let r;
  if (level > 10) {
    r = 1;
  } else {
    r = Math.random();
  }
  let overcome;
  let challenge;
  let challengeType;
  let nChallenges = 0;
  if (r > 0.8) {
    overcome = defeat();
    challenge = sultanOfDoom();
    challengeType = 'sultan';
  } else if (r > 0.6){
    overcome = traverse();
    challenge = bog();
    challengeType = 'bog';
  } else {
    overcome = complete();
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

  console.log(voice, cap(sentence(overcome, challenge, seventh(challengeIndex))));
  for (let i = rand(3); i > 0; i--) {
    console.log(chitteringVoice(), interjections(overcome, challenge));
  }
  if (rand(20) == 0) {
    console.log(`All in chorus: ${challenge}! ${challenge}!`)
  }

  if (challengeType == 'moreChallenges') {
    console.log(voice, thereAreSevenSteps(overcome, challenge, '', seven(nChallenges)));
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

console.log(entry({challengeIndex: 0, level: 0}))