#!/usr/bin/env node

import * as git from './git';
import { loadConfig } from './config';
import { error, log } from './log';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  log('start');

  try {
    const gitRoot = git.getRoot();
    const branch = await git.getBranchName(gitRoot);
    console.log(branch);
    const config = await loadConfig();
    const ticket = git.getJiraTicket(branch, config);

    log(`The JIRA ticket ID is: ${ticket}`);

    git.writeJiraTicket(ticket, config);
  } catch (err) {
    error(err);
  }

  log('done');
})();
