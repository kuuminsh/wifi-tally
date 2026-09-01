import { useEffect, useState } from 'react'
import { socket, socketEventEmitter } from './useSocket'

export type VmixProjectState = {
  presetPath?: string
  projectName?: string
  hasSavedConfiguration: boolean
  hasUnsavedChanges: boolean
}

function useVmixProject() {
  const [project, setProject] = useState<VmixProjectState>({ hasSavedConfiguration: false, hasUnsavedChanges: false })

  useEffect(() => {
    const onProjectState = (state: VmixProjectState) => setProject(state)
    const subscribe = () => socket.emit('events.vmixProject.subscribe')

    socket.on('vmix.project.state', onProjectState)
    socketEventEmitter.on('connected', subscribe)
    subscribe()
    return () => {
      socket.off('vmix.project.state', onProjectState)
      socketEventEmitter.off('connected', subscribe)
    }
  }, [])

  return project
}

export default useVmixProject
