import { Link } from '@inertiajs/react';

export default function Pagination({links}) {
  return (
    <div className='py-12'>
        {links.map((link, key) => (
            link.url ?
            <Link className={`px-2 ${link.active ? 'rounded ring-2 ring-blue-500' : ''}`}
                key={key}
                href={link.url}
                dangerouslySetInnerHTML={{ __html: link.label }} 
            />
            :
            <span className='px-2 text-slate-300' key={key} dangerouslySetInnerHTML={{ __html: link.label }} />
        ))}
    </div>
  )
}
