import { usePage } from '@inertiajs/react'
import { Avatar, Badge, Drawer, useThemeMode } from 'flowbite-react'
import { UserPen } from 'lucide-react'
import React from 'react'

export default function Profile({isOpen, handleClose}) {
    const { assetUrl } = usePage().props;
    const { user } = usePage().props.auth;
    const { mode } = useThemeMode();
    
  return (
    <Drawer className="z-50 space-y-5 min-w-fit" size="xl" open={isOpen} onClose={handleClose} position='right'>
        <Drawer.Header title="&nbsp;Profile Information" titleIcon={() => <UserPen />}/>

            <Drawer.Items className='flex justify-center border-b py-5'>
                <Avatar
                    img={`${assetUrl}/${user.user_photo}`}
                    alt="Profile Photo"
                    className="min-h-52 w-auto cursor-pointer"
                    placeholderInitials='User Profile'
                    size="2xl" 
                    rounded bordered
                />
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Name:</Badge>
                <Badge color={mode} size="lg">{user.full_name}</Badge>
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Email:</Badge>
                <Badge color={mode} size="lg">{user.email}</Badge>
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Position: </Badge>
                <Badge color={mode} size="lg">{user.position.name}</Badge>
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Status:</Badge>
                <Badge color={mode} size="lg">{user.employment_status.name}</Badge>
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Department: </Badge>
                <Badge color={mode} size="lg">{user.department.name}</Badge>
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Office: </Badge>
                <Badge color={mode} size="lg">{user.department.office.name}</Badge>
            </Drawer.Items>
            <Drawer.Items className='flex flex-wrap items-center space-x-3'>
                <Badge className='min-w-28 bg-inherit dark:bg-inherit dark:text-slate-300' size="sm">Location: </Badge>
                <Badge color={mode} size="lg">{user.department.office.location.name}</Badge>
            </Drawer.Items>

    </Drawer>
  )
}
