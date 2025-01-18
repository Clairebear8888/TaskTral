import { createStore } from 'zustand/vanilla';
import { createDispatch } from 'zutron/main';
import { runAgent } from './runAgent';
import { AppState } from './types';

export const store = createStore<AppState>((set, get) => ({
  instructions: `start with Hacker News (2H)
- Code (4h)
- Meetings (1h)`,
  fullyAuto: true, // renamed and changed default to true
  running: false,
  error: null,
  runHistory: [],
  RUN_AGENT: async () => runAgent(set, get),
  STOP_RUN: () => set({ running: false }),
  SET_INSTRUCTIONS: (instructions) => set({ instructions }),
  SET_FULLY_AUTO: (fullyAuto) => {
    // renamed from SET_HUMAN_SUPERVISED
    set({ fullyAuto: fullyAuto ?? true }); // changed default to true
  },
  CLEAR_HISTORY: () => set({ runHistory: [] }),
}));

export const dispatch = createDispatch(store);
