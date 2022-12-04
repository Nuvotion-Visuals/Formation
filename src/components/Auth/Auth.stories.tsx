import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../../internal'
import { Auth } from '../../internal'
import { TextInput } from '../../internal'
import { Gap } from '../../internal'

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
        iconPrefix='fas'
        label='Username'
      />
      <TextInput 
        value=''
        icon='lock'
        iconPrefix='fas'
        label='Password'
      />
      <Button
        primary={true}
        text='Sign in'
        expand={true}
        hero={true}
      />
    </Gap>
  </>
}
UsernamePassword.parameters = {
  layout: 'fullscreen'
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
        iconPrefix='fas'
      />
      <Button
        primary={true}
        text='Send login code'
        expand={true}
        iconPrefix='fas'
        hero={true}
      />
    </Gap>
  </>

}
Passwordless.parameters = {
  layout: 'fullscreen'
}




