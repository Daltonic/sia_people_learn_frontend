import { Rating, Box } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  value: number;
  handleChange: Dispatch<SetStateAction<number>>;
  size?: "small" | "medium" | "large";
}

const CreateRating: React.FC<Props> = ({ value, handleChange, size }) => {
  return (
    <>
      <Box alignContent="start" borderColor="transparent">
        <Rating
          value={value}
          name="rating"
          onChange={(event, newValue) => {
            handleChange(newValue || 4);
          }}
          size={size || "small"}
        />
      </Box>
    </>
  );
};

const ViewRating: React.FC<{
  value: number;
  size?: "small" | "medium" | "large";
}> = ({ value, size }) => {
  return (
    <>
      <Box alignContent="start" borderColor="transparent">
        <Rating
          value={value}
          name="rating"
          readOnly={true}
          size={size || "small"}
        />
      </Box>
    </>
  );
};

export { CreateRating, ViewRating };
