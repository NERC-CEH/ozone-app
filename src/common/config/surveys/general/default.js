/** ****************************************************************************
 * General survey configuration file.
 **************************************************************************** */
import $ from 'jquery';
import Indicia from 'indicia';
import DateHelp from 'helpers/date';

const survey = {
  name: 'default',
  id: 175,
  webForm: 'enter-app-record',

  taxonGroups: [], // all

  editForm: [],

  attrs: {
    smp: {
      location: {
        values(location, submission) {
          // convert accuracy for map and gridref sources
          const accuracy = location.accuracy;
          const attributes = {};
          const keys = survey.attrs.smp;
          attributes.location_name = location.name; // this is a native indicia attr
          attributes[keys.location_source.id] = location.source;
          attributes[keys.location_gridref.id] = location.gridref;
          attributes[keys.location_altitude.id] = location.altitude;
          attributes[keys.location_altitude_accuracy.id] =
            location.altitudeAccuracy;
          attributes[keys.location_accuracy.id] = accuracy;

          // add other location related attributes
          $.extend(submission.fields, attributes);

          return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
            location.longitude
          ).toFixed(7)}`;
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

      activity: {
        id: 'group',
        values: activity => activity.id,
        type: 'input',
      },

      'country': {
        id: 372,
        label: 'Country',
        info: 'Select the country where you are.',
        type: 'radio',
        values: {
          "Austria": 3612,
          "Belgium": 3613,
          "Bulgaria": 3614,
          "Canada": 4472,
          "China": 4419,
          "Croatia": 3615,
          "Cuba": 4420,
          "Cyprus": 3616,
          "Czech Republic": 3617,
          "Denmark": 3618,
          "Egypt": 4421,
          "Estonia": 3619,
          "Finland": 3620,
          "France": 3621,
          "Germany": 3622,
          "Greece": 3623,
          "Hungary": 3624,
          "India": 4422,
          "Ireland": 3625,
          "Italy": 3626,
          "Japan": 4423,
          "Kenya": 14251,
          "Latvia": 3627,
          "Lithuania": 3628,
          "Luxembourg": 3629,
          "Malaysia": 14253,
          "Malta": 3630,
          "Netherlands": 3631,
          "Norway": 3632,
          "Pakistan": 4424,
          "Poland": 3633,
          "Portugal": 3634,
          "Romania": 3635,
          "Senegal": 14252,
          "Serbia": 4425,
          "Slovakia": 3636,
          "Slovenia": 3637,
          "South Africa": 4426,
          "Spain": 3638,
          "Sweden": 3639,
          "Switzerland": 3640,
          "Thailand": 14254,
          "Ukraine": 4427,
          "United Kingdom (UK)": 3641,
          "United States of America (USA)": 4428,
          "Vietnam": 14255,

          "Afghanistan": 14256,
          "Albania": 14257,
          "Algeria": 14258,
          "Andorra": 14259,
          "Angola": 14260,
          "Antigua and Barbuda": 14261,
          "Argentina": 14262,
          "Armenia": 14263,
          "Australia": 14264,
          "Azerbaijan": 14265,
          "Bahamas": 14266,
          "Bahrain": 14267,
          "Bangladesh": 14268,
          "Barbados": 14269,
          "Belarus": 14270,
          "Belize": 14271,
          "Benin": 14272,
          "Bhutan": 14273,
          "Bolivia": 14274,
          "Bosnia and Herzegovina": 14275,
          "Botswana": 14276,
          "Brazil": 14277,
          "Brunei": 14278,
          "Burkina Faso": 14279,
          "Burundi": 14280,
          "Cabo Verde": 14281,
          "Cambodia": 14282,
          "Cameroon": 14283,
          "Central African Republic (CAR)": 14284,
          "Chad": 14285,
          "Chile": 14286,
          "Colombia": 14287,
          "Comoros": 14288,
          "Democratic Republic of the Congo": 14289,
          "Republic of the Congo": 14290,
          "Costa Rica": 14291,
          "Cote d'Ivoire": 14292,
          "Djibouti": 14293,
          "Dominica": 14294,
          "Dominican Republic": 14295,
          "Ecuador": 14296,
          "El Salvador": 14297,
          "Equatorial Guinea": 14298,
          "Eritrea": 14299,
          "Eswatini (formerly Swaziland)": 14300,
          "Ethiopia": 14301,
          "Fiji": 14302,
          "Gabon": 14303,
          "Gambia": 14304,
          "Georgia": 14305,
          "Ghana": 14306,
          "Grenada": 14307,
          "Guatemala": 14308,
          "Guinea": 14309,
          "Guinea-Bissau": 14310,
          "Guyana": 14311,
          "Haiti": 14312,
          "Honduras": 14313,
          "Iceland": 14314,
          "Indonesia": 14315,
          "Iran": 14316,
          "Iraq": 14317,
          "Israel": 14318,
          "Jamaica": 14319,
          "Jordan": 14320,
          "Kazakhstan": 14321,
          "Kiribati": 14322,
          "Kosovo": 14323,
          "Kuwait": 14324,
          "Kyrgyzstan": 14325,
          "Laos": 14326,
          "Lebanon": 14327,
          "Lesotho": 14328,
          "Liberia": 14329,
          "Libya": 14330,
          "Liechtenstein": 14331,
          "Macedonia (FYROM)": 14332,
          "Madagascar": 14333,
          "Malawi": 14334,
          "Maldives": 14335,
          "Mali": 14336,
          "Marshall Islands": 14337,
          "Mauritania": 14338,
          "Mauritius": 14339,
          "Mexico": 14340,
          "Micronesia": 14341,
          "Moldova": 14342,
          "Monaco": 14343,
          "Mongolia": 14344,
          "Montenegro": 14345,
          "Morocco": 14346,
          "Mozambique": 14347,
          "Myanmar (formerly Burma)": 14348,
          "Namibia": 14349,
          "Nauru": 14350,
          "Nepal": 14351,
          "New Zealand": 14352,
          "Nicaragua": 14353,
          "Niger": 14354,
          "Nigeria": 14355,
          "North Korea": 14356,
          "Oman": 14357,
          "Palau": 14358,
          "Palestine": 14359,
          "Panama": 14360,
          "Papua New Guinea": 14361,
          "Paraguay": 14362,
          "Peru": 14363,
          "Philippines": 14364,
          "Qatar": 14365,
          "Russia": 14366,
          "Rwanda": 14367,
          "Saint Kitts and Nevis": 14368,
          "Saint Lucia": 14369,
          "Saint Vincent and the Grenadines": 14370,
          "Samoa": 14371,
          "San Marino": 14372,
          "Sao Tome and Principe": 14373,
          "Saudi Arabia": 14374,
          "Seychelles": 14375,
          "Sierra Leone": 14376,
          "Singapore": 14377,
          "Solomon Islands": 14378,
          "Somalia": 14379,
          "South Korea": 14380,
          "South Sudan": 14381,
          "Sri Lanka": 14382,
          "Sudan": 14383,
          "Suriname": 14384,
          "Syria": 14385,
          "Taiwan": 14386,
          "Tajikistan": 14387,
          "Tanzania": 14388,
          "Timor-Leste": 14389,
          "Togo": 14390,
          "Tonga": 14391,
          "Trinidad and Tobago": 14392,
          "Tunisia": 14393,
          "Turkey": 14394,
          "Turkmenistan": 14395,
          "Tuvalu": 14396,
          "Uganda": 14397,
          "United Arab Emirates (UAE)": 14398,
          "Uruguay": 14399,
          "Uzbekistan": 14400,
          "Vanuatu": 14401,
          "Vatican City (Holy See)": 14402,
          "Venezuela": 14403,
          "Yemen": 14404,
          "Zambia": 14405,
          "Zimbabwe": 14406
          
        }
      },

      'weather-temp': {
        id: 367,
        label: 'Temperature',
        question: 'What was the maximum daily temperature on average?',
        type: 'radio',
        values: {
          'under 20&deg;C': 3576,
          '20 to 30&deg;C': 3577,
          'over 30&deg;C': 3578
        }
      },

      'weather-rain': {
        id: 368,
        label: 'Rainfall',
        question: 'On how many days was there rain?',
        type: 'radio',
        values: {
          '0 days': 3577,
          '1 to 3 days': 3578,
          'over 3 days': 3576
        }
      },

      'pollution-concentration': {
        id: 369,
        label: 'Concentration',
        question: 'What was the maximum ozone concentration?',
        type: 'radio',
        values: {
          'Not known': 3990,
          'under 50ppb': 3582,
          '50 to 80ppb': 3583,
          'over 80ppb': 3584
        }
      },

      'pollution-duration': {
        id: 370,
        label: 'Duration',
        question: 'On how many days has the ozone concentration exceeded 50 ppb?',
        type: 'radio',
        values: {
          'Not known': 3991,
          '0 days': 3585,
          '1 to 3 days': 3586,
          'over 3 days': 3587
        }
      },
    },

    occ: {
      training: {
        id: 'training',
      },

      taxon: {
        values(taxon) {
          return taxon.warehouse_id;
        },
      },

      'injury-symptoms': {
        id: 413,
        label: 'Symptoms',
        question: 'Did you see any symptoms?',
        type: 'radio',
        values: {
          'No': 36,
          'Yes': 35
        }
      },

      'injury-colour': {
        id: 251,
        label: 'Colour',
        question: 'Which colour best describes the symptoms?',
        type: 'radio',
        values: {
          'Bronze/deep red/purple': 3563,
          'Pale yellow/yellow': 3564,
          'White/cream': 3565,
          'Other': 3566
        }
      },

      'injury-location': {
        id: 316,
        label: 'Location',
        question: 'Where are the symptoms?',
        type: 'radio',
        values: {
          'Between leaf veins': 3987,
          'On leaf veins': 3988,
          'Both on and between veins': 3989
        }
      },

      'injury-side': {
        id: 252,
        label: 'Side',
        question: 'On which side of the leaf are the symptoms?',
        type: 'radio',
        values: {
          'Upper leaf surface': 3567,
          'Lower leaf surface': 3568,
          'Both surfaces': 3569
        }
      },

      'injury-age': {
        id: 317,
        label: 'Age',
        question: 'On which leaves are the symptoms most severe?',
        type: 'radio',
        values: {
          'On older leaves': 3984,
          'On younger leaves': 3985,
          'No difference between young and old leaves	': 3986
        }
      },

      'injury-extent': {
        id: 253,
        label: 'Extent',
        question: 'How widespread are the symptoms?',
        type: 'radio',
        values: {
          'On a few leaves': 3570,
          'On many leaves': 3571
        }
      },

      'injury-evidence': {
        id: 254,
        label: 'Evidence',
        question: 'Is there any other evidence?',
        info: 'Is there any evidence of the following? Check all that apply:',
        type: 'checkbox',
        values: {
          'Insect damage': 3572,
          'Diseases': 3573,
          'Leaves dying and falling off': 3574,
          'Other symptoms': 3575
        }
      },

      'injury-evidence-other': {
        id: 255,
        label: 'Symptoms',
        question: 'What were the other symptoms?',
        type: 'text'
      },

      comment: {
        info: 'Please add any extra info about this record.',
        icon: 'comment',
        type: 'text',
      },
    },
  },
  verify(attrs) {
    const attributes = {};
    const occurrences = {};

    // todo: remove this bit once sample DB update is possible
    // check if saved or already send
    if (!this.metadata.saved || this.getSyncStatus() === Indicia.SYNCED) {
      attributes.send = false;
    }

    // location
    const location = attrs.location || {};
    if (!location.latitude) {
      attributes.location = 'missing';
    }
    // location name
    if (!location.name) {
      attributes['location name'] = 'missing';
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

    // occurrences
    this.occurrences.each(occurrence => {
      const errors = occurrence.validate(null, { remote: true });
      if (errors) {
        const occurrenceID = occurrence.cid;
        occurrences[occurrenceID] = errors;
      }
    });

    return [attributes, null, occurrences];
  },
};

export default survey;
