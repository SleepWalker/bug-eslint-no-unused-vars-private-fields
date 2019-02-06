// @flow
import type { Node } from 'react';
import logger from 'app/services/logger';

type FieldError = {
  field: string,
  message?: string,
  code?: string,
};

export type ErrorsMap = {
  [errorCode: string]: Node | (($ReadOnly<FieldError>) => Node),
};

export type FormErrors = { [key: string]: string };

export default class ValidationError {
  +name: string;
  #errors: Array<$ReadOnly<FieldError>>;

  constructor(errors: Array<$ReadOnly<FieldError>>) {
    this.#errors = errors;
    this.name = 'ValidationError';
  }

  getErrors(): Array<$ReadOnly<FieldError>> {
    return [...this.#errors];
  }

  getFormErrors(errorsMap: ErrorsMap): FormErrors {
    const errors = {};

    this.#errors.forEach(error => {
      const { field, message, code = '' } = error;

      if (message) {
        errors[field] = message;
      } else {
        const resolvedError = errorsMap[code];
        const errorMessage = resolvedError || code;

        errors[field] =
          typeof errorMessage === 'function'
            ? errorMessage(error)
            : errorMessage;

        if (!resolvedError) {
          logger.error('ValidationError: can not resolve validation message', {
            error,
          });
        }
      }
    });

    return errors;
  }
}
