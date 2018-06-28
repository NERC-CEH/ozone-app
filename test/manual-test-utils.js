/** ********************************************************************
 * Manual testing functions.
 ******************************************************************** */
import App from 'app';
import savedRecords from 'saved_samples';
import Factory from 'common/models/model_factory';
import Indicia from 'indicia';
import GPS from 'mock-geolocation';
import bigu from 'bigu';

const testing = {};

testing.records = {
  /**
   * Reset All Records Status
   */
  resetRecordsStatus() {
    savedRecords.getAll((getError, recordsCollection) => {
      if (getError) {
        App.regions.dialog.error(getError);
        return;
      }
      recordsCollection.forEach(record => {
        record.metadata.saved = false;
        record.metadata.server_on = null;
        record.metadata.synced_on = null;
        record.metadata.updated_on = null;
        record.save();
      });
    });
  },

  /**
   * Add a Dummy Record.
   */
  addDummyRecord(count = 1, imageData, testID) {
    testing.records.generateImage(imageData, testID).then(image => {
      const sampleTestID = `test ${testID} - ${count}`;

      const taxon = {
        array_id: 12186,
        common_name: 'Tuberous Pea',
        found_in_name: 'common_name',
        group: 27,
        scientific_name: 'Lathyrus tuberosus',
        species_id: 3,
        synonym: 'Fyfield Pea',
        warehouse_id: 113813,
      };

      Factory.createSample('general', image, taxon).then(
        sample => {
          sample.set('location', {
            accuracy: 1,
            gridref: 'SD79735954',
            latitude: 54.0310862,
            longitude: -2.3106393,
            name: `${sampleTestID} location`,
            source: 'map',
          });
          sample.getOccurrence().set('comment', sampleTestID);

          sample.save().then(() => {
            savedRecords.add(sample);

            if (--count) {
              console.log(`Adding: ${count}`);
              testing.records.addDummyRecord(count, imageData, testID);
            } else {
              console.log('Finished Adding');
            }
          });
        }
      );
    });
  },

  generateImage(imageData, testID) {
    if (!imageData) {
      // create random image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const imgData = ctx.createImageData(1000, 1000); // px

      for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = (Math.random() * 100).toFixed(0);
        imgData.data[i + 1] = (Math.random() * 100).toFixed(0);
        imgData.data[i + 2] = (Math.random() * 100).toFixed(0);
        imgData.data[i + 3] = 105;
      }
      ctx.putImageData(imgData, 0, 0);
      imageData = canvas.toDataURL('jpeg');
    }

    if (!testID) {
      testID = (Math.random() * 10).toFixed(0);
    }

    const image = new Indicia.Media({
      data: imageData,
      type: 'image/png',
    });

    return image.addThumbnail().then(() => image);
  },
};

testing.GPS = {
  mock: GPS.use,

  /**
   * GPS.update({ gridRef: 'TQ1212', xCorrect: -19, yCorrect: 12 })
   * GPS.update({ latitude: 1, longitude: -1, accuracy: 12 })
   *
   * @param options
   * @returns {*}
   */
  update(options) {
    let location = options;
    if (options.gridRef) {
      // Grid References
      const parsedRef = bigu.GridRefParser.factory(options.gridRef);

      // center
      parsedRef.osRef.x += parsedRef.length / 2;
      parsedRef.osRef.y += parsedRef.length / 2;

      // allow manual corrections for grid reference square center
      if (options.xCorrect) {
        parsedRef.osRef.x += options.xCorrect;
      }
      if (options.yCorrect) {
        parsedRef.osRef.y += options.yCorrect;
      }

      const latLng = parsedRef.osRef.to_latLng();
      location = {
        latitude: latLng.lat,
        longitude: latLng.lng,
        accuracy: options.accuracy || parsedRef.length / 2,
      };
    }

    console.log(location);
    return GPS.change(location);
  },
};

window.testing = testing;
