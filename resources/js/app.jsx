import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from '@/Layouts/Layout';
import PlannerLayout from '@/Layouts/Planner/PlannerLayout';
import HRMISLayout from '@/Layouts/HRMIS/HRMISLayout';

createInertiaApp({
    title: title => title ? `${title} - Human Resource Management Information System` : 'Human Resource Management Information System',
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page =  pages[`./Pages/${name}.jsx`];
        
        if (name.startsWith('HRMIS')) {
            page.default.layout = page.default.layout || ((page) => <HRMISLayout children={page} />);
        }else if(name.startsWith('Planner')){
            page.default.layout = page.default.layout || ((page) => <PlannerLayout children={page} />);
        }else{
            page.default.layout = page.default.layout || ((page) => <Layout children={page} />);
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#fff',
        showSpinner: true
    }
});

