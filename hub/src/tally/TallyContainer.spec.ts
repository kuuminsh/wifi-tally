import TallyContainer from './TallyContainer'
import ServerEventEmitter from '../lib/ServerEventEmitter';
import { AppConfiguration } from '../lib/AppConfiguration';
import WebTallyDriver from './WebTallyDriver';

test('it writes changes to configuration', () => {
    const emitter = new ServerEventEmitter()
    const configuration = new AppConfiguration(emitter)
    const container = new TallyContainer(configuration, emitter)
    new WebTallyDriver(configuration, container)

    // check that it is initially empty
    expect(configuration.getTallies()).toEqual([])

    const tally = container.getOrCreate("Foobar", "web")

    // tally was created
    expect(configuration.getTallies()).toHaveLength(1)
    expect(configuration.getTallies()[0].name).toEqual("Foobar")
    expect(configuration.getTallies()[0].channelIds).toEqual([])

    container.patch(tally.name, "web", ["42", "84"])
    expect(configuration.getTallies()).toHaveLength(1)
    expect(configuration.getTallies()[0].name).toEqual("Foobar")
    expect(configuration.getTallies()[0].channelIds).toEqual(["42", "84"])

    container.remove(tally.name, "web")
    expect(configuration.getTallies()).toEqual([])
})