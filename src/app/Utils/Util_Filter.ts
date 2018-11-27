import { ClrDatagridStringFilterInterface } from '@clr/angular';
import { ReservationData } from '../Utils/ReservationData';

/**
* Class for filtering Field metadata in datagrids on filterType property of model
*/
export class FieldTypeFilter implements ClrDatagridStringFilterInterface<ReservationData> {
    accepts(field: ReservationData, search: string): boolean {
        return '' + field.reservation_number === search
            || field.reservation_number.toLowerCase().indexOf(search) >= 0 ||
            field.account === search
            || field.account.toLowerCase().indexOf(search) >= 0;
    }
}
