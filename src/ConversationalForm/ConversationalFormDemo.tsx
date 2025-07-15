import React, { useRef, useState } from 'react';
import ConversationalForm from '.';
import { FormFieldSchema, FormSchema } from '../types/uispec.types';
import './ConversationalFormDemo.css';

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

const labelField: FormFieldSchema = {
  name: "labels",
  type: "tag",
  label: "Labels",
  placeholder: "placeholder for labels",
  validation: {
    required: true,
    minLength: 2,
  },
  conversationalPrompt: "Tag to labels",
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
      multiple: true,
      options: [
        { label: "USA", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "UK", value: "uk" },
        { label: "Canada", value: "ca" },
        { label: "UK", value: "uk" },
      ],
      conversationalPrompt: "Which country is this address in?",
    },
    {
      name: "timezone",
      type: "group",
      label: "Timezone",
      fields: [

        {
          name: "utc",
          type: "text",
          label: "UTC value",
          conversationalPrompt: "What's the value of UTC?",
        },
        {
          name: "format",
          type: "text",
          label: "AM/PM",
          conversationalPrompt: "Do you follow a 24 hour format or 12 hour format?",
        },
        {
          name: "holiday",
          type: "array",
          label: "Holiday",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Holiday name",
              conversationalPrompt: "What is the name of the holiday?",
            },
            {
              name: "halfday",
              type: "text",
              label: "Half or full day",
              conversationalPrompt: "Is it a half day?",
            }
          ]
        }
      ]
    }
  ]
}

const productSchema: FormFieldSchema = {
  name: "product",
  type: "group",
  label: "Product",
  conversationalPrompt: "Product prompt",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Product name",
      conversationalPrompt: "What's the name of this product?",
    },
    {
      name: "link",
      type: "text",
      label: "URL",
      conversationalPrompt: "Do you have a product link? Provide the product link to do the connection.",
    },
    {
      name: "groupTest",
      type: "group",
      label: "Group test",
      conversationalPrompt: "Group test prompt",
      fields: [
        {
          name: "objone",
          type: "text",
          conversationalPrompt: "object one prompt",
          label: "Object one"
        },
        {
          name: "objtwo",
          type: "text",
          conversationalPrompt: "object two prompt",
          label: "Object two"
        }
      ]
    }
  ]
}

const schema: FormSchema = {
  fields: [
    genderField, labelField, productSchema, contentSchema, addressSchema, ageField, userNameField
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
  const [formData, setFormData] = useState<Record<string, any>>({
    age: 20,
    addresses: [
      { street: "lorem ipsum" }
    ],
    labels: [
      {
        value: "lorem",
        id: "1",
      },
      {
        value: "ipsum",
        id: 2,
      },
      {
        value: "dolor"
      }
    ]
  });
  const handleChange = (_formData: Record<string, any>) => {
    console.log(_formData);
    setFormData(_formData);
  }

  return (
    <div className="conversational-form-demo">
      <ConversationalForm
        formData={formData}
        onChange={handleChange}
        schema={schema}
        onSubmit={() => { }}
        onCancel={() => { }}
        onReset={() => { }}

      // mode="create"
      //   formData={formData}
      //   onChange={handleChange}
      //   schema={schema} onSubmit={(e) => { console.log(e) }} 
      />
    </div>
  );
};

export default ConversationalFormDemo;