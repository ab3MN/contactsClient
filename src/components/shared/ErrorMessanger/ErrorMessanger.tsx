import React, { FC } from 'react';

type Error = {
  message: string;
};

const ErrorMessanger: FC<Error> = ({ message }) => {
  return (
    <>
      {setTimeout(
        () => (
          <div className="error--messanger">
            <h5 className="error--messanger__text">{message}</h5>
          </div>
        ),
        2000,
      )}
    </>
  );
};

export default ErrorMessanger;
