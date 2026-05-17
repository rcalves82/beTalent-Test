export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingRequest {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface IncompleteBookingRequest {
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface CreateBookingResponse {
  bookingid: number;
  booking: BookingRequest;
}

export type GetBookingResponse = BookingRequest;

export interface BookingIdItem {
  bookingid: number;
}

export type FilterBookingByNameResponse = BookingIdItem[];
