import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Button/Button'
import { Auth } from './Auth'
import { Empty } from '../Empty/Empty'
import { AspectRatio } from '../AspectRatio/AspectRatio'
import { TextInput } from '../TextInput/TextInput'
import { Gap } from '../Gap/Gap'


export default {
  title: 'Auth/Auth',
  component: Auth,
} as ComponentMeta<typeof Auth>

const Template: ComponentStory<typeof Auth> = args => 
  <Auth {...args} />

export const UsernamePassword = Template.bind({})
UsernamePassword.args = {
  title: 'Login',
  logoSrc: 'logo-icon-color.png',
  children: <>
    <Gap gap={.75}>
      <TextInput 
        value=''
        icon='user'
        label='Username'
      />
      <TextInput 
        value=''
        icon='lock'
        label='Password'
      />
      <Button
        primary={true}
        text='Sign in'
        expand={true}
      />
    </Gap>
  </>
}


export const Passwordless = Template.bind({})
Passwordless.args = {
  title: 'Login',
  logoSrc: 'logo-icon-color.png',
  children: <>
    <Gap gap={.75}>
      <TextInput 
        value=''
        icon='phone'
        label='Phone number'
      />
      <Button
        primary={true}
        text='Send login code'
        expand={true}
      />
    </Gap>
  </>
}





