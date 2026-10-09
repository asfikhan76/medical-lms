import { ArrowBigRightDash } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ items }) => (
    <nav aria-label="Breadcrumb" className='mb-5'>
        <ol className="flex overflow-hidden rounded border border-gray-200 bg-white text-sm text-gray-700">
            {items.map((item, idx) => (
                <li key={idx} className={idx > 0 ? "relative flex items-center" : undefined}>
                    {idx > 0 && (
                        <span className="ms-2" >
                            <ArrowBigRightDash size={20} color='gray' />
                        </span>
                    )}
                    {item.to ? (
                        <Link
                            to={item.to}
                            className={`block h-10 ${idx === 0 ? 'bg-gray-100 px-4' : 'pr-4 pl-6'}  leading-10 transition-colors hover:text-gray-900`}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className={`block h-10  ${idx === 0 ? 'bg-gray-100 px-4' : 'pr-4 pl-6'} leading-10`}>
                            {item.label}
                        </span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
)

export default Breadcrumb