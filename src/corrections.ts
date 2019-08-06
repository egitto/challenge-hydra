import { conjure, cap, maybe, mb, interp } from "./genericHelpers";

var fool = conjure(["fool", "idiot", "senile old bat", "senile old ghoul"]);

var _correctionSentence = [
  "No no no. The _seventh step of the parentQuest is to overcome the trial!",
  () => cap(`${mb('You ')}liar! No, the _seventh step is to overcome the trial!`),
  "What! You are mistaken! The _seventh step is to overcome the trial!",
  "No, that isn't right! It's the trial!",
  "That's not part of the parentQuest at all!",
  "That doesn't sound right... Isn't the _seventh step to overcome the trial?",
  () => `No you ${fool()}, the _seventh step is to overcome the trial!`,
  () => cap(`${maybe('I think')}you're mistaken! The _seventh step is to overcome the trial!`),
];
export var correctionSentence = conjure(_correctionSentence.map(interp));

export var certain = conjure(['certain', 'sure', 'positive', 'confident', 'really sure']);

var _ohYoureRight = [
  () => `Ah, well, if you're ${certain()}...`,
  'Ah, right, of course, of course.',
  () => `Are you ${certain()}? Very well...`,
  'Oh, really? It has been a while.',
  'Ah, yes, of course.',
  'Really? Drat!',
  () => `What? Are you ${certain()}?`,
  () => `${mb('What? ')}It is?`,
];
export var ohYoureRight = conjure(_ohYoureRight.map(interp));

export var definitely = conjure(['definitely', 'absolutely', 'most definitely', 'assuredly'])

var _noImStillRight = [
  () => `${mb('no, ')}I'm ${mb('quite ')}certain it${mb("'s", " is")} the trial!`,
  () => `No, stop talking, it's the trial!`,
  () => `I have the floor and I say it's the trial!`,
  () => `I am positive it's the trial!`,
  () => `${mb('no, ')}it's ${definitely()} the trial${mb('.', '!')}`,
  () => `No, the _seventh step of the parentQuest is ${definitely()} the trial.`
];
export var noImStillRight = cap(conjure(_noImStillRight.map(interp)));

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
export var noYoureStillWrong = cap(conjure(_noYoureStillWrong.map(interp)));