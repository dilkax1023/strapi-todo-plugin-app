import React, { useState } from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";
import { Select, Option } from '@strapi/design-system/Select';
import { Switch } from '@strapi/design-system/Switch';
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import axiosInstance from "../utils/axiosInstance";

const CreateTaskModal = ({ handleClose, refetchTasks }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState();
  const [values, setValues] = useState([]);
  const [segs, setSegs] = useState([]);
  const [movs, setMovs] = useState([]);
  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState();

  const { slug, initialData } = useCMEditViewDataManager();

  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      // Show loading state
      setStatus("loading");

      // Create task and link it to the related entry
      const taskRes = await axiosInstance.post(
        "/content-manager/collection-types/plugin::todo.task",
        {
          name,
          isDone: false,
          related: {
            __type: slug,
            id: initialData.id,
          },
        }
      );

      // Refetch tasks list so it includes the created one
      await refetchTasks();

      // Remove loading and close popup
      setStatus("success");
      handleClose();
    } catch (e) {
      setStatus("error");
    }
  };

  const getError = () => {
    // Form validation error
    if (name.length > 40) {
      return "Content is too long";
    }
    // API error
    if (status === "error") {
      return "Could not create todo";
    }
    return null;
  };

  return (
    <ModalLayout
      onClose={handleClose}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add todo
        </Typography>
      </ModalHeader>
      <ModalBody>
        <TextInput
          placeholder="What do you need to do?"
          label="Name"
          name="text"
          hint="Max 140 characters"
          error={getError()}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Select style={{margin: "2rem 0"}} id="select1" label="Typologie d'utilisateur" placeholder="Typologie d'utilisateur" onClear={() => setValues([])} hint="Description line" clearLabel="Clear" value={values} onChange={setValues} customizeContent={values => `${values.length} currently selected`} multi withTags>
            <Option value={'Pharmaciens titulaires'}>Pharmaciens titulaires</Option>
            <Option value={"Membres d'équipe officinal"}>Membres d'équipe officinal</Option>
            <Option value={'bagel'}>Comptes Démo</Option>
          </Select>

        <Select style={{margin: "2rem 0"}} id="select2" label="Segmentation" placeholder="Segmentation" onClear={() => setSegs([])} hint="Description line" clearLabel="Clear" value={segs} onChange={setSegs}  customizeContent={values => `${values.length} currently selected`} multi withTags>
          <Option value={'Ivoire'}>Ivoire</Option>
          <Option value={'Platine'}>Platine</Option>
          <Option value={'Or'}>Or</Option>
          <Option value={'Bleu'}>Bleu</Option>
        </Select>

          {segs.length > 0 && <Select style={{margin: "2rem 0"}} id="select3" label="Mouvement" placeholder="Mouvement" onClear={() => setMovs([])} hint="Description line" clearLabel="Clear" value={movs} onChange={setMovs}  customizeContent={values => `${values.length} currently selected`} multi withTags>
            <Option value={'Ajouter Gain'}>Ivoire</Option>
            <Option value={'Retirer Perte'}>Platine</Option>
          </Select>}

          {/* <Switch label="Activate the microphone" selected={false} onChange={() => setChecked(s => !s)} visibleLabels /> */}

          {/* <div style={{margin: "20px"}}>
            <button  onClick={() => toggleError(s => s ? undefined : 'An error occured')}>Show the error state</button>
            <button onClick={() => toggleDisabled(s => !s)}>Show the disabled state</button>
          </div> */}
          
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={handleClose} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <Button type="submit" loading={status === "loading"}>
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default CreateTaskModal;
