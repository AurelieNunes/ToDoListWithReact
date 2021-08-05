import React from 'react';
import classes from './Task.module.css';

function Task({ content, done, doneClicked, removedClicked }) {
  return (
    <div className={classes.task}>
      <Box
        className={classes.content}
        content={content}
        done={done}
        onClick={doneClicked}
        svg={
          <Svg
            onClick={removedClicked}
            path='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'
            pathTwo={
              done
                ? 'M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z'
                : undefined
            }
          />
        }
      />
      <Svg
        onClick={removedClicked}
        path='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
      />
    </div>
  );
}

const Svg = ({ onClick, path, pathTwo }) => (
  <svg
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    viewBox='0 0 16 16'
  >
    <path d={path} />
    {pathTwo !== undefined && <path d={pathTwo} />}
  </svg>
);

const Box = ({ className, onClick, content, svg, done }) => (
  <div className={className} onClick={onClick}>
    {svg}
    {done ? <strike>{content}</strike> : content}
  </div>
);

export default Task;
