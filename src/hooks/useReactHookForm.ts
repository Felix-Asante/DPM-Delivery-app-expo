import {zodResolver} from '@hookform/resolvers/zod';
import {FieldValues, useForm} from 'react-hook-form';

interface Options {
  schema: any;
  defaultValue?: any;
}
export function useReactHookForm<T extends FieldValues>(options: Options) {
  const form = useForm<T>({
    resolver: zodResolver(options.schema),
    defaultValues: options.defaultValue,
  });

  return form;
}
