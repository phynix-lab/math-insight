import { Control, FieldValues, Path } from "react-hook-form"

export type TextFieldProps<
  TField extends FieldValues,
  TTransformedValues extends FieldValues = TField,
> = React.ComponentProps<"input"> & {
  control: Control<TField, unknown, TTransformedValues>
  name: Path<TField>
}
