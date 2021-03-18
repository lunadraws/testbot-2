import React from 'react'

import { Plugin } from '@vizality/entities'
import { ContextMenu } from '@vizality/components'
import { getModule } from '@vizality/webpack'
import { patch, unpatch } from '@vizality/patcher'
import { open as openModal } from '@vizality/modal'

import Confirm from './components/Confirm'

export default class MassLeaveGuilds extends Plugin {
  async start() {
    const GuildFolderContextMenu = await getModule(m => m.default?.displayName === 'GuildFolderContextMenu')
    patch('mass-leave-context-menu', GuildFolderContextMenu, 'default', (args, res) => {
      res.props.children.push(
        <ContextMenu.Group>
          <ContextMenu.Item
            id='mass-leave' color='colorDanger' label='Mass Leave All'
            action={() => openModal(() => <Confirm vz={vizality} folderId={args[0].folderId}/>)}/>
        </ContextMenu.Group>
      )
    })
  }

  stop() { 
    unpatch('mass-leave-context-menu') 
  }
}