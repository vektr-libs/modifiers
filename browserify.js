var lr = ALLEX.execSuite.libRegistry;
lr.register('vektr_modifierslib',
  require('./index')(
    ALLEX,
    lr.get('allex_hierarchymixinslib'),
    lr.get('vektr_commonlib'),
    lr.get('vektr_renderinglib')
  )
);
