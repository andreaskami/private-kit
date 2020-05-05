import intro from './intro.json'
import locationTracking from './locationTracking.json'
import importFile from './import.json'
import exportFile from './exportscreen.json'
import licensesFile from './licensesscreen.json'
import overlapFile from './overlap.json'
import ixnilatisOverride from './ixnilatisOverride.json'
import ixnilatisNew from './ixnilatisNew.json'
import statistics from './statistics.json'
import validations from './validations.json'
import alerts from './alerts.json'

export default {
  ...intro,
  ...locationTracking,
  ...importFile,
  ...exportFile,
  ...overlapFile,
  ...licensesFile,
  ...ixnilatisOverride,
  ...ixnilatisNew,
  ...statistics,
  ...alerts,
  ...validations
}
