import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearchId = createAsyncThunk<string, undefined>('tickets/fetchSearchId', async () => {
  const response = await axios.get('https://aviasales-test-api.kata.academy/search');
  return response.data.searchId;
});

export const fetchTicketsData: any = createAsyncThunk<TicketType[], string>(
  'tickets/fetchTicketData',
  async (searchId: string, { dispatch }) => {
    const arr = [];
    try {
      const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      // console.log('response', response);
      const { tickets, stop } = await response.data;
      arr.push(...tickets);
      if (!stop) {
        arr.push(...dispatch(fetchTicketsData(searchId)));
        // console.log('inside fetch', searchId);
      }
      if (stop) {
        dispatch(stopLoading());
      }
    } catch (error: any) {
      if (error.code === 'ERR_BAD_RESPONSE') {
        arr.push(...dispatch(fetchTicketsData(searchId)));
        // console.log('error catched:', error);
      }
    }

    return arr;
  }
);

export interface TicketType {
  price: number;
  carrier: string;
  segments: {
    origin: string;
    destination: string;
    date: string;
    duration: number;
    stops: string[] | null[];
  }[];
}

interface ticketState {
  searchId: null | string;
  ticketsData: TicketType[];
  status: null | string;
  slice: number;
}

const initialState: ticketState = {
  searchId: null,
  ticketsData: [],
  status: null,
  slice: 5,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addFiveTickets(state) {
      state.slice = state.slice + 5;
    },
    stopLoading(state) {
      state.status = 'resolved';
      setTimeout(() => {
        state.status = 'done';
      }, 5000);
    },
    removeAlert(state) {
      state.status = 'done';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.fulfilled, (state, action: PayloadAction<string>) => {
      state.searchId = action.payload;
    });
    builder.addCase(fetchTicketsData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTicketsData.fulfilled, (state, action: PayloadAction<TicketType[]>) => {
      state.ticketsData.push(...action.payload);
    });
  },
});

export const { addFiveTickets, stopLoading, removeAlert } = ticketsSlice.actions;

export default ticketsSlice.reducer;
