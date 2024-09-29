export default interface DataFormat {
  _id: string;
  src: string;
  img: string;
  description : Description
}

export interface Description{
  headLine : string,
  mainScript : string
}