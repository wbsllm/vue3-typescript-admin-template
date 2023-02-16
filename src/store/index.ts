import getters from './getters'
import modules from './modules'

import { IAppState } from './modules/app'
import { ISettingsState } from './modules/settings'
import { ITagsViewState } from './modules/tagsView'
import { IPermissionState } from './modules/permission'
import { IUserState } from './modules/user'

export type IRootState = {
  app: IAppState
  settings: ISettingsState
  tagsView: ITagsViewState
  permission: IPermissionState
  user: IUserState
}

export default createStore<IRootState>({
  getters,
  modules
})
