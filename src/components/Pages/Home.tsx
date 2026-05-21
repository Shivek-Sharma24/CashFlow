import React from "react";
import SummaryCard from "./SummaryCard";
import { FilterBar } from "./FilterBar";
import AddExpense from "./AddExpense";
import DemoChart from "./DemoChart";
import ExpenseList from "./Expenselisttwo";


const Home = () => {
  return (
    <div className="bg-zinc-900">
      <SummaryCard />
      <br />
      <DemoChart/>
      <br />
      <FilterBar />
      <AddExpense/>
           <br />
    <ExpenseList/>
    </div>
       
  );
};

export default React.memo(Home);
