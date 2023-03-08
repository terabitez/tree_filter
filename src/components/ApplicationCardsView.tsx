import React from "react";

interface ApplicationCardProps {
  name: string;
  spend: number;
}

const ApplicationCardView: React.FC<ApplicationCardProps> = ({
  name,
  spend,
}) => {
  return (
    <div className="card responsive-div">
      <div className="header">
        <h5>{name}</h5>
      </div>

      <div className="container">
        <p>Total Spend: {spend}</p>
      </div>
    </div>
  );
};

export default ApplicationCardView;
