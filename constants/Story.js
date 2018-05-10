import React from 'react';
import Assets from '../Assets';
import Characters from './Characters';

const { backgrounds } = Assets.images;

export default [
  {
    image: backgrounds['beach.png'],
    transition: 1000,
    story: [
      {
        animate: true,
        dialog: 'The sun was setting on a beutiful Palo Alto night..',
      },
      {
        dialog: 'When out of no where there was a big explosion!',
      },
    ],
  },
  {
    image: backgrounds['dark.png'],
    transition: 1000,
    story: [
      {
        dialog: 'Some time later...',
      },
    ],
  },
  {
    image: backgrounds['xamaronia.png'],
    transition: 1000,
    story: [
      {
        ...Characters.brent,
        animate: true,
        dialog: 'Ahh!! How long was I out?? And what is that piercing noise!?',
      },
      {
        ...Characters.xaml,
        dialog:
          'We are the Xamaronions ⌿BEEP⍀ we have taken over the native environment ⌿ZAP⍀',
      },
      {
        ...Characters.nikki,
        dialog: '😖 Bruh wuts wrong with their language?',
      },
      {
        ...Characters.vscodet,
        dialog:
          'We have been in development for eternity ⌿BUZ⍀ can’t you SEE, SHARP noises are beautiful ⌿CLAK⍀',
      },
      {
        ...Characters.brent,
        dialog:
          'AGHGH!1! I can feel the ancient syntax of the Xama-morons trapping my soul',
      },
      {
        ...Characters.nikki,
        dialog: 'Yo stahp, litrally dying bro...',
      },
    ],
  },
  {
    image: backgrounds['charlie_shadow.png'], // dark corner
    story: [
      {
        name: 'Shadowy Figure',
        dialog:
          'I know how to stop the evil darkness from consuming your spirits!',
      },
    ],
  },
  {
    image: backgrounds['xamaronia.png'],
    story: [
      {
        ...Characters.nikki,
        dialog: '😮 major kekz, wut?',
      },
      {
        ...Characters.brent,
        dialog: 'Can you stop the forces of evil from destroying us!',
      },
    ],
  },
  {
    image: backgrounds['charlie_full.png'], // full screen charlie
    story: [
      {
        name: 'Charlie!!',
        dialog: 'I sure can!!',
      },
    ],
  },
  {
    image: backgrounds['xamaronia.png'],
    story: [
      {
        ...Characters.nikki,
        dialog: '😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮',
      },
    ],
  },
  {
    image: backgrounds['sunset.png'], // sunset background
    story: [
      {
        ...Characters.charlie,
        dialog: 'We must collect all the exponium we can find!',
      },
    ],
  },
  {
    image: backgrounds['xamaronia.png'], // xamaromia
    story: [
      {
        ...Characters.brent,
        dialog: 'Exponium? What is that',
      },
    ],
  },
  {
    image: backgrounds['sunset.png'], // sunset background
    story: [
      {
        ...Characters.charlie,
        dialog:
          'Exponium, or EXPO is a magical substance that translates Objectanium C, into a magnificent harmony',
      },
      {
        ...Characters.charlie,
        dialog:
          'Then we can stop the evil mechs from destroying the native world!!!',
      },
    ],
  },
  {
    image: backgrounds['xamaronia.png'], // xamaromia
    story: [
      {
        ...Characters.nikki,
        dialog: '🤔 Kekz what about ta trash android one?!1!',
      },
    ],
  },
  {
    image: backgrounds['sunset.png'], // full screen charlie
    story: [
      {
        ...Characters.charlie,
        dialog: 'Yes, even JAVA',
      },
    ],
  },
  {
    image: backgrounds['xamaronia.png'], // xamaromia
    story: [
      {
        ...Characters.brent,
        dialog: 'HUUHWHAAAAA..!! Lets go get some EXPO!',
      },
    ],
  },
];
