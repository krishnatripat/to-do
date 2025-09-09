import React from 'react'

function Nav() {
    return (<nav className='flex justify-between  bg-purple-500 gap-8 '>
            <div className='logo text-center'>
                <span className='font-bold m-4 text-center '>I-task</span>
            </div>
            <ul className=' flex gap-8 m-2 font-bold'>
            <li > <a href="">HOME</a></li>
                <li><a href=""> HELP</a></li>
            </ul></nav>
    )
}

export default Nav