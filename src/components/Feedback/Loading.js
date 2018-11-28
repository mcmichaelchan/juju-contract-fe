import React from "react";

const Loading = props => {
  if (props.error) {
    return (
      <div>
        加载错误! <button onClick={props.retry}>重新加载</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        服务器似乎没有响应... <button onClick={props.retry}>重新加载</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <div>加载中...</div>;
  } else {
    return null;
  }
};

export default Loading;
