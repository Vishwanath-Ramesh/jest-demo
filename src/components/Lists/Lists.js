import React from 'react'

import List from './List/List'

function Lists() {
    return (
        <ul className='lists'>
            <List description="One"/>
            <List description="Two"/>
            <List description="Three"/>
        </ul>
    )
}

export default Lists
