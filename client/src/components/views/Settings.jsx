import { Divider } from 'antd'
import React from 'react'
import washingmachine from '../../images/washing-machine.png'
import sauna from '../../images/sauna1.png'

export default function Settings() {
    return (
        <div>
            <p>Settings</p>
            <img src={washingmachine} alt="this is car" width={54} />
            <Divider />
            <img src={sauna} alt="sauna" width={54} />
        </div>
    )
}
