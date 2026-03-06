import { useCallback, useState } from 'react';

export type Validator<T> = (value: T) => string | string[] | null;

export type FormInput<T> = {
  value: T;
  messages: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setValue: (v: T) => void;
  validate: (validator: Validator<T>) => boolean;
  clearMessages: () => void;
};

export function useFormInput<T>(initial: T): FormInput<T> {
  const [value, setValue] = useState<T>(initial);
  const [messages, setMessages] = useState<string[]>([]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // @ts-ignore – inputs/selects use string values here
    setValue(e.target.value);
    setMessages([]);
  }, []);

  const validate = useCallback((validator: Validator<T>) => {
    const res = validator(value);
    if (!res) {
      setMessages([]);
      return true;
    }
    const list = Array.isArray(res) ? res : [res];
    setMessages(list);
    return false;
  }, [value]);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { value, messages, onChange, setValue, validate, clearMessages };
}