/** @jsx dom */

import '../styles/index.scss';

import {
  dynamicTpl
} from './vdom/templates.jsx';

import vdom from './vdom/vdom.js';

let oldData = {
  current: true,
  name: 'Maxime',
  age: '35',
  hello: (arg) => {
    return `hello ${data.name} ${arg}!`;
  },
  list: [
    {
      className: 'max',
      name: 'max lerog',
      age: '79'
    },
    {
      className: 'oliv',
      name: 'Olivia Girard',
      age: '35'
    }, {
      className: 'jack',
      name: 'Jacques Lerouge',
      age: '34'
    }
  ]
};

let newData = {
  name: 'Maxime',
  age: '36',
  hello: (arg) => {
    return `hello my ${arg}!`;
  },
  list: [
    {
      className: 'max',
      name: 'max lerog',
      age: '79'
    },
    {
      className: 'oliv',
      name: 'Olivia Girard',
      age: '35'
    }, {
      className: 'jack',
      name: 'Jacques Lerouge',
      age: '64'
    }
  ]
};

(function () {
    'use strict';

    if (module.hot) {
        module.hot.accept();
    }

    window.addEventListener('load', function () {
      // ---------------------------------------------------------------------

      const $root = document.querySelector('#root');
      const $reload = document.querySelector('#reload');

      let reloadKey = 0;

      vdom($root, dynamicTpl(oldData));

      $reload.addEventListener('click', () => {
        vdom(
          $root,
          reloadKey % 2 === 0 ? dynamicTpl(newData) : dynamicTpl(oldData),
          reloadKey % 2 === 0 ? dynamicTpl(oldData) : dynamicTpl(newData)
        );

        reloadKey++;
      });

    });
}());
