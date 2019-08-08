import _cursed from './words/cursed';
import _shriek from './words/shriek';
import _chittering from './words/chittering';
import _ordeal from './words/ordeal';
import _bog from './words/bog';
import _defeat from './words/defeat';
import _doom from './words/doom';
import _traverse from './words/traverse';
import __sultan from './words/sultan';
import _complete from './words/complete';
import __interjections from './words/interjections';
import { correctionSentence, ohYoureRight, noImStillRight, noYoureStillWrong } from './corrections';
import { cap, et, conjure, S, plural, rand, F, maybe, interp, seven, seventh, t } from './genericHelpers';

const DELAY_SECONDS_PER_CHARACTER = 0.07;
const DELAY_SECONDS_BETWEEN_SESSIONS = 6;

const MAX_LINE_LENGTH = 100;
const MAX_CHALLENGE_LENGTH = 40;
const MAX_LINES = 2000000;
const MAX_DEPTH = 20;

const CORRECTION_PROBABILITY = 0.125;
const PEANUT_GALLERY_PROBABILITY = 0.33;

var linesTotal = 0;

var makeLine = (voice: S = '', text: S = '', verb = 'says') => {
  voice = cap(voice);
  return et(t`${voice}: ${cap(text)}`);
}

var chittering = conjure(_chittering);

var shriek = conjure(_shriek);

var _chitteringVoice: S[] = [
  () => t`${chittering} ${shriek}`,
  () => t`${chittering} ${shriek}`,
  () => t`${chittering} ${shriek}`,
  () => t`${chittering} ${shriek}`,
  () => t`${chittering}, ${chittering} ${shriek}`,
]
var chitteringVoice = conjure(_chitteringVoice);

var doom = conjure(_doom);
var Doom = cap(doom);
var cursed = conjure(_cursed);
var Cursed = cap(cursed);
var bog = conjure(_bog);
var Bog = cap(bog);
var _cursedBogOfTheSultanOfDoom: S[]= [
  () => t`${Bog} of the ${Cursed} ${Sultan}`,
  () => t`${Bog} of ${Doom}`,
  () => t`${Cursed} ${Bog} of ${Doom}`,
  () => t`${Cursed} ${Bog}`,
  () => t`${Cursed} ${Bog}`,
  () => t`${Bog} of the ${sultanOfDoom}`,
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

var _artifactOfDoom: S[] = [
  () => t`${seven(rand(5) + 2)} ${maybe(Cursed)} ${plural(BodyPart())} of ${Doom}`,
  () => t`${maybe(Cursed)} ${BodyPart()} of ${Doom}`,
  () => t`${maybe(Cursed)} ${Artifact()} of ${Doom}`,
  () => t`${maybe(Cursed)} ${BodyPart()} of the ${sultanOfDoom}`,
  () => t`${maybe(Cursed)} ${Artifact()} of the ${sultanOfDoom}`,
  () => t`${seven(rand(12) + 2)} ${plural(Artifact())} of the ${sultanOfDoom}`,
  () => t`${seventh(rand(5) + 2)} ${sultanOfDoom}`, // yes, a sultan is an artifact, sure
  () => t`${seven(rand(12) + 2)} ${plural(shard())} of the ${maybe('soul of the')} ${sultanOfDoom}`,
  () => t`${seven(rand(12) + 2)} ${cursed} ${plural(shard())} of the ${sultanOfDoom}`,
]
var artifactOfDoom = conjure(_artifactOfDoom);

var retrieve = conjure(['retrieve', 'fetch', 'destroy', 'consume', 'locate', 'learn from', 'find'])

var _recursiveSultans = [
  () => t`${Sultan}-${Sultan}`,
  () => t`${Sultan}-${Sultan}`,
  () => t`${Sultan}-${Sultan}`,
  () => { var s = sultan; return `${cap(s)} of ${plural(s)}`; },
]
var _sultan: S[] = __sultan;
_sultan = _sultan.concat(_recursiveSultans);
var sultan = conjure(_sultan);
var Sultan = cap(sultan);

var _sultanOfDoom: S[] = [
  () => t`${Cursed} ${Sultan}`,
  () => t`${Cursed} ${Sultan}`,
  () => t`${Cursed} ${Sultan} of ${Doom}`,
  () => t`${Cursed} ${Sultan} of ${maybe('The')} ${Cursed} ${Doom}`,
  () => t`${Sultan} of ${Doom}`,
  () => t`${Sultan} of ${maybe('The')} ${Cursed} ${Doom}`,
  () => t`${Sultan} of the ${cursedBogOfTheSultanOfDoom}`,
]
var sultanOfDoom = conjure(_sultanOfDoom);

var defeat = conjure(_defeat)

var complete = conjure(_complete);
var ordeal = conjure(_ordeal);
var Ordeal = cap(ordeal);
var _ordealOfDoom: S[] = [
  () => t`${Ordeal} of the ${sultanOfDoom}`,
  () => t`${Cursed} ${Ordeal}`,
  () => t`${Ordeal} of ${Doom}`,
  () => t`${Cursed} ${Ordeal} of ${Doom}`,
]
var ordealOfDoom = conjure(_ordealOfDoom);

var _interjections = __interjections.map(interp)
var interjections = conjure(_interjections)

var step = conjure(['step', 'part', 'stage', 'task', 'piece', 'component']);
var steps = plural(step);
var _thereAreSevenSteps: S[] = [
  () => t`There are _seven ${steps} to the trial.`,
  () => t`There are _seven ${steps} before you can overcome the trial.`,
  () => t`There are _seven ${steps} to overcome the trial.`,
  () => t`The trial has _seven ${steps}.`,
]
// todo: figure out how to put thunks into _thereAreSevenSteps
var thereAreSevenSteps = conjure(_thereAreSevenSteps.map(interp));

var _firstYouMust = [
  t`First, you must overcome the trial.`,
  t`You must first overcome the trial.`,
  t`First, overcome the trial.`,
  () => t`The first ${step()} of the parentQuest is to overcome the trial.`,
  t`As soon as you start the parentQuest, you must overcome the trial.`,
]
var firstYouMust = conjure(_firstYouMust.map(interp));

var _nextYouMust = [
  t`_seventh, you must overcome the trial.`,
  () => t`The _seventh ${step()} of the parentQuest is to overcome the trial.`,
  () => t`The _seventh ${step()} of the parentQuest is to overcome the trial.`,
  t`You must, _seventhly, overcome the trial.`,
  t`You must overcome the trial.`,
  t`_seventhly, you must overcome the trial.`,
  () => t`Then, you must ${complete()} the _seventh ${step()} of the parentQuest: overcome the trial.`,
]
var nextYouMust = conjure(_nextYouMust.map(interp));

const final = conjure(['last', 'final', 'ultimate']);

var _finallyYouMust = [
  () => t`You must then overcome the _seventh and ${final()} challenge of the parentQuest, the trial.`,
  t`After that, you simply must overcome the trial, and the parentQuest will be complete!`,
  () => t`To ${complete()} the parentQuest, all that's left is the _seventh ${step()}: ${maybe('you must')} overcome the trial.`,
  () => t`The ${final()} ${step()} of the parentQuest is to overcome the trial.`,
  () => t`The _seventh and ${final()} ${step()} of the parentQuest is to overcome the trial.`,
  () => t`The ${final()} and _seventh ${step()} of the parentQuest is to overcome the trial.`,
  () => t`Now, ${final()}ly, ${maybe(`to finish the parentQuest,`)} you must overcome the trial.`,
  t`Lastly, overcome the trial.`,
]
var finallyYouMust = conjure(_finallyYouMust.map(interp));

var _trialComplete = [
  t`After this, you will have finished the trial.`,
  t`Now, the trial will be complete.`,
  t`Then, the trial will be complete.`,
  t`Finally, the trial will be complete.`,
]
var trialComplete = conjure(_trialComplete.map(interp));

var _parentTrialContinues = [
  t`But the trial is not over.`,
  t`Now, you must continue the trial.`,
  t`But you must continue the trial.`,
  t`But the trial goes on.`,
  t`But you still must overcome the rest of the trial.`,
]
var parentTrialContinues = conjure(_parentTrialContinues.map(interp));

var looksFake = (s: string) => {
  if (s.length > MAX_CHALLENGE_LENGTH) return true;
  var ofs = s.match(/\bof\b/g) || [];
  if (ofs.length > 2) return true;
  var hyphens = s.match(/[^-]-[^-]/g) || [];
  if (hyphens.length > 2) return true;
  if (hyphens.length + ofs.length > 3) return true;
  return false;
}

// todo: factor this out
const issueCorrections = (oldChallengeEntry: Entry) => {
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
  let winner: S = newVoice;

  if (!voice) {
    console.error(oldChallengeEntry);
    throw new Error('voice not found');
  }

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
    const { challengeType, ...entryArgs } = newChallengeDeets;
    const newChallengeEntry = entry({ level, challengeIndex, voice: newVoice, parent, ...entryArgs });
    newChallengeEntry.lines.forEach(line => lines.push(line)); // don't like this
    newChallengeEntry.lines = lines;
    return newChallengeEntry;
  } else {
    return null;
  }
}

interface SelectedChallenge {
  challenge: string,
  nChallenges: number,
  overcome: S,
  challengeType: F<string>
}
var selectChallenge = (r?: number): SelectedChallenge => {
  r = r || Math.random()
  let overcome: S;
  let challengeType: F<string>;
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
    challengeType = ordealOfDoom;
  }
  let challenge = challengeType();
  if (looksFake(challenge)) return selectChallenge(r);
  return { challenge, nChallenges, overcome, challengeType };
}

export interface Entry {
  overcome: S,
  challenge?: string,
  challengeIndex: number,
  nChallenges?: number,
  voice?: S,
  lines: string[],
  parent?: Entry | EntryArgs,
  level: number,
  log: (...args: any[]) => void, // mutates lines array
}

interface EntryArgs {
  challenge?: string,
  nChallenges?: number,
  voice?: S,

  challengeIndex?: number,
  level?: number,
  parent?: Entry | EntryArgs,

  lines?: string[],
  overcome?: S,
}

var entry = ({ level, challengeIndex = 0, voice, parent, lines = [], challenge = '', nChallenges, overcome }: EntryArgs): Entry => {
  let r;
  r = Math.random();
  if (level > 4) {
    r += 0.4; // let's try not to get _too_ deep here
  }

  if (!(challenge && overcome && nChallenges !== undefined)) {
    const selectedChallenge = selectChallenge(r);
    challenge = selectedChallenge.challenge;
    nChallenges = selectedChallenge.nChallenges;
    overcome = selectedChallenge.overcome;
  }

  if (typeof challenge === 'function') {
    throw Error('nope');
  }
  
  // todo: ugh refactor this whole logging system. separate tree from log better?
  var log = (...args: any[]) => {
    // console.log(...args.map(et));
    if (args.length === 1) { lines.push(...args); } else { lines.push(makeLine(...args)) };
  }

  let sentence;

  if (challengeIndex === 0) {
    sentence = firstYouMust;
  } else if (parent && challengeIndex === (parent.nChallenges || 0) - 1) {
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
    level,
    log
  };

  log(voice, cap(sentence(overcome, challenge, challengeIndex, parent)));
  
  if (Math.random() < CORRECTION_PROBABILITY) {
    const replacement = issueCorrections(thisEntry);
    if (replacement) {
      return replacement;
    }
  }

  // Chittering voice: Ah, yes, the scalene triangle
  while (Math.random() < PEANUT_GALLERY_PROBABILITY) {
    log(chitteringVoice(), interjections(overcome, challenge));
  }

  if (rand(20) == 0) {
    log('all in chorus', t`The ${challenge}! The ${challenge}!`);
  }

  linesTotal += lines.length;
  if (linesTotal > MAX_LINES || level > MAX_DEPTH) {
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

const sleep = (n: number) => new Promise(resolve => setTimeout(resolve, 1000 * n));

const run = async () => {
  while (true) {
    console.log("\n\n");
    linesTotal = 0;
    var parent: EntryArgs = { ...selectChallenge(-1), voice: chitteringVoice(), nChallenges: 1 };
    var { lines } = entry({ challengeIndex: 0, level: 0, parent })
    console.log(linesTotal, lines.length);
    for (const line of lines) {
      console.log(line);
      // await sleep(line.length * DELAY_SECONDS_PER_CHARACTER);
    }
    await sleep(1);
    console.log("You thank the demons, and begin your journey.");
    // await sleep(DELAY_SECONDS_BETWEEN_SESSIONS);
  }
}

run()

// https://pastebin.com/vzjmhf7B
