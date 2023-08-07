import React from "react";
import Footer from "../../../conponent/Footer";
import Header from "../../../conponent/Header";
import Section from "../../../conponent/Section";
import ListProduct from "../../../conponent/ListProduct";

type Props = {};

const ListPoduct = (props: Props) => {
  return (
    <div className="font-poppins text-dark text-sm leading-loose">
  
      <ListProduct/>
    </div>
  );
};

export default ListPoduct;
