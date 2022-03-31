export interface SelectRestProps {
  id: string;

  defaultRest?: number;
  onSelect: (time: number) => void;
}
