import React from "react";

const Header = ({courseName}) => {
    return (<h2>{courseName}</h2>);
};
const Content = ({parts}) => {
    const rows = parts.map((part) => {
        return (<Part key={part.id} name={part.name} exercises={part.exercises} />);
    });

        return (<div>{rows}</div>);
};
const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>);
};
const Total = ({parts}) => {
    const total = parts.reduce((accumulator,thisPart) => {
        return accumulator + thisPart.exercises;
    },0);
    //console.log(total);

    return (<p><strong>Number of exercises {total}</strong></p>);
};
  
const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;