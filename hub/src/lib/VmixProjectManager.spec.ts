import { AppConfiguration } from './AppConfiguration'
import ServerEventEmitter from './ServerEventEmitter'
import VmixProjectManager from './VmixProjectManager'
import TallyContainer from '../tally/TallyContainer'
import { WebTally } from '../domain/Tally'

const projectPath = 'E:\\Projects\\Show.vmix'

test('loads saved assignments when the vMix project changes', () => {
  const emitter = new ServerEventEmitter()
  const configuration = new AppConfiguration(emitter)
  const container = new TallyContainer(configuration, emitter)
  const tally = new WebTally('Camera')
  tally.channelIds = ['8', '10']
  configuration.setVmixProjectProfile(projectPath, [tally.toJsonForSave()])
  const manager = new VmixProjectManager(configuration, container, emitter)

  emitter.emit('vmix.project.changed', projectPath)

  expect(container.get('Camera', 'web')?.channelIds).toEqual(['8', '10'])
  expect(manager.getState()).toEqual({
    presetPath: projectPath,
    projectName: 'Show.vmix',
    hasSavedConfiguration: true,
    hasUnsavedChanges: false,
  })
})

test('clears assignments when the vMix project has no saved profile', () => {
  const emitter = new ServerEventEmitter()
  const configuration = new AppConfiguration(emitter)
  const container = new TallyContainer(configuration, emitter)
  const tally = new WebTally('Camera', ['8'])
  container.update(tally)
  new VmixProjectManager(configuration, container, emitter)

  emitter.emit('vmix.project.changed', 'E:\\Projects\\Unsaved.vmix')

  expect(container.get('Camera', 'web')?.channelIds).toEqual([])
})
