import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
const App = () => {
  // const dummy_goals = [
  //   { text: "Do all exercises!", id: "g1" },
  //   { text: "Finish the course!", id: "g2" },
  // ];
  const [courseGoals, setCourseGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch From API
  const courseGoalFetchAPIHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-add-goal-project-default-rtdb.firebaseio.com/goals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      let loadedCourseGoal = [];
      for (const key in data) {
        loadedCourseGoal.unshift({
          id: key,
          text: data[key].text,
        });
      }
      setCourseGoals(loadedCourseGoal);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    courseGoalFetchAPIHandler();
  }, [courseGoalFetchAPIHandler]);

  //Add data to API
  const addCourseGoalAPIHandler = async (enteredText) => {
    const response = await fetch(
      "https://react-add-goal-project-default-rtdb.firebaseio.com/goals.json",
      {
        method: "POST",
        body: JSON.stringify(enteredText),
        headers: { "Content-Type": "application/json" },
      }
    );

    await response.json();
    courseGoalFetchAPIHandler();

    // setCourseGoals((prevGoal) => {
    //   const updatedGoals = [...courseGoals];
    //   updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });

    //   console.log(updatedGoals);
    //   return updatedGoals;
    // });
  };

  const deleteItemhandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };
  // Check if there is no goals
  let content = <h2>No goals, add goal again</h2>;

  if (!isLoading) {
    content = (
      <CourseGoalList Items={courseGoals} onDeleteItem={deleteItemhandler} />
    );
  }
  if (courseGoals.length === 0) {
    content = <h2>No goals, add goal again</h2>;
  }
  if (isLoading) {
    content = <h2>Loading....</h2>;
  }

  if (error) {
    content = <h2>{error}</h2>;
  }
  // onFetchCourseGoal={courseGoalFetchAPIHandler}

  return (
    <div>
      <section className="goal-form">
        <CourseInput onAddCourseGoal={addCourseGoalAPIHandler} />
      </section>
      <section className="goals">{content}</section>
    </div>
  );
};

export default App;
