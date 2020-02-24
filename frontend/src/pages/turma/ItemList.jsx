import "./ItemList.css";
import React from "react";

import Grid from "../../common/layout/Grid";
import Item from "./Item";

const ItemList = ({ list = [], legend, cols, readOnly, field }) => {
  function renderRows() {
    return list.map((item, index) => (
      <tr key={index}>
        <Item
          index={index}
          item={item}
          list={list}
          field={field}
          readOnly={readOnly}
        />
      </tr>
    ));
  }

  return (
    <Grid cols={cols}>
      <fieldset>
        <legend>{legend}</legend>
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="table-actions">Data Nascimento</th>
              <th className="table-actions">Status</th>
              <th className="table-actions">Ações</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </fieldset>
    </Grid>
  );
};

export default ItemList;
