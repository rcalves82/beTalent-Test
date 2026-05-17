import { test, expect } from '@playwright/test';
import { BookingClient } from '../../../clients/BookingClient';
import {
  createBookingPayload,
  createBookingWithoutRequiredFieldsPayload,
  existingBookingId,
  filterBookingByCheckinQuery,
  filterBookingByNamePayload,
  filterBookingByNameQuery,
  updateBookingPayload,
} from '../../../data/booking.data';
import { getAuthToken } from '../../../helpers/auth.helper';
import type {
  CreateBookingResponse,
  FilterBookingByNameResponse,
  GetBookingResponse,
} from '../../../types/booking.types';

test.describe.serial('Booking', () => {
  let bookingId: number;
  let authToken: string;

  test('Criar reserva com sucesso', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.create(createBookingPayload);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as CreateBookingResponse;
    expect(body.bookingid).toEqual(expect.any(Number));
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toEqual(createBookingPayload);

    bookingId = body.bookingid;
  });

  test('Consultar reserva por ID', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.get(bookingId);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as GetBookingResponse;
    expect(body).toEqual(createBookingPayload);
  });

  test('Atualizar reserva com sucesso', async ({ request }) => {
    authToken = await getAuthToken(request);

    const bookingClient = new BookingClient(request);

    const response = await bookingClient.update(
      bookingId,
      updateBookingPayload,
      authToken,
    );

    expect(response.status()).toBe(200);

    const body = (await response.json()) as GetBookingResponse;
    expect(body).toEqual(updateBookingPayload);
  });

  test('Excluir reserva com sucesso', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.delete(bookingId, authToken);

    expect(response.status()).toBe(201);
    expect(await response.text()).toBe('Created');
  });
});

test.describe('Filtrar por nome da reserva', () => {
  test('Filtrar reservas por firstname e lastname', async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const { firstname, lastname } = filterBookingByNameQuery;

    const createResponse = await bookingClient.create(
      filterBookingByNamePayload,
    );
    expect(createResponse.status()).toBe(200);

    const { bookingid } =
      (await createResponse.json()) as CreateBookingResponse;

    const response = await bookingClient.filterByName(firstname, lastname);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as FilterBookingByNameResponse;
    expect(body.length).toBeGreaterThan(0);
    expect(body.some((item) => item.bookingid === bookingid)).toBe(true);
  });
});

test.describe('Filtrar por data', () => {
  test('Filtrar reservas por checkin', async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const { checkin } = filterBookingByCheckinQuery;

    const response = await bookingClient.filterByCheckin(checkin);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as FilterBookingByNameResponse;
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].bookingid).toEqual(expect.any(Number));
    expect(body[0].bookingid).toBeGreaterThan(0);
  });
});

test.describe('Atualização sem autenticação', () => {
  test('PUT sem token deve retornar 403 Forbidden', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.updateWithoutToken(
      existingBookingId,
      createBookingPayload,
    );

    expect(response.status()).toBe(403);
    expect(response.ok()).toBeFalsy();
  });
});

test.describe('Campo obrigatório ausente', () => {
  test('Sem firstname e lastname', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.create(
      createBookingWithoutRequiredFieldsPayload,
    );

    expect(response.status()).toBe(500);
    expect(response.ok()).toBeFalsy();
  });
});
