import defaultSurvey from './default';

/**
 * All attributes that can be transferred from one general survey to another.
 */
export const coreAttributes = [
  'smp:location',
  'smp:locationName',
  'smp:location_type',
  'smp:date',
  'occ:comment',
  'smp:activity',
];

export default {
  [defaultSurvey.name]: defaultSurvey,
};
