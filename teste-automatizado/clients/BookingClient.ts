import type { APIRequestContext, APIResponse } from '@playwright/test';
import type {
  BookingRequest,
  IncompleteBookingRequest,
} from '../types/booking.types';

export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  create(
    booking: BookingRequest | IncompleteBookingRequest,
  ): Promise<APIResponse> {
    return this.request.post('/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: booking,
    });
  }

  get(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  filterByName(firstname: string, lastname: string): Promise<APIResponse> {
    return this.request.get('/booking', {
      params: { firstname, lastname },
    });
  }

  filterByCheckin(checkin: string): Promise<APIResponse> {
    return this.request.get('/booking', {
      params: { checkin },
    });
  }

  update(
    id: number,
    booking: BookingRequest,
    token: string,
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
      data: booking,
    });
  }

  updateWithoutToken(
    id: number,
    booking: BookingRequest,
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: booking,
    });
  }

  delete(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}
