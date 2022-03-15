import {Attendant} from "./attendant";

export type Attendants = Attendant[];


/**
 * Add an attendant
 * @param currentAttendants
 * @param newAttendant
 */
export function addAttendant(currentAttendants: Attendants, newAttendant: Attendant): Attendant[] {
    return [ ...currentAttendants, newAttendant ];
}
