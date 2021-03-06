import type { Ordering } from './types';

export type WCharId = {
  clientId: number;
  clock: number;
};


export type WChar = {
  id: WCharId,
  isVisible: boolean,
  alpha: string,
  nextId: WCharId,
  prevId: WCharId,
};


const wCharIdBeginning: WCharId = { clientId: -1, clock: 0 };
const wCharIdEnding: WCharId = { clientId: -1, clock: 1 };


// -- special character to mark the beginning of a wString
// -- note: clientId of -1 denotes a special character generated by this library
// -- includes a self-referential 'prevId' field
export const wCharBeginning = {
  id: wCharIdBeginning,
  isVisible: false,
  alpha: ' ',
  prevId: wCharIdBeginning,
  nextId: wCharIdEnding,
};


// -- special character to mark the ending of a wString
// -- note: clientId of -1 denotes a special character generated by this library
// -- includes a self-referential 'nextId' field
export const wCharEnding = {
  id: wCharIdEnding,
  isVisible: false,
  alpha: ' ',
  prevId: wCharIdBeginning,
  nextId: wCharIdEnding,
};


export const hide = (wChar: WChar): WChar =>
  ({ ...wChar, isVisible: false });


export const compareWCharIds = (idA: WCharId, idB: WCharId): Ordering => {
  if (idA.clientId === idB.clientId) {
    if (idA.clock === idB.clock) {
      return 'EQ';
    }

    return idA.clock < idB.clock ? 'LT' : 'GT';
  }

  return idA.clientId < idB.clientId ? 'LT' : 'GT';
};
