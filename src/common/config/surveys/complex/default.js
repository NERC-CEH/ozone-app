/** ****************************************************************************
 * Plant survey configuration file.
 **************************************************************************** */
import $ from 'jquery';
import Indicia from 'indicia';
import DateHelp from 'helpers/date';

const survey = {
  name: 'default',
  id: 325,
  complex: true,
  webForm: 'enter-vascular-plants',

  taxonGroups: [89, 78, 87, 99, 81, 148],

  attrs: {
    smp: {
      location: {
        values(location, submission) {
          const attributes = {};
          attributes.location_name = location.name; // this is a native indicia attr

          // add other location related attributes
          $.extend(submission.fields, attributes);
          return location.gridref;
        },
      },
      location_accuracy: { id: 282 },
      location_altitude: { id: 283 },
      location_altitude_accuracy: { id: 284 },
      location_source: { id: 760 },
      location_gridref: { id: 335 },

      device: {
        id: 273,
        values: {
          iOS: 2398,
          Android: 2399,
        },
      },

      device_version: { id: 759 },
      app_version: { id: 1139 },

      date: {
        values(date) {
          return DateHelp.print(date);
        },
        isValid: val => val && val.toString() !== 'Invalid Date',
        type: 'date',
        max: () => new Date(),
      },
      recorders: {
        id: 1018,
        info:
          'If anyone helped with the identification please enter their name here. ' +
          'To remove an entry clear out the name.',
        values(val, submission) {
          const attributes = {};
          const recorderCount = survey.attrs.smp.recorder_count;

          // add recorder count
          switch (true) {
            case val.length === 1:
              attributes[recorderCount.id] = recorderCount.values['1'];
              break;
            case val.length === 2:
              attributes[recorderCount.id] = recorderCount.values['2'];
              break;
            case val.length <= 5:
              attributes[recorderCount.id] = recorderCount.values['3-5'];
              break;
            case val.length <= 10:
              attributes[recorderCount.id] = recorderCount.values['6-10'];
              break;
            case val.length <= 20:
              attributes[recorderCount.id] = recorderCount.values['11-20'];
              break;
            case val.length >= 21:
              attributes[recorderCount] = recorderCount.values['21+'];
              break;
            default:
              throw new Error('No such recorderCount case found!');
          }
          $.extend(submission.fields, attributes);

          return val;
        },
      },
      recorder_count: {
        id: 992,
        values: {
          1: 7299,
          2: 7300,
          '3-5': 7301,
          '6-10': 7302,
          '21+': 7304,
          '11-20': 7303,
        },
      },
      'vice-county': {
        id: 991,
        values(val, submission) {
          const attributes = {};

          const name = `smpAttr:${this.id}:name`;
          const nameVal = val.name;
          attributes[name] = nameVal;

          $.extend(submission.fields, attributes);

          return parseInt(val.id, 10);
        },
      },
      'time-surveying': {
        id: 993,
        values: {
          '29 mins or less': 7468,
          '30 to 59 mins': 7469,
          '1h - 1h29mins': 7470,
          '1h30mins - 1h59mins': 7471,
          '2h - 2h29mins': 7472,
          '2h30mins -2h59mins': 7473,
          '3h - 3h29mins': 7474,
          '3h30mins - 3h59mins': 7475,
          '4h - 4h29mins': 7476,
          '4h30mins - 4h59mins': 7477,
          '5h - 5h29mins': 7478,
          '5h30mins - 5h59mins': 7479,
          '6h - 6h29mins': 7480,
          '6h30mins - 6h59mins': 7481,
          '7h - 7h29mins': 7482,
          '7h30mins - 7h59mins': 7483,
          '8h - 8h29mins': 7484,
          '8h30mins - 8h59mins': 7485,
          '9h - 9h29mins': 7486,
          '9h30mins - 9h59mins': 7487,
          '10hrs or longer': 7488,
        },
      },

      comment: {
        info:
          "Please include any additional notes about the grid square's environment or your survey methodology. Do not include details about indivual occurences here.",
      },
    },
    occ: {
      taxon: {
        values(taxon) {
          return taxon.warehouse_id;
        },
      },
      abundance: {
        id: 610,
      },
      status: {
        id: 507,
        info: 'Please pick the status.',
        default: 'Not Recorded',
        values: {
          Native: 5709,
          Unknown: 5710,
          Introduced: 6775,
          'Introduced - planted': 5711,
          'Introduced - surviving': 10662,
          'Introduced - casual': 10663,
          'Introduced - established': 5712,
          'Introduced - invasive': 5713,
        },
      },
      stage: {
        id: 466,
        info: 'Please pick the life stage.',
        default: 'Not Recorded',
        values: {
          Flowering: 5331,
          Fruiting: 5330,
          Juvenile: 5328,
          Mature: 5332,
          Seedling: 5327,
          Vegetative: 5329,
        },
      },
      identifiers: {
        id: 125,
      },

      comment: {
        info: 'Please add any extra info about this record.',
      },
      training: {
        id: 'training',
      },
    },
  },

  verify(attrs) {
    const attributes = {};
    const samples = {};
    const occurrences = {};

    const isChildSample = this.parent;

    // todo: remove this bit once sample DB update is possible
    // check if saved or already send
    if (
      !isChildSample &&
      (!this.metadata.saved || this.getSyncStatus() === Indicia.SYNCED)
    ) {
      attributes.send = false;
    }

    // location
    const location = attrs.location || {};
    if (!location.latitude) {
      attributes.location = 'missing';
    }

    // survey level
    if (!isChildSample) {
      if (!location.name) {
        attributes['location name'] = 'missing';
      }

      // recorder names
      if (!attrs.recorders || !attrs.recorders.length) {
        attributes.recorder_names = "can't be blank";
      }
    }

    // date
    if (!attrs.date) {
      attributes.date = 'missing';
    } else {
      const date = new Date(attrs.date);
      if (date === 'Invalid Date' || date > new Date()) {
        attributes.date =
          new Date(date) > new Date() ? 'future date' : 'invalid';
      }
    }

    // location type
    if (!attrs.location_type) {
      attributes.location_type = "can't be blank";
    }

    // subsamples
    this.samples.each(subSample => {
      const errors = subSample.validate(null, { remote: true });
      if (errors) {
        const sampleID = subSample.cid;
        samples[sampleID] = errors;
      }
    });

    // occurrences
    this.occurrences.each(occurrence => {
      const errors = occurrence.validate(null, { remote: true });
      if (errors) {
        const occurrenceID = occurrence.cid;
        occurrences[occurrenceID] = errors;
      }
    });

    return [attributes, samples, occurrences];
  },
};

export default survey;
