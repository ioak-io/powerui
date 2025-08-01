import React, { useEffect, useRef, useState } from 'react';
import './MessageSection.css';
import { getClassName } from '../../../utils/ClassNameUtils';
import { SvgIcon } from 'basicui';
import { FieldValidation, FormFieldSchema } from "../../../types/uispec.types";
import { ValidationOutcome } from '../fields/ValidationUtils';

interface MessageSectionProps {
  errors: string[];
  validation: FieldValidation | undefined;
  validationOutcome: Record<string, ValidationOutcome>;
  passed: boolean;
  dirty: boolean;
}

const BASE_CLASS = "powerui-cf-messagesection";

const validationPriority = [ "required", "minLength", "maxLength", "pattern", "min", "max", "customValidator" ] as const;
type ValidationKey = typeof validationPriority[number];

function sortValidationMessages<T extends Record<string, any>>(
  validationOutcome: T
): string[] {
  return Object.keys(validationOutcome).sort((a, b) => {
    const indexA = validationPriority.indexOf(a as ValidationKey);
    const indexB = validationPriority.indexOf(b as ValidationKey);
    return (
      (indexA === -1 ? validationPriority.length : indexA) -
      (indexB === -1 ? validationPriority.length : indexB)
    );
  });
}

const MessageSection: React.FC<MessageSectionProps> = (props) => {
  const [fieldErrors, setFieldErrors] = useState<
    { key: string; message: string }[]
  >([]);

  useEffect(() => {
    if (!props.dirty) return;
    setFieldErrors((prev) => {
      const updated = [...prev];

      Object.keys(props.validationOutcome).forEach((key) => {
        const outcome = props.validationOutcome[key];

        if (outcome.outcome) {
          if (!updated.some((e) => e.key === key)) {
            updated.push({ key, message: outcome.message || key });
          } else {
            updated.forEach((e) => {
              if (e.key === key && outcome.message && e.message !== outcome.message) {
                e.message = outcome.message;
              }
            });
          }
        } else {
          if (!updated.some((e) => e.key === key) && outcome.message) {
            updated.push({ key, message: outcome.message });
          }
        }
      });

      return updated;
    });
  }, [props.validationOutcome, props.dirty]);

  const sortedFieldErrors = sortValidationMessages(
    Object.fromEntries(fieldErrors.map((e) => [e.key, e.message]))
  ).map((key) => fieldErrors.find((e) => e.key === key)!);

  return (
    <div className={getClassName(BASE_CLASS, [], [], "small")}>
      {props.dirty &&
        sortedFieldErrors.map(({ key, message }) => (
          <div key={key} className={getClassName(BASE_CLASS, ["message"])}>
            {props.validationOutcome[key]?.outcome ? (
              <SvgIcon width={12} height={12}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" />
                </svg>
              </SvgIcon>
            ) : (
              <SvgIcon width={12} height={12}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path
                    fill="#22c55e"
                    d="M320 32C167.6 32 44 155.6 44 308s123.6 276 276 276 276-123.6 276-276S472.4 32 320 32zm146.6 205.4L278.6 425.4c-6.2 6.2-14.4 9.4-22.6 9.4s-16.4-3.2-22.6-9.4l-84-84c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L256 336.7l188-188c12.5-12.5 32.8-12.5 45.3 0s12.3 32.8-.7 45.3z"
                  />
                </svg>
              </SvgIcon>
            )}
            {message}
          </div>
        ))}
    </div>
  );
};

export default MessageSection;
