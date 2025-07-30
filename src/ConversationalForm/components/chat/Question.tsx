import React from 'react';
import './Question.css';
import { getClassName } from '../../../utils/ClassNameUtils';

export const BASE_CLASS = "powerui-cf-question";

export interface QuestionProps {
    title: string;
    subtitle?: string
}

const Question: React.FC<QuestionProps> = (props) => {

    return (
        <div className={BASE_CLASS}>
            <div className={getClassName(BASE_CLASS, ["title"])}>
                {props.title}
            </div>
            {props.subtitle && <div className={getClassName(BASE_CLASS, ["subtitle"])}>
                {props.subtitle}
            </div>}
        </div>
    )
};

export default Question;
