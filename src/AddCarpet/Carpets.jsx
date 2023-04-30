import {Realm, createRealmContext} from '@realm/react';

const CarpetSchema = {
  name: 'Carpet',
  properties: {
    model: 'string',
    W: {type:'float',default:0},
    L: {type:'float',default:0},
    price_m: {type: 'int', default: 0},
  },
};

const realm = new Realm({schema: [CarpetSchema]});

realm.write(() => {
  const myCarpets = realm.create('Carpet', {
    model: 'Havana',
    W: 0.9,
    L: 1.8,
    price_m: 80,
  });
});
const Carpets=realm.objects('Carpet');
