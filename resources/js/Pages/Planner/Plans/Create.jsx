import { Link, usePage } from '@inertiajs/react';
import { Badge, Carousel, Table } from 'flowbite-react';

import { Eye, PanelBottomOpen, PanelTopOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import Notify from '@/Helper/functions/notify';

import CreateForm from './Forms/CreateForm';


export default function Create()
{
    const {assetUrl, plans, flash} = usePage().props;
    const [ showList, setShowList ] = useState(false);
    

    useEffect(() => {
        if (flash.response) {
            Notify(flash.response);
        }
    }, [flash]);

    return (
        <>
            <ToastContainer />
            <div className="flex flex-wrap p-5 gap-5 items-center">

                <div className="flex-none w-full lg:w-1/2 max-w-xl">

                    <CreateForm />
                </div>

                <div className="flex-1 h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel>
                        <img src={`${assetUrl}/assets/create_planner_1.jpg`} alt="..." />
                        <img src={`${assetUrl}/assets/create_planner_2.jpg`} alt="..." />
                    </Carousel>
                </div>
            </div>

            <div className="divider text-slate-400 cursor-pointer hover:text-slate-700" onClick={()=>setShowList(!showList)}>
                {showList ?
                    <div className='flex items-center gap-2'><span>Hide existing plans</span><PanelBottomOpen className='h-4 w-4'/></div>
                    :
                    <div className='flex items-center gap-2'><span>Show existing plans</span><PanelTopOpen className='h-4 w-4'/></div>
                }
            </div>
            {showList &&
                <div className='px-5'>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                                Plan Title
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Group Plan
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Privacy
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Action
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {plans.map((plan, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {plan.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {plan.is_group_plan ? 'Yes' : 'No'}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {plan.privacy}
                                    </Table.Cell>
                                    <Table.Cell className='flex justify-center'>
                                        <Link href={`/plans/${plan.id}`} >
                                            <Badge className='hover:ring-1 hover:bg-sky-300 active:ring-2' icon={Eye} />
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            }
        </>
    )
}
