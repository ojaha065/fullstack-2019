import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (<h1>{props.course}</h1>);
};

const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
        </div>
    );
};
const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>);
};

const Total = (props) => {
    //console.log(props.exercises[0]);
    return (<p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>);
};

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1,part2,part3]} />
            <Total exercises={[part1.exercises,part2.exercises,part3.exercises]} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));