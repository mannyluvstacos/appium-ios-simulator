// transpile:mocha

import { getSimulator } from '../..';
import { quickLaunch } from 'appium-instruments';
import * as simctl from 'node-simctl';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mochawait';

let testSimVersion = '8.3';
let testSimDevice = 'iPhone 6';

/*let should =*/ chai.should();
chai.use(chaiAsPromised);

describe('sample', () => {

  it('should detect whether a simulator has been run before', async function () {
    this.timeout(15*1000);

    let udid = await simctl.createDevice('ios-simulator testing',
                                         testSimDevice,
                                         testSimVersion);

    after(async () => {
      await simctl.eraseDevice(udid);
    });

    let sim = await getSimulator(udid);

    await sim.isFresh().should.eventually.equal(true);

    await quickLaunch(udid);

    await sim.isFresh().should.eventually.equal(false);
  });

  it.only('should clean a sim', async () => {
    this.timeout(15*1000);

    let udid = await simctl.createDevice('ios-simulator testing',
                                         testSimDevice,
                                         testSimVersion);

    after(async () => {
      await simctl.eraseDevice(udid);
    });

    let sim = await getSimulator(udid);

    await sim.isFresh().should.eventually.equal(true);

    await quickLaunch(udid);

    await sim.isFresh().should.eventually.equal(false);

    await sim.clean();

    await sim.isFresh().should.eventually.equal(true);
  });

  //TODO e2e tests. check that rootdir exists
});