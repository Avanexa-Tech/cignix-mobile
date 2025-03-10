import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import serverApis from "@/api/serverApis";
import { apis } from "@/utils/Constants";
import { toast } from "react-toastify";

const Exercise = ({ exercise }) => {

  const [points, setPoints] = useState([]);

  const handleChange = (pointIndex, item, option) => {
    const updatedPoints = [...points];
    if (pointIndex > -1) {
      updatedPoints[pointIndex] = { question_id: item._id, point: option.point };
    } else {
      updatedPoints.push({ question_id: item._id, point: option.point });
    }
    setPoints(updatedPoints);
  };

  const handleCheckboxChange = (pointIndex, item, option) => {
    const updatedPoints = [...points];
    if (pointIndex > -1) {
      const selectedOptions = updatedPoints[pointIndex].selectedOptions || [];
      if (selectedOptions.includes(option.value)) {
        updatedPoints[pointIndex].selectedOptions = selectedOptions.filter((val) => val !== option.value);
      } else {
        updatedPoints[pointIndex].selectedOptions = [...selectedOptions, option.value];
      }
    } else {
      updatedPoints.push({
        question_id: item._id,
        selectedOptions: [option.value],
      });
    }
    setPoints(updatedPoints);
  };

  const handleTextChange = (pointIndex, item, value) => {
    console.log(item, value);
    
    const updatedPoints = [...points];
    if (pointIndex > -1) {
      updatedPoints[pointIndex] = { question_id: item._id, text: value };
    } else {
      updatedPoints.push({ question_id: item._id, text: value });
    }
    setPoints(updatedPoints);
  };

  const handleSubmit = async () => {
    const payload = {
      exercise: exercise[0]?.route,
      answers: [ ...points ],
    };

    try {
        const response = await serverApis.exerciseAnswers(apis.SUBMIT_EXERCISES, payload);
      if (response.success) {
          toast.success(response.message, {
            position: "top-center",
          });
        }
  
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <div
        className=" flex justify-between flex-col w-full rounded-md max-h-[500px] overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {exercise?.length &&
          exercise.map((item, index) => {
            switch (item.question_type) {
              case "radio":
                return (
                  <div className="flex flex-col p-4 gap-4 " key={index}>
                    <p className="text-sm md:text-base lg:text-lg font-medium">
                      {index + 1}. {item.question}
                    </p>
                    <div className="flex gap-1 items-center ">
                      <span className="text-xs select-none">Strongly Disagree</span>
                      <RadioGroup
                        className="flex flex-wrap gap-3 max-md:justify-center"
                        value={points.find((i) => i.question_id === item._id)?.point || ""}
                      >
                        {item.options.map((option) => {
                          const pointIndex = points.findIndex((i) => i.question_id === item._id);
                          return (
                            <div
                              className="flex items-center space-x-2 border border-gray-400 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-100 min-md:justify-center"
                              key={option.value}
                              onClick={() => handleChange(pointIndex, item, option)}
                            >
                              <RadioGroupItem
                                checked={points[pointIndex]?.point === option.point}
                                value={option.point}
                                id={option.value}
                              />
                              <Label htmlFor={option.value} className="text-xs md:text-sm select-none">
                                {option.value}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                      <span className="text-xs select-none">Strongly Agree</span>
                    </div>
                  </div>
                );

              case "checkbox":
                return (
                  <div className="flex flex-col p-4 gap-4 " key={index}>
                    <p className="text-sm md:text-base lg:text-lg font-medium">
                      {index + 1}. {item.question}
                    </p>
                    <div className="flex flex-wrap gap-3 max-md:justify-center">
                      {item.options.map((option) => {
                        const pointIndex = points.findIndex((i) => i.question_id === item._id);
                        const isChecked = points[pointIndex]?.selectedOptions?.includes(option.value);

                        return (
                          <div
                            className="flex items-center space-x-2 border border-gray-400 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-100"
                            key={option.value}
                            onClick={() => handleCheckboxChange(pointIndex, item, option)}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked || false}
                              id={option.value}
                              onChange={() => handleCheckboxChange(pointIndex, item, option)}
                            />
                            <Label htmlFor={option.value} className="text-xs md:text-sm select-none">
                              {option.value}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );

              case "textarea":
                return (
                  <div className="flex flex-col p-4 gap-4" key={index}>
                    <p className="text-sm md:text-base lg:text-lg font-medium">
                      {index + 1}. {item.question}
                    </p>
                    <div className="flex flex-col gap-3">
                      <textarea
                        placeholder="Enter your answer here"
                        style={{ scrollbarWidth: "none" }}
                        className="border border-gray-400 p-4 min-h-[150px] focus:outline-none rounded-lg"
                        onChange={(e) => handleTextChange(index, item, e.target.value)}
                      />
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
      </div>
      <div className="self-end mt-6">
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Submit
        </button>
      </div>
    </>
  );
};

export default Exercise;