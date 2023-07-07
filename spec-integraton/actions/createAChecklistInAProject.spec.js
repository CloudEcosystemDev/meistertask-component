const { expect } = require('chai');
const { getContext, getAccessToken } = require('../common');
const action = require('../../lib/actions/action');

describe('Action GetAllAvailablePersons test', () => {
  it('should return data', async () => {
    const cfg = {
      accessToken: await getAccessToken(),
    };
    const data = {
      project_id: 7964968,
      name: 'test checklist from WS',
      sequence: 4,
    };
    const msg = {
      attachments: {}, data, metadata: {}, headers: {},
    };
    const snapshot = {};
    const incomingMessageHeaders = {};
    const tokenData = { function: 'CreateAChecklistInAProject' };
    const ctx = getContext();
    await action.process.call(ctx, msg, cfg, snapshot, incomingMessageHeaders, tokenData);
    expect(ctx.emit.callCount).to.be.equal(1);
    expect(ctx.emit.args[0][0]).to.be.equal('data');
    expect(ctx.emit.args[0][1].data).to.be.equal(data);
  });
});
