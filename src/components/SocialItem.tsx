'use client'

import { Tooltip } from '@mui/material'
import React from 'react'

const SocialItem = ({ data: sL }: any) => {
  return (
    <Tooltip
      title={
        sL.number ? <div className="w-full text-[14px]">{sL.number}</div> : null
      }
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 0],
              },
            },
            {
              name: 'zIndex',
              enabled: true,
              phase: 'write',
              fn({ state }) {
                state.styles.popper.zIndex = '1000000000'
              },
            },
          ],
        },
      }}
      arrow
      placement="bottom"
      key={sL?.id}
    >
      <a href={sL?.url} key={sL?.id} target="_blank">
        <img
          src={sL?.icon}
          alt={sL?.name}
          className="w-[32px] h-[32px] cursor-pointer object-contain"
        />
      </a>
    </Tooltip>
  )
}

export default SocialItem
