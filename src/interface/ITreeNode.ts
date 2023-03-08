export interface ITreeNode {
    id: number | string;
    name: string;
    children?: ITreeNode[];
  }