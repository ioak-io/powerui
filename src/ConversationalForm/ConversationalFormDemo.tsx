import React, { useRef, useState } from 'react';
import ConversationalForm from '.';
import { FormFieldSchema, FormSchema } from '../types/uispec.types';
import './ConversationalFormDemo.css';
import { Button, IconButton, SvgIcon, ThemeType } from 'basicui';

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

  const actions = <>
    <Button theme={ThemeType.primary} onClick={() => { }}>
      <SvgIcon height="16px" width="16px">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
      </SvgIcon>
      Save
    </Button>
    <IconButton onClick={() => { }}>
      <SvgIcon height="16px" width="16px">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.7 256L345.6 153.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L197.3 210.7 94.6 108.1c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L152.7 256 49.4 359.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L197.3 301.3l102.7 102.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L242.7 256z" /></svg>
      </SvgIcon>
    </IconButton>
    <IconButton onClick={() => { }}>
      <SvgIcon height="16px" width="16px">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
      </SvgIcon>
    </IconButton>
  </>

  return (
    <div className="conversational-form-demo">
      <ConversationalForm
        formData={formData}
        onChange={handleChange}
        schema={schema}
        actions={actions}
      // mode="create"
      //   formData={formData}
      //   onChange={handleChange}
      //   schema={schema} onSubmit={(e) => { console.log(e) }} 
      />
    </div>
  );
};

export default ConversationalFormDemo;