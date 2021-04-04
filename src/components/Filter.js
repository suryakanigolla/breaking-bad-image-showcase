import React, { useEffect, useState } from "react";
import "./Filter.scss";

const Filter = ({ filters, onFilterChange }) => {
  const [filter, setFilter] = useState("");
  const [subFilter, setSubFilter] = useState("");

  useEffect(() => {
    onFilterChange(filter, subFilter);
  },[subFilter])

  const filterDrop = filters.map((item,index) => (
    <option value={item.filter} key={index+1}>{item.filter}</option>
  ));

  var subFilterList = [];
  for(var i = 0; i < filters.length; i++) {
      if (filters[i].filter === filter) {
          subFilterList = filters[i].subFilter;
      }
  }

  const subFilterDrop = subFilterList.map((item,index) => (
      <option value={item} key={index+1}>{item}</option>
  ))

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSubFilter("");
  }

  const handleSubFilterChange = (e) => {
      setSubFilter(e.target.value);
  }

  return (
    <div className="filter">
      <select onChange={(e) => handleFilterChange(e)} value={filter}>
        <option value="" key={0}>- - -</option>
        {filterDrop}
      </select>
      <select onChange={(e) => handleSubFilterChange(e)} value={subFilter}>
        <option value="" key={0}>- - -</option>
        {subFilterDrop}
      </select>
    </div>
  );
};

export default Filter;
