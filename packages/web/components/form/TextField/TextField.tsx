import { Controller, FieldValues } from "react-hook-form"
import { TextFieldProps } from "./types"
import { Input } from "@/components/ui/input"
import { Field, FieldError } from "@/components/ui/field"

/**
 * Input liên kết với React Hook Form, tự hiển thị lỗi validation của field.
 *
 * @param control Control lấy từ `useForm` hoặc `useFormContext`.
 * @param name Tên field, cần khớp với một đường dẫn trong kiểu dữ liệu form.
 * @param props Các thuộc tính input chuẩn, ví dụ `placeholder`, `type` và `disabled`.
 * @returns Input đã được kết nối với form và phần hiển thị lỗi nếu có.
 */
const TextField = <
  TField extends FieldValues,
  TTransformedValues extends FieldValues = TField,
>({
  control,
  name,
  ...props
}: TextFieldProps<TField, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            {...field}
            value={field.value ?? ""}
            {...props}
            aria-invalid={fieldState.invalid}
            aria-describedby={
              fieldState.error
                ? `${field.name}-error`
                : props["aria-describedby"]
            }
          />
          <FieldError id={`${field.name}-error`} errors={[fieldState.error]} />
        </Field>
      )}
    />
  )
}

export default TextField
