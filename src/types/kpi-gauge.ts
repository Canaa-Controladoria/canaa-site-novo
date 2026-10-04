export interface KpiGaugeItem {
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  prefix?: string;
  minLabel: string;
  maxLabel: string;
}
