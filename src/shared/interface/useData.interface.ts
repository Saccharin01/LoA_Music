import { IMusicDataFormat } from "@/shared/IDataFormat";

export interface DataContextType {
  data: IMusicDataFormat[];
  setData: (data: IMusicDataFormat[]) => void;
  loading: boolean;
  error: string | null;
}