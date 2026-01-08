import React from 'react';

import { Outlet } from 'react-router';
import Topbar from './Topbar';
import Sidebar from './Sidebar';


const Root = () => {
    return (
        <>
            <div><Topbar /></div>
            <div className='flex'>
                <Sidebar />
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Root;