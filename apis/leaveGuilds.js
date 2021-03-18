import { getModule } from '@vizality/webpack'

const { getGuild } = getModule('getGuild')
const { getGuildFolderById } = getModule('getGuildFolderById')
const { leaveGuild } = getModule('leaveGuild')

export default async (vizality, folderId) => {
  for (let guild of getGuildFolderById(folderId).guildIds) {
    await leaveGuild(guild).catch(e => {
      vizality.api.notifications.sendToast({
        header: 'Error Leaving Guild', id: `mass-leave-error-${guild}`,
        content: `There was an error leaving "${getGuild(guild).name}"`,
        buttons: [{
          text: 'Dismiss', color: 'red', look: 'outlined',
          onClick: () => vizality.api.notifications.closeToast(`mass-leave-error-${guild}`)
        }],
        timeout: 3e3
      })
      console.error(e)
    })
  }
}