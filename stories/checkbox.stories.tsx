import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { Checkbox } from '../src';
import './style/checkbox.scss';

const stories = storiesOf('Checkbox', module);

stories.add(
  '基本用法',
  withInfo({
    inline: true,
    text: '最简易的用法'
  })(() => (
    <>
        <div className="zyx-block"><Checkbox>普通</Checkbox></div>
        <div className="zyx-block"><Checkbox defaultChecked>默认选中</Checkbox></div>
        <div className="zyx-block"><Checkbox disabled>禁用</Checkbox></div>
        <div className="zyx-block"><Checkbox defaultChecked disabled>选中且禁用</Checkbox></div>
    </>
  )),
);

// stories.add(
//   'with emoji',
//   withInfo({
//     inline: true,
//     text: 'A simple button with some flare'
//   })(() => (
//     <ExampleButton
//       text={text('text', '👻 👽 🤖 💩!')}
//     />
//   )),
// );