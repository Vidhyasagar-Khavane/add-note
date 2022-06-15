import React from "react";
import "./CourseGoalList.css";
import CourseGoalItem from "../CourseGoalItem/CourseGoalItem";

const CourseGoalList = (props) => {
  // console.log(props.Items);
  return (
    <ul className="goal-list">
      {props.Items.map((goal) => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          onDelete={props.onDeleteItem}
        >
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
};
export default CourseGoalList;
