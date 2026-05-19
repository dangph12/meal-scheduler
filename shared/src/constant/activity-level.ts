export enum ActivityLevel {
  MostlySedentary = 1.2,
  ModeratelyActive = 1.4,
  VeryActive = 1.6
}

export const ActivityLevelOptions = [
  {
    label: 'Số bước trung bình < 5.000 bước/ngày',
    value: ActivityLevel.MostlySedentary
  },
  {
    label: 'Số bước trung bình 5.000-10.000 bước/ngày',
    value: ActivityLevel.ModeratelyActive
  },
  {
    label: 'Số bước trung bình hơn 10.000 bước/ngày',
    value: ActivityLevel.VeryActive
  }
];
