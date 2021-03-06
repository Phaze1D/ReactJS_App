import faker from 'faker'
import { Random } from 'meteor/random'

import {factoryResource} from '../../resources/faker/factoryResource.js'
import {factoryUnit} from '../../units/faker/factoryUnit.js'
import {factoryOUser} from '../../ousers/faker/factoryOUser'



const testIdentifer = () => {
  if(faker.random.boolean()){
    return faker.random.word();
  }
  return ;
}

const testCreated = () => {
  return faker.date.past();
}

const testExpires = () => {
  if(faker.random.boolean()){
    return faker.date.future();
  }
  return ;
}

const testNotes = () => {
  if(faker.random.boolean()){
    return faker.lorem.paragraph();
  }
}

const factoryYield = () => {
  let _yield = {
    _id: Random.id(),
    identifer: testIdentifer(),
    amount: (Math.random() * 400).toFixed(8),
    createdAt: testCreated(),
    expiresAt: testExpires(),
    notes: testNotes(),
    resource: factoryResource(),
    unit: factoryUnit(),
    createdAt: testCreated(),
    updatedAt: testCreated(),
    createdBy: factoryOUser(),
    updatedBy: factoryOUser()
  }
  return _yield;
}

exports.factoryYield = factoryYield;
