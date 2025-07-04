export const getClassName = (
  baseClassName: string,
  section: string[] = [],
  variants: string[] = [],
  additionalClassName: string = ''
): string => {
  const base = section.length > 0
    ? `${baseClassName}__${section.join('__')}`
    : baseClassName;

  const classNames = [base];

  if (variants.length > 0) {
    variants.forEach(variant => {
      classNames.push(`${base}--${variant}`);
    });
  }

  if (additionalClassName) {
    classNames.push(additionalClassName);
  }

  return classNames.join(' ');
};
