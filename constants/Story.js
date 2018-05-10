import React from 'react';

import Assets from '../Assets';

export default [
  {
    image: Assets.images.backgrounds['beach.png'],
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
    image: Assets.images.backgrounds['dark.png'],
    transition: 1000,
    story: [
      {
        dialog: 'Some time later...',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['xamaronia.png'],
    transition: 1000,
    story: [
      {
        animate: true,
        image: Assets.images.characters['brent.png'],
        name: 'Brent',
        dialog: 'Ahh!! How long was I out?? And what is that piercing noise!?',
      },
      {
        image: Assets.images.characters['xaml.png'],
        name: 'XAML',
        dialog:
          'We are the Xamaronions ⌿BEEP⍀ we have taken over the native environment ⌿ZAP⍀',
      },
      {
        image: Assets.images.characters['nik.png'],
        name: 'Nikki',
        dialog: '😖 Bruh wuts wrong with their language?',
      },
      {
        image: Assets.images.characters['vscodet.png'],
        name: 'VS Codet',
        dialog:
          'We have been in development for eternity ⌿BUZ⍀ can’t you SEE, SHARP noises are beautiful ⌿CLAK⍀',
      },
      {
        image: Assets.images.characters['vscodet.png'],
        name: 'Brent',
        dialog:
          'AGHGH!1! I can feel the ancient syntax of the Xama-morons trapping my soul',
      },
      {
        image: Assets.images.characters['nik.png'],
        name: 'Nikki',
        dialog: 'Yo stahp, litrally dying bro...',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['charlie_shadow.png'], // dark corner
    story: [
      {
        name: 'Shadowy Figure',
        dialog:
          'I know how to stop the evil darkness from consuming your spirits!',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['xamaronia.png'],
    story: [
      {
        image: Assets.images.characters['nik.png'],
        name: 'Nikki',
        dialog: '😮 major kekz, wut?',
      },
      {
        image: Assets.images.characters['brent.png'],
        name: 'Brent',
        dialog: 'Can you stop the forces of evil from destroying us!',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['charlie_full.png'], // full screen charlie
    story: [
      {
        name: 'Charlie!!',
        dialog: 'I sure can!!',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['xamaronia.png'],
    story: [
      {
        image: Assets.images.characters['nik.png'],
        name: 'Nikki',
        dialog: '😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['sunset.png'], // sunset background
    story: [
      {
        image: Assets.images.characters['charlie.png'],
        name: 'Charlie',
        dialog: 'We must collect all the exponium we can find!',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['xamaronia.png'], // xamaromia
    story: [
      {
        image: Assets.images.characters['brent.png'],
        name: 'Brent',
        dialog: 'Exponium? What is that',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['sunset.png'], // sunset background
    story: [
      {
        image: Assets.images.characters['charlie.png'],
        name: 'Charlie',
        dialog:
          'Exponium, or EXPO is a magical substance that translates Objectanium C, into a magnificent harmony',
      },
      {
        image: Assets.images.characters['charlie.png'],
        name: 'Charlie',
        dialog:
          'Then we can stop the evil mechs from destroying the native world!!!',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['xamaronia.png'], // xamaromia
    story: [
      {
        image: Assets.images.characters['nik.png'],
        name: 'Nikki',
        // dialog: "Kekz what about that joking annoyance of victims and agony"
        dialog: '🤔 Kekz what about ta trash android one?!1!',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['sunset.png'], // full screen charlie
    story: [
      {
        image: Assets.images.characters['charlie.png'], // full screen charlie
        name: 'Charlie',
        dialog: 'Yes, even JAVA',
      },
    ],
  },
  {
    image: Assets.images.backgrounds['xamaronia.png'], // xamaromia
    story: [
      {
        image: Assets.images.characters['brent.png'],
        name: 'Brent',
        dialog: 'HUUHWHAAAAA..!! Lets go get some EXPO!',
      },
    ],
  },
];
