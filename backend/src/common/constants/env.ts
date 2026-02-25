import jetEnv, { num } from 'jet-env';
import { isInArray } from 'jet-validators';

/******************************************************************************
                                 Constants
******************************************************************************/

// NOTE: These need to match the names of your ".env" files
export const NodeEnvs = {
  DEV: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
} as const;

/******************************************************************************
                                 Setup
******************************************************************************/

const EnvVars = jetEnv({
  NodeEnv: isInArray(Object.values(NodeEnvs)),
  Port: num,
});

/******************************************************************************
                            Export default
******************************************************************************/

export default EnvVars;
