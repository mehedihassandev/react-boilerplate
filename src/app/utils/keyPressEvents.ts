import { KeyboardEvent } from 'react';

export const handleKeyPressEvents = (
  e: KeyboardEvent<HTMLDivElement>,
  handleSubmit: () => void,
) => {
  const { key, target } = e;
  const inputElement = target as HTMLInputElement;
  const cursorPosition = inputElement.selectionStart;

  if (key === 'Enter') {
    const autocompleteElement = inputElement.closest('.MuiAutocomplete-root');

    const isAutocompleteOpen = autocompleteElement?.querySelector(
      '[aria-expanded="true"]',
    );

    if (isAutocompleteOpen) {
      // EXOS-831: Let autocomplete handle Enter key if dropdown is open
      return;
    }

    // EXOS-831: Trigger submit if autocomplete is not open
    handleSubmit();

    return;
  }

  const isArrowRightAtEnd =
    key === 'ArrowRight' && cursorPosition === inputElement.value.length;
  const isArrowLeftAtStart = key === 'ArrowLeft' && cursorPosition === 0;

  if (isArrowRightAtEnd || isArrowLeftAtStart) {
    const siblingSelector = isArrowRightAtEnd
      ? 'nextElementSibling'
      : 'previousElementSibling';

    const siblingElement = inputElement
      .closest('.MuiGrid-item')
      ?.[siblingSelector]?.querySelector('input, select, textarea');

    if (siblingElement) {
      // EXOS-831: Move focus to the next or previous input element
      (siblingElement as HTMLElement).focus();
    }
  }
};
