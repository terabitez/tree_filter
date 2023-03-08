import React, { useContext } from "react";
import { ActionType } from "../constants/ActionType";
import { FilterContext } from "../context/FilterContext";
import { ITreeNode } from "../interface/ITreeNode";

interface TreeProps {
  data: ITreeNode[];
}

const TreeView: React.FC<TreeProps> = ({ data }) => {
  const { filterState, filterDispatch } = useContext(FilterContext);

  const toggle = (event: React.MouseEvent<HTMLSpanElement>) => {
    const target: HTMLLIElement = event.currentTarget
      .parentElement as HTMLLIElement;

    filterDispatch({
      type: ActionType.SET_SELECTED_BCAP,
      payload: { bcapName: target.title, rangeMax: filterState.rangeMax },
    });

    let nested = target.querySelector(".nested") as HTMLUListElement;

    if (nested) {
      nested.classList.toggle("active");
      (event.target as HTMLSpanElement).classList.toggle("caret-down");
    }
  };

  const renderTree = (nodes: ITreeNode[]) => {
    return nodes.map((node) => (
      <li key={node.id} title={node.name}>
        <span className="caret" onClick={toggle}>
          {node.name}
        </span>
        {node.children && (
          <ul className="nested">{renderTree(node.children)}</ul>
        )}
      </li>
    ));
  };

  return <ul id="navigation">{renderTree(data)}</ul>;
};

export default TreeView;
