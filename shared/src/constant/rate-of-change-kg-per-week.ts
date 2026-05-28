export enum RateOfChangeKgPerWeek {
  // 0, 0.25, 0.5, 0.75, 1
  Zero = 0,
  Quarter = 0.25,
  Half = 0.5,
  ThreeQuarter = 0.75,
  One = 1
}

export const RateOfChangeKgPerWeekOptions = [
  {
    label: '0 kg/tuần',
    value: RateOfChangeKgPerWeek.Zero
  },
  {
    label: '0.25 kg/tuần',
    value: RateOfChangeKgPerWeek.Quarter
  },
  {
    label: '0.5 kg/tuần',
    value: RateOfChangeKgPerWeek.Half
  },
  {
    label: '0.75 kg/tuần',
    value: RateOfChangeKgPerWeek.ThreeQuarter
  },
  {
    label: '1 kg/tuần',
    value: RateOfChangeKgPerWeek.One
  }
];
