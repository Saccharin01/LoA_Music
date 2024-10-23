
interface about {
  placeholder : string,
  link : string 
}

export interface IstaticData {
  title: string;
  description: string;
  stack: string[];
  img : string
  details: {
    introduce: string;
    about: about[]
  };
}
