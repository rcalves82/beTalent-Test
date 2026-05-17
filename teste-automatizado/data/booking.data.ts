import type {
  BookingRequest,
  IncompleteBookingRequest,
} from '../types/booking.types';

export const createBookingPayload: BookingRequest = {
  firstname: 'Vini',
  lastname: 'Jr',
  totalprice: 190,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-05-17',
    checkout: '2026-05-18',
  },
  additionalneeds: 'Breakfast',
};

export const createBookingWithoutRequiredFieldsPayload: IncompleteBookingRequest =
  {
    totalprice: 190,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-05-17',
      checkout: '2026-05-18',
    },
    additionalneeds: 'Breakfast',
  };

export const updateBookingPayload: BookingRequest = {
  firstname: 'Messi',
  lastname: 'Silva',
  totalprice: 286,
  depositpaid: false,
  bookingdates: {
    checkin: '2026-05-24',
    checkout: '2026-06-04',
  },
  additionalneeds: 'Breakfast',
};

export const filterBookingByNamePayload: BookingRequest = {
  firstname: 'FilterTest',
  lastname: 'ByName',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-06-01',
    checkout: '2026-06-02',
  },
  additionalneeds: 'Breakfast',
};

export const filterBookingByNameQuery = {
  firstname: filterBookingByNamePayload.firstname,
  lastname: filterBookingByNamePayload.lastname,
};

export const filterBookingByCheckinQuery = {
  checkin: '2026-05-17',
};

export const existingBookingId = 10;
