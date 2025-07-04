import React, { useRef, useState } from 'react';
import ConversationalForm from '.';
import { FormFieldSchema, FormSchema } from '../types/FormSchemaTypes';
import './ConversationalFormDemo.css'

const userNameField: FormFieldSchema = {
  name: "fullName",
  type: "text",
  label: "Full Name",
  placeholder: "e.g., John Doe",
  validation: {
    required: true,
    minLength: 2,
  },
  conversationalPrompt: "What's your full name?",
};

const ageField: FormFieldSchema = {
  name: "age",
  type: "number",
  label: "Age",
  validation: {
    required: true,
    min: 0,
    max: 120,
  },
  placeholder: "e.g., 21",
  conversationalPrompt: "How old are you?"
};

const genderField: FormFieldSchema = {
  name: "gender",
  type: "select",
  label: "Gender",
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ],
  conversationalPrompt: "What’s your gender?",
};

const contentSchema: FormFieldSchema = {
  name: "content",
  type: "textarea",
  label: "Content",
  placeholder: "e.g., lorem ipsum dolor sit",
  conversationalPrompt: "Describe in detail your primary subject matter",
};

const addressSchema: FormFieldSchema = {
  name: "addresses",
  type: "array",
  label: "Addresses",
  conversationalPrompt: "Can you provide your address details?",
  fields: [
    {
      name: "street",
      type: "text",
      label: "Street",
      conversationalPrompt: "What's the street name?",
    },
    {
      name: "city",
      type: "text",
      label: "City",
      conversationalPrompt: "Which city is this in?",
    },
    {
      name: "country",
      type: "select",
      label: "Country",
      options: [
        { label: "USA", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "UK", value: "uk" },
      ],
      conversationalPrompt: "Which country is this address in?",
    }
  ]
}

const schema: FormSchema = {
  fields: [
    genderField, contentSchema, addressSchema, ageField, userNameField
  ]
}

const fragmentSchema: FormSchema = {
  fields: [
    {
      name: 'title',
      type: 'text',
      conversationalPrompt: 'What would you like to title this fragment?',
    },
    {
      name: 'description',
      type: 'textarea',
      conversationalPrompt: 'Can you describe it briefly?',
    },
    {
      name: 'labels',
      type: 'text',
      conversationalPrompt: 'Any labels to tag this with?',
    },
  ],
}


const ConversationalFormDemo = () => {
  return (
    <div className="conversational-form-demo">
      <ConversationalForm mode="create" schema={schema} onSubmit={(e) => { console.log(e) }} />
    </div>
  );
};

export default ConversationalFormDemo;