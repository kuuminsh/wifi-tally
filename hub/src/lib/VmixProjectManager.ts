import { TallySaveObjectType } from '../domain/Tally'
import TallyContainer from '../tally/TallyContainer'
import { AppConfiguration } from './AppConfiguration'
import ServerEventEmitter from './ServerEventEmitter'

export type VmixProjectState = {
  presetPath?: string
  projectName?: string
  hasSavedConfiguration: boolean
  hasUnsavedChanges: boolean
}

const getProjectName = (presetPath?: string) => presetPath?.split(/[\\/]/).pop()

class VmixProjectManager {
  private currentPresetPath?: string
  private hasUnsavedChanges = false
  private isApplyingProfile = false

  constructor(
    private configuration: AppConfiguration,
    private tallyContainer: TallyContainer,
    private emitter: ServerEventEmitter,
  ) {
    this.emitter.on('vmix.project.changed', presetPath => this.setProject(presetPath))
    this.emitter.on('config.changed.tallies', () => {
      if (this.currentPresetPath && !this.isApplyingProfile) {
        this.hasUnsavedChanges = true
        this.emitState()
      }
    })
  }

  getState(): VmixProjectState {
    return {
      presetPath: this.currentPresetPath,
      projectName: getProjectName(this.currentPresetPath),
      hasSavedConfiguration: this.currentPresetPath !== undefined && this.configuration.hasVmixProjectProfile(this.currentPresetPath),
      hasUnsavedChanges: this.hasUnsavedChanges,
    }
  }

  saveCurrentProject() {
    if (!this.currentPresetPath) {
      return false
    }

    const tallies: TallySaveObjectType[] = this.tallyContainer.getTallies().map(tally => tally.toJsonForSave())
    this.configuration.setVmixProjectProfile(this.currentPresetPath, tallies)
    this.hasUnsavedChanges = false
    this.emitState()
    return true
  }

  private setProject(presetPath?: string) {
    if (this.currentPresetPath === presetPath) {
      return
    }

    this.currentPresetPath = presetPath
    const profile = presetPath && this.configuration.getVmixProjectProfile(presetPath)
    this.hasUnsavedChanges = false
    this.isApplyingProfile = true
    try {
      if (profile) {
        this.tallyContainer.applyProjectTallies(profile.tallies)
      } else {
        this.tallyContainer.clearChannelAssignments()
      }
    } finally {
      this.isApplyingProfile = false
    }
    this.emitState()
  }

  private emitState() {
    this.emitter.emit('vmix.project.state.changed', this.getState())
  }
}

export default VmixProjectManager
