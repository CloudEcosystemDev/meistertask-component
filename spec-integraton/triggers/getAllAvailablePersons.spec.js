const { expect } = require('chai');
const { getContext, getAccessToken } = require('../common');
const trigger = require('../../lib/triggers/trigger');

describe('Trigger GetAllAvailablePersons test', () => {
  it('should return persons', async () => {
    const msg = {
      attachments: {}, data: {}, metadata: {}, headers: {},
    };
    const cfg = {
      accessToken: await getAccessToken(),
      nodeSettings: {},
    };
    const snapshot = {};
    const tokenData = { function: 'GetAllAvailablePersons' };
    const ctx = getContext();
    await trigger.process.call(ctx, msg, cfg, snapshot, {}, tokenData);
    expect(ctx.emit.callCount).to.be.equal(10);
    expect(ctx.emit.args[0][0]).to.be.equal('data');
  });
});
