import { usePage } from '@inertiajs/react'
import { Avatar, Badge, Drawer, useThemeMode } from 'flowbite-react'
import { UserPen } from 'lucide-react'
import React from 'react'

export default function Profile({isOpen, handleClose}) {
    const { user } = usePage().props.auth;
    const { mode } = useThemeMode();
    
  return (
    <Drawer className="z-50 space-y-5" open={isOpen} onClose={handleClose} position='right'>
        <Drawer.Header title="&nbsp;Profile Information" titleIcon={() => <UserPen />}/>
        <Drawer.Items className='flex flex-wrap space-x-3'>
            <Badge color={mode} size="lg">Name: {user.full_name}</Badge>
        </Drawer.Items>
        <Drawer.Items className='flex flex-wrap space-x-3'>
            <Badge color={mode} size="lg">Position: {user.position.name}</Badge>
        </Drawer.Items>
        <Drawer.Items className='flex flex-wrap space-x-3'>
            <Badge color={mode} size="lg">Department: {user.department.name}</Badge>
        </Drawer.Items>

    </Drawer>
  )
}
