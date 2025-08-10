import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: { latitude: "", longitude: "" }
  },
  courses_offered: []
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_NESTED_FIELD":
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.field]: action.value
        }
      };

    case "SET_DEEP_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.value
            }
          }
        }
      };

    case "SET_COORDINATE":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.field]: action.value
          }
        }
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses_offered: [...state.courses_offered, action.value]
      };

    case "reset":
      return initialState;

    default:
      throw new Error("invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("College Data Submitted:", state);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add College</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="College Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "establishment_year",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({
              type: "SET_NESTED_FIELD",
              parent: "address",
              field: "building",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({
              type: "SET_NESTED_FIELD",
              parent: "address",
              field: "street",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="City Name"
          value={state.address.city.name}
          onChange={(e) =>
            dispatch({
              type: "SET_NESTED_FIELD",
              parent: "city",
              field: "name",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) =>
            dispatch({
              type: "SET_DEEP_FIELD",
              field: "pinCode",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) =>
            dispatch({
              type: "SET_DEEP_FIELD",
              field: "landmark",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({
              type: "SET_NESTED_FIELD",
              parent: "address",
              field: "state",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) =>
            dispatch({
              type: "SET_COORDINATE",
              field: "latitude",
              value: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) =>
            dispatch({
              type: "SET_COORDINATE",
              field: "longitude",
              value: e.target.value
            })
          }
        />

        <div>
          <input
            type="text"
            placeholder="Add Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (course.trim()) {
                dispatch({ type: "ADD_COURSE", value: course });
                setCourse("");
              }
            }}
          >
            Add Course
          </button>
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => dispatch({ type: "reset" })}>
            Reset
          </button>
        </div>
      </form>


      <div style={{ marginTop: "20px" }}>
        <h3>Current Form State:</h3>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
