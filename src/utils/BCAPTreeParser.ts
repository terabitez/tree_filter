import { ITreeNode } from "../interface/ITreeNode";

export function parseBCAP(data: []) {
  try {
    const treeList: ITreeNode[] = [];

    data.forEach((item) => {
      let bcap1 = treeList.find((node) => node.name === item["BCAP1"]);

      if (!bcap1) {
        bcap1 = {
          id: (item["BCAP1"] as String).slice(20),
          name: item["BCAP1"],
          children: [],
        };
        treeList.push(bcap1);
      }

      let bcap2 = bcap1.children
        ? bcap1.children.find((node) => node.name === item["BCAP2"])
        : null;

      if (!bcap2) {
        bcap2 = {
          id: (item["BCAP2"] as String).slice(20),
          name: item["BCAP2"],
          children: [],
        };

        if (bcap1.children) bcap1.children.push(bcap2);
      }

      let bcap3 = bcap2.children
        ? bcap2.children.find((node) => node.name === item["BCAP3"])
        : null;

      if (!bcap3) {
        bcap3 = {
          id: (item["BCAP3"] as String).slice(20),
          name: item["BCAP3"],
        };

        if (bcap2.children) bcap2.children.push(bcap3);
      }
    });

    //sort
    const sortBcaps = (capabilities: ITreeNode[]): ITreeNode[] => {
      capabilities.sort((a, b) => a.name.localeCompare(b.name));
      capabilities.forEach((capability) => {
        if (capability.children) {
          capability.children = sortBcaps(capability.children);
        }
      });
      return capabilities;
    };

    const sortedCapabilities: ITreeNode[] = sortBcaps(treeList);

    return sortedCapabilities;
  } catch (error) {
    console.error(error);
  }
}
