export type TimeEntry = {
  work: number;
  life: number;
  timestamp: Date;
};

// Example data for hours (last 24 hours)
export const hourlyData: TimeEntry[] = Array.from({ length: 24 }, (_, i) => {
  const work = Math.floor(Math.random() * 61); // 0-60 minutes
  const life = 60 - work; // Remaining minutes to total 60
  return {
    work,
    life,
    timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
  };
});

// Example data for days (last 7 days)
export const dailyData: TimeEntry[] = Array.from({ length: 7 }, (_, i) => {
  const work = 8 + Math.floor(Math.random() * 3); // 8-10 hours
  const life = Math.min(24 - work, Math.floor(Math.random() * 8)); // Remaining hours, max 8 for life
  return {
    work,
    life,
    timestamp: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
  };
});
