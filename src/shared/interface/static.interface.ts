interface about {
  placeholder : string,
  link : string 
}

export interface Usage {
  title : string;
  params : string[]
}

export interface IstaticData {
  title: string;
  description: string;
  stack: string[];
  img : string
  details: {
    introduce: string;
    params: string;
    about: about[]
  };
}
