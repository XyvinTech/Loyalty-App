import { Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function StyledTab({ tabs, onChange }) {
    const [value, setValue] = useState(0)
    return (
        <Tabs
            value={value}
            variant='fullWidth'
            sx={{ width: '100%', borderBottom: '1px solid #bbb' }}
            onChange={(e, newValue) => { onChange(newValue);setValue(newValue) }}>
            {
                tabs.map((item, ind) => (
                    <Tab sx={{ textTransform: 'none' }} label={
                        <Typography variant='h6' sx={{ fontWeight: 600 }}>{item}</Typography>
                    } value={ind} />
                ))
            }
        </Tabs>
    )
}
