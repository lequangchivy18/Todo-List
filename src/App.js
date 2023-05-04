import {
  InputGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./App.css";
import { TfiClose } from "react-icons/tfi";
import { IoAdd, IoSaveOutline } from "react-icons/io5";
import { HiPencil } from "react-icons/hi";
import { useState } from "react";

function App() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);

  const [stateItems, setStateItems] = useState([]);

  const [editItem, setEditItem] = useState(false);
  const handleSubmit = () => {
    setJobs((prev) => [...prev, job]);
    setJob("");
    setEditItem(false);
    [...jobs].forEach((o) => {
      console.log(o);
    });
  };

  const handleDelete = (indexRemove) => {
    // console.log(indexRemove)
    //[...jobs] = jobs
    const removeArr = jobs.filter((job, index) => {
      return index !== indexRemove;
    });
    // console.log("arr: "+removeArr)
    setJobs(removeArr);
  };

  const handleEdit = (indexEdit) => {
    const editJob = jobs.filter((job, index) => {
      // console.log(index);
      return index === indexEdit;
    });
    const notEditJobs = jobs.filter((job, index) => {
      return index !== indexEdit;
    });
    setJob(editJob);
    setJobs(notEditJobs, job);
    setEditItem(true);
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && job) {
      handleSubmit();
    }
  };

  const setCompleted = (ItemIndex) => {
    setStateItems((prev) => {
      const isChecked = stateItems.includes(ItemIndex);
      if (isChecked) {
        return stateItems.filter((index) => index !== ItemIndex);
      } else {
        return [...prev, ItemIndex];
      }
    });
    console.log(stateItems);
  };

  return (
    <div
      className="container border col-4 shadow mt-1"
      style={{ height: "500px", padding: 0 }}
    >
      <InputGroup className="card-header" style={{ gap: "10px" }}>
        <Input
          style={{ height: "42px" }}
          value={job}
          onKeyDown={handleKeyUp}
          onChange={(e) => {
            if (e.target.value) {
              setJob(e.target.value);
            }
          }}
        />
        <Button
          color="primary"
          onClick={handleSubmit}
          className="rounded-circle"
          style={{ height: "42px" }}
          outline
        >
          {editItem ? (
            <IoSaveOutline style={{ marginBottom: "4" }}></IoSaveOutline>
          ) : (
            <IoAdd style={{ marginBottom: "4" }}></IoAdd>
          )}
        </Button>
      </InputGroup>
      <ListGroup
        className="card-body"
        style={{
          padding: "20px",
          gap: "10px",
          height: "87%",
          overflowY: "auto",
        }}
      >
        {jobs.map(
          (job, index) =>
            job && (
              stateItems.includes(index)?
              (<ListGroupItem
                onClick={() => {
                  setCompleted(index);
                }}
                key={index}
                className="d-flex justify-content-between align-items-center border border-success"
              >
                {job + " (completed)"}
                <div className="group-icon">
                  {!editItem && (
                    <HiPencil
                      onClick={() => {
                        handleEdit(index);
                      }}
                    ></HiPencil>
                  )}{" "}
                  <TfiClose
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></TfiClose>
                </div>
              </ListGroupItem>)
              :
              (<ListGroupItem
                onClick={() => {
                  setCompleted(index);
                }}
                key={index}
                className="d-flex justify-content-between align-items-center border border-primary"
              >
                {job}
                <div className="group-icon">
                  {!editItem && (
                    <HiPencil
                      onClick={() => {
                        handleEdit(index);
                      }}
                    ></HiPencil>
                  )}{" "}
                  <TfiClose
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></TfiClose>
                </div>
              </ListGroupItem>)
              
            )
        )}
      </ListGroup>
    </div>
  );
}

export default App;
