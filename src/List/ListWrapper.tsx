import React, { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem";

/**
 * Component to render drop down input form element. Supports multi select and auto complete features
 */

import { customAlphabet } from 'nanoid';
import { ListSchema } from "../types/uispec.types";
import List from ".";

const alphanumericAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphanumericAlphabet, 8);

export const listSchema: ListSchema = {
    "header": {
        title: { type: "static", value: "List renderer" },
        subtitle: { type: "static", value: "Lorem ipsum dolor sit...." }
    },
    "fields": [
        {
            name: "name",
            type: "text",
            label: "Name"
        },
        {
            name: "content",
            type: "textarea",
            label: "Content"
        },
        {
            name: "labels",
            type: "tag",
            label: "Tags"
        }
    ]
}

const EXAMPLE_DATA: any[] = [
    {
        "id": "680a1f49a59d01329a1e0237",
        "reference": "fP9ntqw7",
        "createdBy": "653603227833a800175f1ea2",
        "createdAt": "2025-04-24T11:23:53.258Z",
        "updatedBy": "653603227833a800175f1ea2",
        "updatedAt": "2025-04-24T11:23:53.258Z",
        "name": "Into the water puddle",
        "content": "<p>all new changesbgfh</p>",
        "labels": [{
            id: "aCwRYuw8", value: "lorem"
        }, {
            id: "aCwRYuw9", value: "dolor"
        }
        ]
    },
    {
        "id": "68107bc9c01934a898d61751",
        "reference": "WjgUkPuk",
        "createdBy": "653603227833a800175f1ea2",
        "createdAt": "2025-04-29T07:12:09.629Z",
        "updatedBy": "653603227833a800175f1ea2",
        "updatedAt": "2025-04-29T07:12:09.629Z",
        "name": "Scene No 1",
        "content": "<p>auto</p>",
        "labels": []
    },
    {
        "id": "68107bdbc01934a898d6175a",
        "reference": "tTN3WymX",
        "createdBy": "653603227833a800175f1ea2",
        "createdAt": "2025-04-29T07:12:27.407Z",
        "updatedBy": "653603227833a800175f1ea2",
        "updatedAt": "2025-04-29T07:12:27.407Z",
        "name": "Scene No 2",
        "content": "<p>Linda rushes off to meet Johnny and the Potters to go on holiday.  A telegram arrives informing them that Julia has turned him down.  Seeing her while in midhandspring Johnny falls on his stomach rather than finishing.  They discuss hiring servants to work in Julia and Johnnys new home which he also just finds out about.  The group spends a joyful time together and Julia and Edward Sr.  Hoping to patch things up between Johnny and Julia Linda visits the Potters and finds them packing for a voyage to Europe.  Johnny is doing a back flip in the ships hallway when Linda arrives.  On New Years Eve upset that she did not get to throw the engagement party she was promised Linda refuses to come downstairs.</p>",
        "labels": []
    },
    {
        "id": "68107be2c01934a898d61763",
        "reference": "yfvmOB6L",
        "createdBy": "653603227833a800175f1ea2",
        "createdAt": "2025-04-29T07:12:34.391Z",
        "updatedBy": "653603227833a800175f1ea2",
        "updatedAt": "2025-04-29T07:12:34.391Z",
        "name": "fdhgg",
        "content": "<p>gfjhdgj</p>",
        "labels": []
    },
    {
        "id": "6818b2f1963da8ed49d41c67",
        "reference": "biI1KDAy",
        "createdBy": "653603227833a800175f1ea2",
        "createdAt": "2025-05-05T12:45:37.981Z",
        "updatedBy": "653603227833a800175f1ea2",
        "updatedAt": "2025-05-05T12:45:37.981Z",
        "name": "Linda rushes off to meet Johnny v2",
        "content": "<p>Linda rushes off to meet Johnny and the Potters to go on holiday. Meanwhile the Potters arrive at the ship saddened that Johnny had decided to take the job at the bank. They tell her that Johnny is planning to go as well and that he has asked Julia to go with them. Johnny surprises them and explains that he couldnt go through with it and they cheerfully celebrate. As she greets the three of them Johnny takes her hand pulls her to the floor and they kiss. Then Johnny meets Julias vivacious elder sister Linda Katharine Hepburn to whom he confides his plan to take a long holiday from work to find the meaning of life. s plan wont work that marrying Julia on these terms will be more of an encumbrance on his freedom than he can abide. They discuss hiring servants to work in Julia and Johnnys new home which he also just finds out about. Johnny surprises them and explains that he could not go through with it and they cheerfully celebrate.</p>",
        "labels": []
    },
    {
        "id": "682c5659eb35d3f23564fd62",
        "reference": "DKScBUdZ",
        "createdBy": "653603227833a800175f1ea2",
        "createdAt": "2025-05-20T10:15:53.360Z",
        "updatedBy": "653603227833a800175f1ea2",
        "updatedAt": "2025-05-20T10:15:53.360Z",
        "name": "fdgdsfg",
        "content": "<p>fgdfdfgsfg</p>",
        "labels": []
    }
];

const EXAMPLE_DATA_OWN_CHILDREN_RENDER: Record<string, any>[] = [
    {
        "id": "11",
        "category": "Thriller",
        "summary": "In the heart of Berlin, a journalist uncovers a conspiracy that dates back to the Cold War. As she races to publish the truth, powerful enemies close in—and one mistake could cost her everything.",
        "title": "Echoes of Silence",
        "labels": [
            { "id": "1", "value": "Espionage" },
            { "id": "2", "value": "Suspense" }
        ],
        "createdAt": "2025-04-16T12:05:00Z"
    },
    {
        "id": "1",
        "category": "Fantasy",
        "summary": "A cursed prince and a runaway witch form an unlikely alliance to break a centuries-old enchantment. Their quest leads them through enchanted forests, forgotten ruins, and a truth neither of them is ready to face.",
        "title": "Thorns and Flames",
        "labels": [
            { "id": "1", "value": "Witchcraft" },
            { "id": "2", "value": "Quest" }
        ],
        "createdAt": "2025-04-15T17:22:00Z"
    },
    {
        "id": "13",
        "category": "Science",
        "summary": "With climate change accelerating, this book explores the latest scientific breakthroughs in renewable energy, carbon capture, and sustainable living. It’s a call to action wrapped in data, innovation, and hope.",
        "title": "The Tipping Point",
        "labels": [
            { "id": "1", "value": "Environment" },
            { "id": "2", "value": "Innovation" },
            { "id": "3", "value": "Future" }
        ],
        "createdAt": "2025-04-14T14:18:00Z"
    },
    {
        "id": "14",
        "category": "Romance",
        "summary": "After a bitter divorce, a woman retreats to a sleepy coastal town to rebuild her life. There, she meets a widowed fisherman with secrets of his own, and together they find love in the most unexpected season.",
        "title": "Low Tide Hearts",
        "labels": [
            { "id": "1", "value": "Healing" },
            { "id": "2", "value": "New Beginnings" }
        ],
        "createdAt": "2025-04-13T08:35:00Z"
    },
    {
        "id": "15",
        "category": "Horror",
        "summary": "A group of friends rent an isolated cabin for the weekend, only to discover a sinister force trapped beneath the floorboards. As night falls, the line between dreams and reality begins to blur.",
        "title": "The Hollow Below",
        "labels": [
            { "id": "1", "value": "Supernatural" },
            { "id": "2", "value": "Survival" }
        ],
        "createdAt": "2025-04-12T20:10:00Z"
    },
    {
        "id": "16",
        "category": "Biography",
        "summary": "Chronicling the remarkable journey of a Nobel Prize-winning doctor, this biography captures the heart and mind of a pioneer whose work in immunology changed the world—and whose compassion touched millions.",
        "title": "Pulse of a Healer",
        "labels": [],
        "createdAt": "2025-04-11T10:50:00Z"
    },
    {
        "id": "17",
        "category": "Fiction",
        "summary": "In a near-future city plagued by surveillance, a rebellious graffiti artist sparks a revolution with nothing but a spray can and a secret past. The story unfolds in vibrant colors against a backdrop of gray conformity.",
        "title": "Tagged",
        "labels": [
            { "id": "1", "value": "Dystopia" },
            { "id": "2", "value": "Rebellion" },
            { "id": "3", "value": "Art" }
        ],
        "createdAt": "2025-04-10T13:27:00Z"
    },
    {
        "id": "18",
        "category": "Non-Fiction",
        "summary": "This deeply personal narrative examines the intersection of identity, culture, and belonging in a globalized world. Told through essays and stories, it offers a heartfelt exploration of home and displacement.",
        "title": "Where I Begin",
        "labels": [
            { "id": "1", "value": "Memoir" }
        ],
        "createdAt": "2025-04-09T15:05:00Z"
    },
    {
        "id": "19",
        "category": "History",
        "summary": "Through newly discovered letters and documents, this book re-examines the fall of the Roman Republic. It challenges long-held assumptions and paints a vivid portrait of power, betrayal, and legacy.",
        "title": "Twilight of the Senate",
        "labels": [
            { "id": "1", "value": "Ancient Rome" },
            { "id": "2", "value": "Politics" }
        ],
        "createdAt": "2025-04-08T11:48:00Z"
    },
    {
        "id": "20",
        "category": "Technology",
        "summary": "Blending science and storytelling, this book explores how the next wave of innovation—quantum computing—will redefine everything from healthcare to national security. It’s a glimpse into a future that's arriving faster than we think.",
        "title": "The Quantum Horizon",
        "labels": [
            { "id": "1", "value": "Tech" },
            { "id": "2", "value": "Quantum" }
        ],
        "createdAt": "2025-04-07T09:33:00Z"
    }
];

const ListWrapper = (props: {
    renderFromChildren: boolean;
    showSelectOnRight: boolean;
    showCollapse: boolean;
}) => {
    const [childrenELements, setChildrenELements] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleClick = (event: any) => {
        console.log(event);
    }

    const handleSelect = (event: any) => {
        const { name, checked } = event.currentTarget;
        setSelectedItems(prev => {
            if (checked) {
                return prev.includes(name) ? prev : [...prev, name];
            } else {
                return prev.filter(item => item !== name);
            }
        });
    }

    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    return (
        <div style={{ padding: "24px" }}>
            <List
                listSchema={listSchema}
                data={EXAMPLE_DATA}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}

            // onClick={handleClick}
            // selectedItems={selectedItems}
            // onSelect={handleSelect}
            // showSelectOnRight={props.showSelectOnRight}
            // showCollapse={props.showCollapse}
            />
        </div>
    );
};

export default ListWrapper;