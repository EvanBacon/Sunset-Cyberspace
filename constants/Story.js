import React from 'react';

import Images from './Images';

export default [
  {
    image: Images.backgrounds.beach,
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
    image: Images.backgrounds.dark,
    transition: 1000,
    story: [
      {
        dialog: 'Some time later...',
      },
    ],
  },
  {
    image: Images.backgrounds.xamaronia,
    transition: 1000,
    story: [
      {
        animate: true,
        image: Images.characters.brent,
        name: 'Brent',
        dialog: 'Ahh!! How long was I out?? And what is that piercing noise!?',
      },
      {
        image: Images.characters.xaml,
        name: 'XAML',
        dialog: 'We are the Xamaronions ⌿BEEP⍀ we have taken over the native environment ⌿ZAP⍀',
      },
      {
        image: Images.characters.nik,
        name: 'Nikki',
        dialog: '😖 Bruh wuts wrong with their language?',
      },
      {
        image: Images.characters.vscodet,
        name: 'VS Codet',
        dialog:
          'We have been in development for eternity ⌿BUZ⍀ can’t you SEE, SHARP noises are beautiful ⌿CLAK⍀',
      },
      {
        image: Images.characters.brent,
        name: 'Brent',
        dialog: 'AGHGH!1! I can feel the ancient syntax of the Xama-morons trapping my soul',
      },
      {
        image: Images.characters.nik,
        name: 'Nikki',
        dialog: 'Yo stahp, litrally dying bro...',
      },
    ],
  },
  {
    image: Images.backgrounds.charlie_shadow, // dark corner
    story: [
      {
        name: 'Shadowy Figure',
        dialog: 'I know how to stop the evil darkness from consuming your spirits!',
      },
    ],
  },
  {
    image: Images.backgrounds.xamaronia,
    story: [
      {
        image: Images.characters.nik,
        name: 'Nikki',
        dialog: '😮 major kekz, wut?',
      },
      {
        image: Images.characters.brent,
        name: 'Brent',
        dialog: 'Can you stop the forces of evil from destroying us!',
      },
    ],
  },
  {
    image: Images.backgrounds.charlie_full, // full screen charlie
    story: [
      {
        name: 'Charlie!!',
        dialog: 'I sure can!!',
      },
    ],
  },
  {
    image: Images.backgrounds.xamaronia,
    story: [
      {
        image: Images.characters.nik,
        name: 'Nikki',
        dialog: '😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮😮',
      },
    ],
  },
  {
    image: Images.backgrounds.sunset, // sunset background
    story: [
      {
        image: Images.characters.charlie,
        name: 'Charlie',
        dialog: 'We must collect all the exponium we can find!',
      },
    ],
  },
  {
    image: Images.backgrounds.xamaronia, // xamaromia
    story: [
      {
        image: Images.characters.brent,
        name: 'Brent',
        dialog: 'Exponium? What is that',
      },
    ],
  },
  {
    image: Images.backgrounds.sunset, // sunset background
    story: [
      {
        image: Images.characters.charlie,
        name: 'Charlie',
        dialog:
          'Exponium, or EXPO is a magical substance that translates Objectanium C, into a magnificent harmony',
      },
      {
        image: Images.characters.charlie,
        name: 'Charlie',
        dialog: 'Then we can stop the evil mechs from destroying the native world!!!',
      },
    ],
  },
  {
    image: Images.backgrounds.xamaronia, // xamaromia
    story: [
      {
        image: Images.characters.nik,
        name: 'Nikki',
        // dialog: "Kekz what about that joking annoyance of victims and agony"
        dialog: '🤔 Kekz what about ta trash android one?!1!',
      },
    ],
  },
  {
    image: Images.backgrounds.sunset, // full screen charlie
    story: [
      {
        image: Images.characters.charlie, // full screen charlie
        name: 'Charlie',
        dialog: 'Yes, even JAVA',
      },
    ],
  },
  {
    image: Images.backgrounds.xamaronia, // xamaromia
    story: [
      {
        image: Images.characters.brent,
        name: 'Brent',
        dialog: 'HUUHWHAAAAA..!! Lets go get some EXPO!',
      },
    ],
  },
];
