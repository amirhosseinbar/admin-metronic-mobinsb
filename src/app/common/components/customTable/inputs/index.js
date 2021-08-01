import React from 'react'
import { TextField } from '@material-ui/core';


export default function index({ data , state , handelChangeState }) {

    let obj = {
        checkbox: 'checkbox',
        number: 'number',
        text: (
            <TextField
                value={state[data.title] ? state[data.title] :''}
                onChange={(event) =>handelChangeState(event.target.value , data.title )}
                onKeyDown={(event)=> event.keyCode === 13 ? alert(state[data.title]) : ''}
                variant="outlined"
                size={'small'}
            />
        )
    }

    return (
        <div>
            {
                obj[data.type] ? obj[data.type] : ''
            }
        </div>
    )
}
