export interface ILocomotive {
  id: number,
  name: string,
  series: string,
  quantitySections: number,
  lat: number,
  lng: number,
}

export type ILocomotiveFormValues = Omit<ILocomotive, 'id'>;