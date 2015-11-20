'use strict';

import _ from 'lodash';
import Q from 'q';

import pipeStylesheet from 'markup-pipe-stylesheet';
import pipeScript from 'markup-pipe-script';

export default function () {
  let pipes = {
    stylesheet: pipeStylesheet,
    script:     pipeScript,
  };

  return Q.all(_.map(pipes,
    (pipeLoader, name) => pipeLoader()
      .then(pipe => {
        pipes[name] = pipe;
      })
  )).then(() => pipes);
};
