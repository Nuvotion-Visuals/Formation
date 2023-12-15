import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, Auth, TextInput, Gap } from '../../internal'

export default {
  title: 'Auth/Auth',
  component: Auth,
} as ComponentMeta<typeof Auth>

const UsernamePasswordTemplate = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <Gap gap={.75}>
      <TextInput 
        value={username}
        onChange={value => setUsername(value)}
        icon='user'
        iconPrefix='fas'
        label='Username'
        hero
      />
      <TextInput 
        value={password}
        onChange={value => setPassword(value)}
        icon='lock'
        iconPrefix='fas'
        label='Password'
        type='password'
        hero
      />
      <Button
        primary={true}
        text='Sign in'
        expand={true}
      />
    </Gap>
  )
}

const PasswordlessTemplate = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  
  return (
    <Gap gap={.75}>
      <TextInput 
        value={phoneNumber}
        onChange={value => setPhoneNumber(value)}
        icon='phone'
        iconPrefix='fas'
        label='Phone number'
        hero
        type='tel'
      />
      <Button
        primary={true}
        text='Send login code'
        expand={true}
        iconPrefix='fas'
      />
    </Gap>
  )
}

const Template: ComponentStory<typeof Auth> = args => <Auth {...args} />

export const UsernamePassword = Template.bind({})
UsernamePassword.args = {
  title: 'Login',
  logoSrc: 'logo-icon-color.png',
  children: <UsernamePasswordTemplate />,
  height: '100vh'
}
UsernamePassword.parameters = {
  layout: 'fullscreen'
}

export const Passwordless = Template.bind({})
Passwordless.args = {
  title: 'Login',
  logoSrc: 'logo-icon-color.png',
  children: <PasswordlessTemplate />,
  height: '100vh'
}
Passwordless.parameters = {
  layout: 'fullscreen'
}
