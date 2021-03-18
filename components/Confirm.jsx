import React from 'react'

import { Modal, Button, Text, FormTitle } from '@vizality/components'
import { close as closeModal } from '@vizality/modal'
import { getModule } from '@vizality/webpack'

import leaveGuilds from '../apis/leaveGuilds'

const classes = { ...getModule('button', 'subtitle') }
export default ({ vz, folderId }) => {
  return <>
    <Modal size={Modal.Sizes.SMALL} className='mass-leave-confirm-modal'>
      <Modal.Header>
        <FormTitle tag='h2' style={{ margin: '0px' }}>
          Leave Guilds in this Folder?
        </FormTitle>
        <Modal.CloseButton onClick={closeModal}/>
      </Modal.Header>
      <Modal.Content className={classes.content}>
        <Text
          size={Text.Sizes.SIZE_24}
          color={Text.Colors.HEADER_PRIMARY}
          className={classes.title}>
            This action is irreversible.
        </Text>
        <Text
          size={Text.Sizes.SIZE_16}
          color={Text.Colors.HEADER_SECONDARY}
          className={classes.subtitle}>
          Only click the below button if you are absolutly sure.
        </Text>
      </Modal.Content>
      <Modal.Footer>
        <Button 
          size={Button.Sizes.LARGE}
          className={classes.button}
          color={Button.Colors.RED}
          onClick={() => { 
            leaveGuilds(vz, folderId)
            closeModal() 
          }}>
          I'm sure.
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}